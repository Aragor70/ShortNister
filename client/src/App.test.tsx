import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'enzyme';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';


describe("test App component", () => {

    const history = createBrowserHistory()
    
    let component: any;

    beforeEach(() => {
        component = mount(
        <Router history={history}>
            <App />
        </Router>)
    });
    
    it("component renders one dom element", () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Router history={history}>
                <App />
            </Router>
        , div);
        ReactDOM.unmountComponentAtNode(div)
    });
    it("compoent render jsx tags correctly", () => {
        
        expect(component.find('.output')).toHaveLength(1);
    });
    
});