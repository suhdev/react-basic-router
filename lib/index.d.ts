import * as React from 'react';
export declare const RouteContext: React.Context<{}>;
export declare function useRouteParams(): {};
export interface IRouterHistory {
    getCurrentPath(): string;
    listen(cb: (path: string, prevPath: string) => void): () => void;
}
export declare const Router: ({ onPathChange, history, children, }: {
    history: IRouterHistory;
    onPathChange?: (path: string, prevPath: string) => void;
    children: React.ReactNode;
}) => JSX.Element;
export declare const Route: ({ onEnter, onLeave, onUpdate, path, children, isExact }: {
    path: string;
    isExact?: boolean;
    children: React.ReactNode;
    onEnter?: (params: any) => void;
    onLeave?: (params: any) => void;
    onUpdate?: (params: any) => void;
}) => JSX.Element;
