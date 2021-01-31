import React from 'react';
import ReactDOM from 'react-dom';

import { mount, shallow } from 'enzyme';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

describe("Test App component", () => {

    const history = createBrowserHistory()
    
    let component: any;

    
    it("For success, Component renders one dom element", () => {
        
        const div = document.createElement('div');

        ReactDOM.render(
            <Router history={history}>
                <App />
            </Router>
        , div);
        
        ReactDOM.unmountComponentAtNode(div)
        
    });
    
});