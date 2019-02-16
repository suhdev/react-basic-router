"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
const react_1 = require("react");
// tslint:disable-next-line:variable-name
exports.RouterContext = react_1.createContext('');
function useConfigRouter(def) {
    const [val, setState] = react_1.useState(() => def && def.getCurrentPath());
    const onChange = react_1.useCallback((path) => {
        setState(path);
    }, []);
    react_1.useEffect(() => {
        def.onMount(onChange);
        return function () {
            def.onUnmount();
        };
    }, []);
    return val;
}
exports.useConfigRouter = useConfigRouter;
class HashRouterDef {
    constructor() {
        this.getCurrentPath = () => {
            return location.hash;
        };
        this.onMount = (cb) => {
            this.$onChange = cb;
            window.addEventListener('hashchange', this.onChange);
        };
        this.onUnmount = () => {
            window.removeEventListener('hashchange', this.onChange);
        };
        this.onChange = (evt) => {
            this.$onChange(location.hash);
        };
    }
}
exports.HashRouterDef = HashRouterDef;
class PopStateRouterDef {
    constructor() {
        this.getCurrentPath = () => {
            return location.pathname;
        };
        this.onMount = (cb) => {
            this.$onChange = cb;
            window.addEventListener('popstate', this.onChange);
        };
        this.onUnmount = () => {
            window.removeEventListener('popstate', this.onChange);
        };
        this.onChange = (evt) => {
            this.$onChange(location.pathname);
        };
    }
}
exports.PopStateRouterDef = PopStateRouterDef;
// tslint:disable-next-line:function-name
function Router({ children, definition }) {
    const value = useConfigRouter(definition);
    return (react_1.createElement(exports.RouterContext.Provider, {
        value,
    }, children));
}
exports.Router = Router;
function usePath(regex, exact) {
    const [r, setR] = react_1.useState(() => {
        let val;
        if (typeof regex === 'string') {
            let rx = regex.replace(/:([^/]+)/gi, '([^/]+)');
            if (exact) {
                rx += '$';
            }
            val = new RegExp(rx);
        }
        else if (regex instanceof RegExp) {
            val = regex;
        }
        return val;
    });
    return r;
}
// tslint:disable-next-line:function-name
function Route({ path, exact, children, onEnter, onLeave }) {
    const regex = usePath(path, exact);
    const val = react_1.useContext(exports.RouterContext);
    regex.lastIndex = 0;
    // const isOK =
    react_1.useEffect(() => {
        console.log(`path:${path} enter, val:${val}`);
        onEnter && onEnter(val);
        return () => {
            console.log(`path:${path} leave, val:${val}`);
            onLeave && onLeave(val);
        };
    }, []);
    return regex.test(val) ? children : null;
}
exports.Route = Route;
