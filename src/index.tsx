import * as React from 'react';
import { parsePath } from './util';

const RouterContext = React.createContext<string>(null);
export const RouteContext = React.createContext<{}>(null);

export function useRouteParams() {
  return React.useContext(RouteContext);
}

export interface IRouterHistory {
  getCurrentPath(): string;
  listen(cb: (path: string, prevPath: string) => void): () => void;
}

export const Router = (
  { onPathChange,
    history,
    children,
  }: {
    history: IRouterHistory,
    onPathChange?: (path: string, prevPath: string) => void,
    children: React.ReactNode,
  }) => {
  const [currentPath, setPath] = React.useState(history.getCurrentPath());

  React.useEffect(
    () => history.listen((path, prevPath) => {
      setPath(path);
      onPathChange && onPathChange(path, prevPath);
    }),
    []);

  return (<RouterContext.Provider value={currentPath}>
    {children}
  </RouterContext.Provider>);
};

const InnerRoute = React.memo((
  { onEnter,
    params,
    onLeave,
    children,
  }: {
    params: any;
    onEnter?: (params) => void,
    onLeave?: (params) => void,
    onUpdate?: (params) => void,
    children: React.ReactNode,
  }) => {

  React.useEffect(
    () => {
      onEnter && onEnter(params);
      if (onLeave) {
        return onLeave(params);
      }
    },
    [params]);

  return children as any;
});

const MemoRoute = React.memo((
  { params, onEnter, onLeave, onUpdate, children }: {
    params: any;
    children: React.ReactNode;
    onEnter?: (params: any) => void;
    onLeave?: (params: any) => void;
    onUpdate?: (params: any) => void;
  }) => (
    <RouteContext.Provider value={params}>
      <InnerRoute
        params={params}
        onEnter={onEnter}
        onLeave={onLeave}
        onUpdate={onUpdate}>{children}</InnerRoute>
    </RouteContext.Provider>)) as any;

export const Route = ({
  onEnter,
  onLeave,
  onUpdate,
  path,
  children,
  isExact }:
  {
    path: string,
    isExact?: boolean,
    children: React.ReactNode,
    onEnter?: (params: any) => void,
    onLeave?: (params: any) => void,
    onUpdate?: (params: any) => void,
  }) => {
  const currentPath = React.useContext(RouterContext);

  const paramsRef = React.useRef(null);

  const checkPath = React.useMemo(
    () => parsePath(path, isExact || false),
    [path, isExact]);

  const params = paramsRef.current = React.useMemo(
    () => checkPath(currentPath, paramsRef.current),
    [currentPath]);

  const view = React.useMemo(
    () => <MemoRoute
      onEnter={onEnter}
      onLeave={onLeave}
      onUpdate={onUpdate}
      params={params}>{children}</MemoRoute>,
    [params]);

  return (params ? view : null);
};
