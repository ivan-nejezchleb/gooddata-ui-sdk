// (C) 2020 GoodData Corporation
import React, { useEffect, useState, useRef } from "react";
import { useBackend, useWorkspace } from "@gooddata/sdk-ui";
import { ITheme, IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import LoadingMask from "@gooddata/goodstrap/lib/core/LoadingMask";
import { List } from "../List";
import { ThemesListItem } from "./ThemesListItem";

/**
 *
 * @beta
 */
export interface IThemesListProps {
    /**
     * Analytical backend, from which the ThemesList will obtain themes
     *
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;

    /**
     * Identifier of analytical workspace, from which the ThemesList will obtain the themes
     *
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;

    /**
     * currently selected Theme identifier
     */
    selectedTheme?: string;

    onSelect?: (selectedTheme: ITheme) => void;
}

/**
 * Both backend and workspace can be passed as an arguments, otherwise the component tries to get these from the context
 *
 * @beta
 */
export const ThemesList: React.FC<IThemesListProps> = ({
    backend: backendParam,
    workspace: workspaceParam,
    selectedTheme,
    onSelect = () => {},
}) => {
    const backendFromContext = useBackend();
    const backend = backendParam || backendFromContext;
    const workspaceFromContext = useWorkspace();
    const workspace = workspaceParam || workspaceFromContext;

    const [themes, setThemes] = useState<ITheme[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const lastWorkspace = useRef<string>();
    lastWorkspace.current = workspace;

    useEffect(() => {
        const fetchData = async () => {
            if (!backend || !workspace) {
                return;
            }

            setIsLoading(true);

            const themes = await backend.workspace(workspace).styling().getThemes();

            if (lastWorkspace.current === workspace) {
                setThemes(themes);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [workspace, backend]);

    return isLoading ? (
        <div className="gd-themes-list-loading">
            <LoadingMask
                style={{
                    width: "50px",
                    height: "50px",
                }}
            />
        </div>
    ) : (
        <List<ITheme>
            width={300}
            items={themes}
            itemsCount={themes.length}
            itemHeight={100}
            renderItem={({ item }) => {
                const title = item.title;
                const isSelected = selectedTheme && item && selectedTheme === item.identifier;
                return (
                    <ThemesListItem isSelected={isSelected} title={title} theme={item} onClick={onSelect} />
                );
            }}
        />
    );
};
