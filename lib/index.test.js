"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("@testing-library/react");
const _1 = require(".");
describe('router', () => {
    afterEach(react_1.cleanup);
    test('router/Router renders non-route children correctly', () => {
        let listeners = [];
        const path = '';
        const history = {
            getCurrentPath: () => path,
            listen: (cb) => {
                listeners.push(cb);
                return () => {
                    listeners = listeners.filter(e => e !== cb);
                };
            },
        };
        const { getByTestId } = react_1.render(React.createElement(_1.Router, { history: history },
            React.createElement("div", { "data-testid": "xyz" }, "XYZ")));
        expect(getByTestId('xyz').innerHTML).toEqual('XYZ');
    });
    test('router/Router renders route children correctly', () => {
        let listeners = [];
        const path = '/test/123';
        const history = {
            getCurrentPath: () => path,
            listen: (cb) => {
                listeners.push(cb);
                return () => {
                    listeners = listeners.filter(e => e !== cb);
                };
            },
        };
        const { getByTestId } = react_1.render(React.createElement(_1.Router, { history: history },
            React.createElement(_1.Route, { path: "/" },
                React.createElement("div", { "data-testid": "tmx" }, "TMX")),
            React.createElement(_1.Route, { path: "/test" },
                React.createElement("div", { "data-testid": "tmz" }, "TMZ")),
            React.createElement("div", { "data-testid": "xyz" }, "XYZ"),
            React.createElement("div", null,
                React.createElement(_1.Route, { path: "/test123", "data-testid": "incorrect" }, "INCORRECT"))));
        expect(getByTestId('xyz').innerHTML).toEqual('XYZ');
        expect(getByTestId('tmx').innerHTML).toEqual('TMX');
        expect(getByTestId('tmz').innerHTML).toEqual('TMZ');
        expect(() => getByTestId('incorrect')).toThrow();
    });
    test('router/Router renders nested route children correctly', () => {
        let listeners = [];
        const path = '/test/123';
        const history = {
            getCurrentPath: () => path,
            listen: (cb) => {
                listeners.push(cb);
                return () => {
                    listeners = listeners.filter(e => e !== cb);
                };
            },
        };
        const { getByTestId } = react_1.render(React.createElement(_1.Router, { history: history },
            React.createElement(_1.Route, { path: "/" },
                React.createElement("div", { "data-testid": "tmx" }, "TMX")),
            React.createElement(_1.Route, { path: "/test" },
                React.createElement("div", { "data-testid": "tmz" }, "TMZ"),
                React.createElement(_1.Route, { path: "/test/:id" },
                    React.createElement("div", { "data-testid": "nestedroute" }, "NESTED ROUTE")),
                React.createElement(_1.Route, { path: "/test/:id" },
                    React.createElement("div", { "data-testid": "samenestedroute" }, "SAME NESTED ROUTE")),
                React.createElement("div", null,
                    React.createElement(_1.Route, { path: "/test/:id" },
                        React.createElement("div", { "data-testid": "anothernestedroute" }, "ANOTHER NESTED ROUTE")),
                    React.createElement(_1.Route, { path: "/test/element" },
                        React.createElement("div", { "data-testid": "stringnestedroute" }, "STRING NESTED ROUTE")),
                    React.createElement(_1.Route, { path: "/test/element/:id" },
                        React.createElement("div", { "data-testid": "elementnestedroute" }, "ELEMENT NESTED ROUTE")))),
            React.createElement("div", { "data-testid": "xyz" }, "XYZ"),
            React.createElement("div", null,
                React.createElement(_1.Route, { path: "/test123" },
                    React.createElement("div", { "data-testid": "incorrect" }, "INCORRECT")))));
        expect(getByTestId('xyz').innerHTML).toEqual('XYZ');
        expect(getByTestId('tmx').innerHTML).toEqual('TMX');
        expect(getByTestId('tmz').innerHTML).toEqual('TMZ');
        expect(getByTestId('nestedroute').innerHTML).toEqual('NESTED ROUTE');
        expect(getByTestId('samenestedroute').innerHTML).toEqual('SAME NESTED ROUTE');
        expect(getByTestId('anothernestedroute').innerHTML).toEqual('ANOTHER NESTED ROUTE');
        expect(() => getByTestId('stringnestedroute')).toThrow();
        expect(() => getByTestId('elementnestedroute')).toThrow();
        expect(() => getByTestId('incorrect')).toThrow();
    });
});
