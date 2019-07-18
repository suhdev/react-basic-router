# stickyants-react-router

A simple `react-router` alternative. The package implements basic routing functionality using react hooks. 


## Usage

```typescript

import * as React from 'react'; 
import * as ReactDOM from 'react-dom';

import { Route, Router, createHashHistory } from 'stickyants-react-router';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const history = createHashHistory();

function TestComponent(props) {
  return (<div>
    <Route path="#/home">
      <div className="test-1">Home</div>
    </Route>
    <Route path="#/home/page1">
      <div className="test-2">
        <div>Page 1</div>
        <Route path="#/home/page1/sub-page1">
          <div>Page 1 - Sub Page</div>
        </Route>
      </div>
    </Route>
  </div>);
}

let el = document.getElementById('SomeElement');
if (!el) {
  el = document.createElement('div');
  el.id = 'SomeElement';
  document.querySelector('body').appendChild(el);
}


ReactDOM.render(
  <Router history={history}>
      <Route path="/"><div data-testid="tmx">TMX</div></Route>
      <Route path="/test"><div data-testid="tmz">TMZ</div>
        <Route path="/test/:id">
          <div data-testid="nestedroute">NESTED ROUTE</div>
        </Route>

        <Route path="/test/:id" isExact={true}>
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
    </Router>,
  el);


```