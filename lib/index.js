"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const util_1 = require("./util");
const RouterContext = React.createContext(null);
exports.RouteContext = React.createContext(null);
exports.Router = ({ onPathChange, history, children, }) => {
    const [currentPath, setPath] = React.useState(history.getCurrentPath());
    React.useEffect(() => history.listen((path, prevPath) => {
        setPath(path);
        onPathChange && onPathChange(path, prevPath);
    }), []);
    return (React.createElement(RouterContext.Provider, { value: currentPath }, children));
};
const InnerRoute = React.memo(({ onEnter, params, onLeave, children, }) => {
    React.useEffect(() => {
        onEnter && onEnter(params);
        if (onLeave) {
            return onLeave(params);
        }
    }, [params]);
    return children;
});
const MemoRoute = React.memo(({ params, onEnter, onLeave, onUpdate, children }) => (React.createElement(exports.RouteContext.Provider, { value: params },
    React.createElement(InnerRoute, { params: params, onEnter: onEnter, onLeave: onLeave, onUpdate: onUpdate }, children))));
exports.Route = ({ onEnter, onLeave, onUpdate, path, children, isExact }) => {
    const currentPath = React.useContext(RouterContext);
    const paramsRef = React.useRef(null);
    const checkPath = React.useMemo(() => util_1.parsePath(path, isExact || false), [path, isExact]);
    const params = paramsRef.current = React.useMemo(() => checkPath(currentPath, paramsRef.current), [currentPath]);
    const view = React.useMemo(() => React.createElement(MemoRoute, { onEnter: onEnter, onLeave: onLeave, onUpdate: onUpdate, params: params }, children), [params]);
    return (params ? view : null);
};
