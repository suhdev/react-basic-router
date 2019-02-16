/// <reference types="react" />
export declare const RouterContext: import("react").Context<string>;
export interface IRouterDef {
    getCurrentPath(): string;
    onMount(cb: (...args: any[]) => void): void;
    onUnmount(): void;
    onChange(...args: any[]): void;
}
export declare function useConfigRouter(def: IRouterDef): string;
export declare class HashRouterDef implements IRouterDef {
    $onChange: (...args: any[]) => void;
    getCurrentPath: () => string;
    onMount: (cb: (...args: any[]) => void) => void;
    onUnmount: () => void;
    onChange: (evt: HashChangeEvent) => void;
}
export declare class PopStateRouterDef implements IRouterDef {
    $onChange: (...args: any[]) => void;
    getCurrentPath: () => string;
    onMount: (cb: (...args: any[]) => void) => void;
    onUnmount: () => void;
    onChange: (evt: HashChangeEvent) => void;
}
export interface IRouterProps {
    children: React.ReactNode;
    definition: IRouterDef;
}
export declare function Router({ children, definition }: IRouterProps): import("react").FunctionComponentElement<import("react").ProviderProps<string>>;
export interface IRouteProps {
    path: string | RegExp;
    children: React.ReactNode;
    exact?: boolean;
    onEnter?: (path: string) => void;
    onLeave?: (path: string) => void;
}
export declare function Route({ path, exact, children, onEnter, onLeave }: IRouteProps): {};
