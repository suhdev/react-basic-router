import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Router, Route } from '.';
import { createHashHistory } from './hash-history';
describe('router', () => {
  afterEach(cleanup);

  test('router/Router renders non-route children correctly', () => {
    let listeners = [];
    const path = '';
    const history = {
      getCurrentPath: () => path,
      listen: (cb: (path: string, prevPath: string) => void) => {
        listeners.push(cb);
        return () => {
          listeners = listeners.filter(e => e !== cb);
        };
      },
    };
    const { getByTestId } = render(<Router history={history}>
      <div data-testid="xyz">XYZ</div>
    </Router>);

    expect(getByTestId('xyz').innerHTML).toEqual('XYZ');
  });

  test('router/Router renders route children correctly', () => {
    let listeners = [];
    const path = '/test/123';
    const history = {
      getCurrentPath: () => path,
      listen: (cb: (path: string, prevPath: string) => void) => {
        listeners.push(cb);
        return () => {
          listeners = listeners.filter(e => e !== cb);
        };
      },
    };
    const { getByTestId } = render(<Router history={history}>
      <Route path="/"><div data-testid="tmx">TMX</div></Route>
      <Route path="/test"><div data-testid="tmz">TMZ</div></Route>
      <div data-testid="xyz">XYZ</div>
      <div>
        <Route path="/test123" data-testid="incorrect">INCORRECT</Route>
      </div>
    </Router>);

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
      listen: (cb: (path: string, prevPath: string) => void) => {
        listeners.push(cb);
        return () => {
          listeners = listeners.filter(e => e !== cb);
        };
      },
    };
    const { getByTestId } = render(<Router history={history}>
      <Route path="/"><div data-testid="tmx">TMX</div></Route>
      <Route path="/test"><div data-testid="tmz">TMZ</div>
        <Route path="/test/:id">
          <div data-testid="nestedroute">NESTED ROUTE</div>
        </Route>

        <Route path="/test/:id">
          <div data-testid="samenestedroute">SAME NESTED ROUTE</div>
        </Route>
        <div>
          <Route path="/test/:id">
            <div data-testid="anothernestedroute">ANOTHER NESTED ROUTE</div>
          </Route>
          <Route path="/test/element">
            <div data-testid="stringnestedroute">STRING NESTED ROUTE</div>
          </Route>
          <Route path="/test/element/:id">
            <div data-testid="elementnestedroute">ELEMENT NESTED ROUTE</div>
          </Route>
        </div>
      </Route>
      <div data-testid="xyz">XYZ</div>
      <div>
        <Route path="/test123"><div data-testid="incorrect">INCORRECT</div></Route>
      </div>
    </Router>);

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
