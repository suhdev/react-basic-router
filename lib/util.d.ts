export declare function parsePath(path: string, isExact: boolean): (pathToTest: string, currentParams?: any) => <Base extends (draft: any) => void>(base?: Base, ...rest: unknown[]) => any;
