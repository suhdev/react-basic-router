// import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import {
  useState, useEffect, useCallback,
  createContext, createElement,
  useContext,
} from 'react';

// tslint:disable-next-line:variable-name
export const RouterContext = createContext<string>('');

export interface IRouterDef {
  getCurrentPath(): string;
  onMount(cb: (...args: any[]) => void): void;
  onUnmount(): void;
  onChange(...args: any[]): void;
}

export function useConfigRouter(def: IRouterDef) {
  const [val, setState] = useState(() => def && def.getCurrentPath());
  const onChange = useCallback(
    (path: string) => {
      setState(path);
    },
    []);

  useEffect(
    () => {
      def.onMount(onChange);
      return function () {
        def.onUnmount();
      };
    },
    []);

  return val;
}

export class HashRouterDef implements IRouterDef {
  $onChange: (...args: any[]) => void;
  getCurrentPath = () => {
    return location.hash;
  }
  onMount = (cb: (...args: any[]) => void) => {
    this.$onChange = cb;
    window.addEventListener('hashchange', this.onChange);
  }
  onUnmount = () => {
    window.removeEventListener('hashchange', this.onChange);
  }
  onChange = (evt: HashChangeEvent) => {
    this.$onChange(location.hash);
  }
}

export class PopStateRouterDef implements IRouterDef {
  $onChange: (...args: any[]) => void;
  oldFn: (data: any, title: string, url?: string) => void;
  constructor() {
    this.oldFn = window.history.pushState;
    window.history.pushState = (...args) => {
      this.oldFn.apply(window.history, args);
      this.onChange(null);
    };
  }
  getCurrentPath = () => {
    return location.pathname;
  }
  onMount = (cb: (...args: any[]) => void) => {
    this.$onChange = cb;
    window.onpopstate = this.onChange;
    // window.addEventListener('popstate', this.onChange);
  }
  onUnmount = () => {
    window.onpopstate = null;
    // window.removeEventListener('popstate', this.onChange);
  }
  onChange = (evt) => {
    console.log(evt);
    this.$onChange(location.pathname);
  }
}

export interface IRouterProps {
  children: React.ReactNode;
  definition: IRouterDef;
}

// tslint:disable-next-line:function-name
export function Router({ children, definition }: IRouterProps) {
  const value = useConfigRouter(definition);

  return (
    createElement(
      RouterContext.Provider,
      {
        value,
      },
      children));
}

export interface IRouteProps {
  path: string | RegExp;
  children?: React.ReactNode | React.ReactElement<any>;
  exact?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

function usePath(regex: string | RegExp, exact: boolean) {
  const [r, setR] = useState<RegExp>(() => {
    let val: RegExp;
    if (typeof regex === 'string') {
      let rx = regex.replace(/:([^/]+)/gi, '([^/]+)');
      if (exact) {
        rx += '$';
      }
      val = new RegExp(`^${rx}`);
    } else if (regex instanceof RegExp) {
      val = regex;
    }
    return val;
  });
  return r;
}

function Wrapper({ path, exact, children,
  onEnter, onLeave }: IRouteProps) {
  useEffect(
    () => {
      onEnter && onEnter();
      return () => {
        onLeave && onLeave();
      };
    },
    []);
  return children as any;
}

// tslint:disable-next-line:function-name
export function Route({ path, exact, children,
  onEnter, onLeave }: IRouteProps): React.ReactElement {
  const regex = usePath(path, exact);
  const val = useContext(RouterContext);
  regex.lastIndex = 0;
  const isOK = regex.test(val);
  return isOK ? createElement(
    Wrapper,
    {
      path, exact,
      onEnter, onLeave,
    },
    children) : null;
}
