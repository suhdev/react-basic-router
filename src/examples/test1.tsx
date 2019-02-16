
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouterDef, Route, Router } from '../index';

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
const def = new HashRouterDef();
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

ReactDOM.render(
  <Router definition={def}>
    <TestComponent />
    <Route path="">
      <div>Always render this</div>
    </Route>
    <Route path={/^(#\/)?$/g} exact={true}
      onEnter={onRootEnter}
      onLeave={onRootLeave}>
      <div>Render this only on root</div>
    </Route>
  </Router>,
  el);
