import { mount } from 'enzyme';
import Header from '../Header';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';


describe("Test Header component", () => {

    const route = '/'
    const history = createBrowserHistory({ initialEntries: [route] });

    const mountComponent = mount(
        
        <Router history={history}>
            <Header />
        </Router>
    );
       
    
    it("For success, Route '/' renders interface/Header.tsx Component", () => {
        expect(mountComponent).toHaveLength(1)
        expect(mountComponent.find('.header-content')).toHaveLength(1)

    });
    

});