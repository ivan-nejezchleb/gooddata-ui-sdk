// (C) 2007-2018 GoodData Corporation
import React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { ObjRef, areObjRefsEqual } from "@gooddata/sdk-model";
import Dropdown, { DropdownButton } from "@gooddata/goodstrap/lib/Dropdown/Dropdown";
import { stringUtils } from "@gooddata/util";
import { IAnalyticalBackend, IAttributeElement } from "@gooddata/sdk-backend-spi";
import { ITranslationsComponentProps } from "@gooddata/sdk-ui";
import cx from "classnames";
import debounce from "lodash/debounce";
import noop from "lodash/noop";

import { AttributeDropdownBody } from "./AttributeDropdownBody";
import { MAX_SELECTION_SIZE } from "./AttributeDropdownList";
import { mergeElementQueryResults } from "./mergeElementQueryResults";
import { IElementQueryResultWithEmptyItems, AttributeListItem, isNonEmptyListItem } from "./types";

import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import {
    getAllTitleIntl,
    getElements,
    getElementTotalCount,
    updateSelectedOptionsWithData,
} from "../utils/AttributeFilterUtils";

const LIMIT = MAX_SELECTION_SIZE + 50;

const DefaultFilterLoading = injectIntl(({ intl }) => {
    return (
        <button className="gd-button gd-button-secondary gd-button-small gd-icon-right gd-icon disabled s-button-loading">
            {intl.formatMessage({ id: "gs.filter.loading" })}
        </button>
    );
});

export interface IAttributeDropdownOwnProps {
    title: string;

    backend: IAnalyticalBackend;
    workspace: string;
    displayForm: ObjRef;

    selectedItems?: Array<Partial<IAttributeElement>>;
    isInverted?: boolean;

    onApply: (selectedItems: IAttributeElement[], isInverted: boolean) => void;
    fullscreenOnMobile?: boolean;
    isMobile?: boolean;
    titleWithSelection?: boolean;
    FilterLoading?: React.ComponentType;
    isLoading?: boolean;
    translationProps: ITranslationsComponentProps;
}

type IAttributeDropdownProps = IAttributeDropdownOwnProps & WrappedComponentProps;

export interface IAttributeDropdownState {
    validElements?: IElementQueryResultWithEmptyItems;

    selectedItems: Array<IAttributeElement>;
    isInverted: boolean;

    prevSelectedItems: Array<IAttributeElement>;
    prevIsInverted: boolean;
    firstLoad: boolean;

    isLoading: boolean;
    error?: any;
    searchString: string;

    // paging
    offset: number;
    limit: number;
    totalCount: number;

    items: AttributeListItem[];
}

export class AttributeDropdownCore extends React.PureComponent<
    IAttributeDropdownProps,
    IAttributeDropdownState
> {
    public static defaultProps: Pick<
        IAttributeDropdownProps,
        "fullscreenOnMobile" | "isMobile" | "titleWithSelection" | "FilterLoading" | "isLoading"
    > = {
        fullscreenOnMobile: false,
        isMobile: false,
        titleWithSelection: false,
        FilterLoading: DefaultFilterLoading,
        isLoading: false,
    };

    private dropdownRef = React.createRef<Dropdown>();

    private MediaQuery?: ({
        children,
    }: {
        children: (isMobile: boolean) => React.ReactNode;
    }) => React.ReactNode;

    private getBackend = () => {
        return this.props.backend.withTelemetry("AttributeFilter", this.props);
    };

    constructor(props: IAttributeDropdownProps) {
        super(props);

        const selectedItems = updateSelectedOptionsWithData(props.selectedItems || [], []);
        const isInverted = props.isInverted ?? false;

        this.state = {
            validElements: null,

            selectedItems,
            isInverted,

            prevSelectedItems: selectedItems,
            prevIsInverted: isInverted,
            firstLoad: true,

            isLoading: false,
            limit: LIMIT,
            offset: 0,
            searchString: "",
            totalCount: LIMIT,

            items: [],
        };

        this.createMediaQuery(props.fullscreenOnMobile);
    }

    public componentDidUpdate(prevProps: IAttributeDropdownProps, prevState: IAttributeDropdownState): void {
        const needsInvalidation =
            !areObjRefsEqual(this.props.displayForm, prevProps.displayForm) ||
            this.props.workspace !== prevProps.workspace ||
            this.state.searchString !== prevState.searchString;

        if (needsInvalidation) {
            this.setState(
                {
                    validElements: null,
                    error: null,
                    isLoading: false,
                    offset: 0,
                    limit: LIMIT,
                },
                () =>
                    getElements(
                        this.state.validElements,
                        this.state.offset,
                        this.state.limit,
                        this.loadElements,
                    ),
            );
        }
    }

    public getElementTotalCount = async (): Promise<void> => {
        const { workspace, displayForm } = this.props;

        getElementTotalCount(workspace, this.getBackend(), displayForm, this.state.searchString).then(
            (result) => {
                this.setState({ totalCount: result });
            },
        );
    };

    private onSearch = debounce((query: string) => {
        this.setState({ searchString: query });
    }, 250);

    private clearSearchString = () => {
        this.setState({ searchString: "" });
    };

    private loadElements = async (offset: number, limit: number) => {
        const { workspace, displayForm } = this.props;

        this.setState({ isLoading: true });

        const newElements = await this.getBackend()
            .workspace(workspace)
            .attributes()
            .elements()
            .forDisplayForm(displayForm)
            .withOptions({
                ...(this.state.searchString ? { filter: this.state.searchString } : {}),
            })
            .withOffset(offset)
            .withLimit(limit)
            .query();

        this.setState((state) => {
            const mergedValidElements = mergeElementQueryResults(state.validElements, newElements);
            const { items } = mergedValidElements;

            // make sure that selected items have both title and uri, otherwise selection in InvertableList won't work
            // TODO we could maybe use the InvertableList's getItemKey and just use title or uri for example
            const updatedSelectedItems = updateSelectedOptionsWithData(this.state.selectedItems, items);
            const updatedPrevSelectedItems = updateSelectedOptionsWithData(
                this.state.prevSelectedItems,
                items,
            );

            return {
                ...state,
                selectedItems: updatedSelectedItems,
                prevSelectedItems: updatedPrevSelectedItems,
                isLoading: false,
                validElements: state.searchString ? newElements : mergedValidElements,
                items,
                totalCount: state.firstLoad ? items.length : state.totalCount,
                firstLoad: false,
            };
        });
    };

    private getTitle = () => {
        const { isInverted, selectedItems, totalCount } = this.state;
        const { title, displayForm, titleWithSelection } = this.props;

        if (totalCount && titleWithSelection && displayForm) {
            const empty = isEmpty(selectedItems);
            const equal = isEqual(totalCount, selectedItems.length);
            const getAllPartIntl = getAllTitleIntl(this.props.intl, isInverted, empty, equal);

            if (empty) {
                return isInverted ? `${title}: ${getAllPartIntl}` : title;
            }
            if (equal) {
                return isInverted ? title : `${title}: ${getAllPartIntl}`;
            }

            const itemTitlesToString = selectedItems.map((selectedItem) => selectedItem.title).join(", ");
            const fullTitle = isInverted
                ? `${title}: ${getAllPartIntl} ${itemTitlesToString}`
                : `${title}: ${itemTitlesToString}`;

            return `${stringUtils.shortenText(fullTitle, { maxLength: 35 })} (${selectedItems.length})`;
        }

        return title;
    };

    public render(): React.ReactNode {
        const { FilterLoading } = this.props;
        const customizedTitle = this.getTitle();
        const classes = cx(
            "gd-attribute-filter",
            customizedTitle ? `gd-id-${stringUtils.simplifyText(customizedTitle)}` : "",
        );

        return this.props.isLoading ? (
            <FilterLoading />
        ) : (
            <Dropdown
                button={<DropdownButton value={customizedTitle} />}
                ref={this.dropdownRef}
                body={this.renderDropdownBody()}
                className={classes}
                MediaQuery={this.MediaQuery}
                onOpenStateChanged={this.onDropdownOpenStateChanged}
            />
        );
    }

    private createMediaQuery(fullscreenOnMobile: boolean) {
        this.MediaQuery = fullscreenOnMobile
            ? undefined
            : ({ children }: { children: (isMobile: boolean) => React.ReactNode }) => children(false);
    }

    private backupSelection = (callback: () => any = noop) => {
        const { selectedItems, isInverted } = this.state;
        this.setState(
            {
                prevSelectedItems: selectedItems,
                prevIsInverted: isInverted,
            },
            callback,
        );
    };

    private restoreSelection = () => {
        const { prevSelectedItems, prevIsInverted } = this.state;
        this.setState({
            selectedItems: prevSelectedItems,
            isInverted: prevIsInverted,
        });
    };

    private onDropdownOpenStateChanged = (isOpen: boolean) => {
        if (isOpen) {
            getElements(this.state.validElements, this.state.offset, this.state.limit, this.loadElements);
        } else {
            this.clearSearchString();
            this.restoreSelection();
        }
    };

    private closeDropdown = () => {
        if (this.dropdownRef.current) {
            this.dropdownRef.current.closeDropdown();
        }
    };

    private onApplyButtonClicked = () => {
        this.props.onApply(this.state.selectedItems.filter(isNonEmptyListItem), this.state.isInverted);
        this.backupSelection(this.closeDropdown);
    };

    private onCloseButtonClicked = () => {
        this.closeDropdown();
    };

    private onSelect = (selectedItems: IAttributeElement[], isInverted: boolean) => {
        this.setState({
            selectedItems,
            isInverted,
        });
    };

    private onRangeChange = (_searchString: string, from: number, to: number) => {
        this.setState({ offset: from, limit: to - from }, () =>
            getElements(this.state.validElements, this.state.offset, this.state.limit, this.loadElements),
        );
    };

    private emptyValueItems(items: AttributeListItem[]): AttributeListItem[] {
        const emptyHeaderString = this.props.translationProps
            ? this.props.translationProps.emptyHeaderString
            : "(empty value)";
        const nonEmptyItems = items.filter(isNonEmptyListItem);
        nonEmptyItems.forEach((item) => {
            if (isEmpty(item.title)) {
                // @ts-expect-error TODO: SDK8: this is evil; mutating the items of readonly array; need to find a conceptual way to do this
                item.title = emptyHeaderString;
            }
        });

        return items;
    }

    private renderDropdownBody() {
        const { selectedItems, isInverted, error, isLoading, validElements, searchString, totalCount } =
            this.state;

        const shouldDisableApplyButton = error || isLoading || (validElements && !validElements.items.length);
        const hasTriedToLoadData = validElements && validElements.items;

        return (
            <AttributeDropdownBody
                error={error}
                isLoading={!hasTriedToLoadData && isLoading}
                items={validElements ? this.emptyValueItems(validElements.items) : []}
                isInverted={isInverted}
                onRangeChange={this.onRangeChange}
                selectedItems={selectedItems}
                totalCount={totalCount ?? LIMIT}
                applyDisabled={shouldDisableApplyButton}
                onSearch={this.onSearch}
                searchString={searchString}
                onSelect={this.onSelect}
                onApplyButtonClicked={this.onApplyButtonClicked}
                onCloseButtonClicked={this.onCloseButtonClicked}
            />
        );
    }
}

export const AttributeDropdown = injectIntl(AttributeDropdownCore);
