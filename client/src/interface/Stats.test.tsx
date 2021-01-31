import { mount, shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';



describe("test Header component", () => {
    const route = "/hello/stats"
    const history = createMemoryHistory({ initialEntries: [route] })

    const mountComponent = mount(
        <Router history={history} >
            <App 
                match={{ params: {code: 'hello'}, isExact: true, path: "/hello/stats", url: "" }}
            />
        </Router>
    );


    it("For success, Render Stats 1 component correctly", () => {
        expect(mountComponent).toHaveLength(1);
        expect(mountComponent.find('.section-content')).toHaveLength(1);

    });

    it("For fail, Render Error message when address is not found", () => {
        
        const x = 'Address not found.'
        expect(mountComponent.text()).toContain(x)
        

    });

});