import { mount } from 'enzyme';
import Header from './Header';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';


describe("Test Header component", () => {

    const history = createBrowserHistory();

    const mountComponent = mount(
        
            <Router history={history}>
                <Header />
            </Router>)
       
    
    it("For success, Render Header 1 component correctly", () => {
        expect(mountComponent).toHaveLength(1)
        expect(mountComponent.find('.header-content')).toHaveLength(1)

    });
    

});