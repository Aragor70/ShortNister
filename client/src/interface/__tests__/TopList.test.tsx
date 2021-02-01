import { mount, shallow } from 'enzyme';
import Toplist from '../Toplist';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe("Test Toplist component", () => {
    

    const route = "/"
    let history = createMemoryHistory({ initialEntries: [route] })

    const mountComponent = mount(
        <Router history={history} >
            <Toplist />
        </Router>
    );


    it("For success, Render Toplist 1 component correctly", () => {
        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.section-content')).toHaveLength(1);

    });

    it("For fail, Render message when list is empty, no address was found", () => {
        
        const x = 'The list is empty'
        expect(mountComponent.text()).toContain(x)
        
        
    });

});