import React from 'react';
import NoMatch from '../NoMatch';

import { mount, shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


describe("404 component test", () => {
    const route = "/Unknown_Code/Unknown"
    let history = createMemoryHistory({ initialEntries: [route] })

    const mountComponent = mount(
        <Router history={history} >
                <NoMatch 
                    match={{ params: {code: 'Unknown_Code'}, isExact: true, path: "/Unknown_Code/overview", url: "" }}
                />
        </Router>
    )
    
    it("render comnponent 1 correctly", () => {
        expect(mountComponent).toHaveLength(1)
        
    });

    it("render component on specyfic pathnames locations", () => {
        
        const x = '404, Page not found.'
        expect(mountComponent.text()).toContain(x)

    });

});