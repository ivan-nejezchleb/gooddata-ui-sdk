// (C) 2019 GoodData Corporation
import cloneDeep from "lodash/cloneDeep";
import {
    IBucketItem,
    IBucketOfFun,
    IExtendedReferencePoint,
    IReferencePoint,
    IVisCallbacks,
    IVisConstruct,
    IVisProps,
    IVisualization,
    IVisualizationOptions,
    IVisualizationProperties,
    PluggableVisualizationErrorCodes,
} from "../../interfaces/Visualization";
import { findDerivedBucketItem, hasDerivedBucketItems, isDerivedBucketItem } from "../../utils/bucketHelper";
import { IInsightDefinition, insightHasDataDefined, insightProperties } from "@gooddata/sdk-model";
import { IExecutionFactory } from "@gooddata/sdk-backend-spi";
import {
    DefaultLocale,
    ErrorCodes,
    GoodDataSdkError,
    IDrillEvent,
    IExportFunction,
    ILoadingState,
    ILocale,
    IPushData,
    isGoodDataSdkError,
} from "@gooddata/sdk-ui";
import { IntlShape } from "react-intl";
import { createInternalIntl } from "../../utils/internalIntlProvider";
import { getSupportedProperties } from "../../utils/propertiesHelper";

export abstract class AbstractPluggableVisualization implements IVisualization {
    protected intl: IntlShape;
    protected locale: ILocale;

    /**
     * Standard callback
     */
    private readonly callbacks: IVisCallbacks;

    /**
     * Classname of element where visualization should be mounted
     */
    protected readonly element: string;

    /**
     * Classname of element where config panel should be mounted
     */
    protected readonly configPanelElement: string;

    /**
     * Insight that is currently rendered by the pluggable visualization. This field is set during
     * every call to {@link update} and will remain the same until the next update() call.
     */
    protected currentInsight: IInsightDefinition;
    protected visualizationProperties: IVisualizationProperties;
    protected supportedPropertiesList: string[];
    protected propertiesMeta: any;

    private hasError: boolean;
    private hasEmptyAfm: boolean;

    protected isLoading: boolean;

    protected setIsError = (value: boolean): void => {
        this.hasError = value;
    };

    protected getIsError = (): boolean => {
        return this.hasEmptyAfm || this.hasError;
    };

    protected constructor(props: IVisConstruct) {
        this.callbacks = props.callbacks;
        this.locale = props.locale ?? DefaultLocale;
        this.intl = createInternalIntl(this.locale);
        this.element = props.element;
        this.configPanelElement = props.configPanelElement;
    }

    public abstract unmount(): void;

    public abstract getExtendedReferencePoint(
        referencePoint: IReferencePoint,
    ): Promise<IExtendedReferencePoint>;

    //
    // Templated implementation of update contract
    //

    /**
     * Templated implementation of the update method. Given options, insight to render and the execution
     * factory, this function will drive the update process. It consists of the following:
     *
     * 1. call to {@link updateInstanceProperties} - this method should update any internal state
     *    of the instance's properties. Subclasses MAY override this to update state of their own private
     *    properties.
     *
     * 2. call to {@link checkBeforeRender} - this method is called as a hook to perform final check before
     *    the actual rendering is triggered:
     *    - if hook returns true, vis will be rendered
     *    - if hook returns false, vis will not be rendered
     *    - if hook throws an exception, it will be sent via onError callback; vis will not be rendered
     *
     * 3. vis rendering is triggered (unless step 2 determines it should not be)
     *
     * 4. configuration panel is rendered (always)
     *
     * Note: do not override this method.
     *
     * @param options
     * @param insight
     * @param visualizationPropertiesMeta
     * @param executionFactory
     */
    public update(
        options: IVisProps,
        insight: IInsightDefinition,
        insightPropertiesMeta: any,
        executionFactory: IExecutionFactory,
    ): void {
        this.updateInstanceProperties(options, insight, insightPropertiesMeta);
        this.hasEmptyAfm = !insightHasDataDefined(insight);

        let shouldRenderVisualization: boolean;
        try {
            shouldRenderVisualization = this.checkBeforeRender(insight);
        } catch (e) {
            const sdkError = isGoodDataSdkError(e) ? e : new GoodDataSdkError(ErrorCodes.UNKNOWN_ERROR, e);

            this.onError(sdkError);

            return;
        }

        if (shouldRenderVisualization) {
            this.renderVisualization(options, insight, executionFactory);
        }

        this.renderConfigurationPanel(insight);
    }

    /**
     * This method will be called during the {@link update} processing. This is where internal properties of the
     * concrete plug vis class MAY be updated. If class overrides this method, it MUST call the method in
     * superclass.
     *
     * @param options - visualization options
     * @param insight - insight that is about to be rendered
     */
    protected updateInstanceProperties(
        // @ts-ignore
        options: IVisProps,
        insight: IInsightDefinition,
        insightPropertiesMeta: any,
    ) {
        this.visualizationProperties = getSupportedProperties(
            insightProperties(insight),
            this.supportedPropertiesList,
        );
        this.propertiesMeta = insightPropertiesMeta ?? null;
        this.currentInsight = insight;
    }

    /**
     * This method will be called during the {@link update} processing. It can be used to influence whether
     * visualization should be rendered and optionally whether particular error should be rendered by the app.
     *
     * @param insight - insight that is about to be rendered
     * @returns when true is returned (default), visualization will be rendered, when false is returned no rendering is done
     * @throws error - if anything is thrown, visualization will not be rendered and the exception will be passed via onError callback
     */
    protected checkBeforeRender(insight: IInsightDefinition): boolean {
        if (!insightHasDataDefined(insight)) {
            throw new GoodDataSdkError(PluggableVisualizationErrorCodes.EMPTY_AFM);
        }

        return true;
    }

    /**
     * Render visualization of the insight under the {@link element} node. Use the provided execution factory
     * to create execution to obtain data for the insight.
     *
     * @param options - visualization options to use
     * @param insight - insight to render
     * @param executionFactory - execution factory to construct execution that will obtain the necessary data
     */
    protected abstract renderVisualization(
        options: IVisProps,
        insight: IInsightDefinition,
        executionFactory: IExecutionFactory,
    ): void;

    /**
     * Render configuration panel under the {@link configPanelElement} node. The values of visualization properties
     * are stored in {@link visualizationProperties}.
     *
     * @param insight - insight that is rendered
     */
    protected abstract renderConfigurationPanel(insight: IInsightDefinition): void;

    //
    // Callback delegates
    //

    protected onError = (error: GoodDataSdkError) => {
        this.callbacks.onError?.(error);

        // EMPTY_AFM is handled in update as it can change on any render contrary to other error types
        // that have to be set manually or by loading
        if (error.message !== PluggableVisualizationErrorCodes.EMPTY_AFM) {
            this.hasError = true;
        }

        this.renderConfigurationPanel(this.currentInsight);
    };

    protected onLoadingChanged = (loadingState: ILoadingState) => {
        this.callbacks.onLoadingChanged?.(loadingState);

        this.hasError = false;
        this.isLoading = loadingState.isLoading;
        this.renderConfigurationPanel(this.currentInsight);
    };

    protected onExportReady = (exportResult: IExportFunction) => {
        this.callbacks.onExportReady?.(exportResult);
    };

    protected pushData = (data: IPushData, options?: IVisualizationOptions) => {
        this.callbacks.pushData?.(data, options);
    };

    protected afterRender = () => {
        this.callbacks.afterRender?.();
    };

    protected onDrill = (event: IDrillEvent) => {
        // in case onDrill is not specified, default to always firing drill events
        return this.callbacks.onDrill ? this.callbacks.onDrill(event) : true;
    };

    //
    // Templated implementation of addNewDerivedBucketItems contract
    //

    public addNewDerivedBucketItems(
        referencePoint: IReferencePoint,
        newDerivedBucketItems: IBucketItem[],
    ): Promise<IReferencePoint> {
        if (!referencePoint.buckets) {
            return Promise.resolve(referencePoint);
        }

        const newReferencePoint = cloneDeep<IReferencePoint>(referencePoint);
        newReferencePoint.buckets = referencePoint.buckets.map((bucket) => {
            return {
                ...bucket,
                items: this.mergeDerivedBucketItems(referencePoint, bucket, newDerivedBucketItems),
            };
        });

        return Promise.resolve(newReferencePoint);
    }

    protected mergeDerivedBucketItems(
        referencePoint: IReferencePoint,
        bucket: IBucketOfFun,
        newDerivedBucketItems: IBucketItem[],
    ): IBucketItem[] {
        return bucket.items.reduce((resultItems: IBucketItem[], bucketItem: IBucketItem) => {
            const newDerivedBucketItem = findDerivedBucketItem(bucketItem, newDerivedBucketItems);
            const shouldAddItem =
                newDerivedBucketItem &&
                !isDerivedBucketItem(bucketItem) &&
                !hasDerivedBucketItems(bucketItem, referencePoint.buckets);
            if (shouldAddItem) {
                resultItems.push(newDerivedBucketItem);
            }

            resultItems.push(bucketItem);
            return resultItems;
        }, []);
    }
}
