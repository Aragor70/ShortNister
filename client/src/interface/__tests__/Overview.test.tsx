import { mount, shallow } from 'enzyme';
import Overview from '../Overview';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe("Test Overview component", () => {
    

    const route = "/Unknown_Code/overview"
    let history = createMemoryHistory({ initialEntries: [route] })

    const mountComponent = mount(
        <Router history={history} >
            <Overview 
                match={{ params: {code: 'Unknown_Code'}, isExact: true, path: "/Unknown_Code/overview", url: "" }}
            />
        </Router>
    );


    it("For success, Render Overview 1 component correctly", () => {
        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.section-content')).toHaveLength(1);

    });

    it("For fail, Render Error message when address is not found", () => {
        
        const x = 'Address not found.'
        expect(mountComponent.text()).toContain(x)
        

    });

});