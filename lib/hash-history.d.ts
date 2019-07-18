export declare function createHashHistory(win?: Window): {
    getCurrentPath: () => string;
    listen: (cb: (currentPath: string, prevPath: string) => void) => () => void;
};
