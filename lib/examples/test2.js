"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const index_1 = require("../index");
function TestComponent(props) {
    return (React.createElement("div", null,
        React.createElement(index_1.Route, { path: "/home" },
            React.createElement("div", { className: "test-1" }, "Home")),
        React.createElement(index_1.Route, { path: "/home/page1" },
            React.createElement("div", { className: "test-2" },
                React.createElement("div", null, "Page 1"),
                React.createElement(index_1.Route, { path: "/home/page1/sub-page1" },
                    React.createElement("div", null, "Page 1 - Sub Page"))))));
}
const def = new index_1.PopStateRouterDef();
let el = document.getElementById('SomeElement');
if (!el) {
    el = document.createElement('div');
    el.id = 'SomeElement';
    document.querySelector('body').appendChild(el);
}
function onRootEnter() {
    console.log('on root');
}
function onRootLeave() {
    console.log('on root leave');
}
ReactDOM.render(React.createElement(index_1.Router, { definition: def },
    React.createElement(TestComponent, null),
    React.createElement(index_1.Route, { path: "/" },
        React.createElement("div", null, "Always render this"),
        React.createElement("a", { href: "/home" }, "home"),
        React.createElement("a", { href: "/home/page1" }, "page1"),
        React.createElement("a", { href: "/home/page1/sub-page1" }, "page1-subpage")),
    React.createElement(index_1.Route, { path: "/", exact: true, onEnter: onRootEnter, onLeave: onRootLeave },
        React.createElement("div", null, "Render this only on root"))), el);
