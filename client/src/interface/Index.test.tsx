import { mount, ShallowWrapper } from 'enzyme';
import Index from './Index';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

describe('Test Index component', () => {
    
    const history = createBrowserHistory();

    const mountComponent = mount(
        
            <Router history={history}>
                <Index />
            </Router>)


    it('Render Index component correctly', () => {

        // render component once
        expect(mountComponent).toHaveLength(1);
        // render component main class 
        expect(mountComponent.find('.section-content')).toHaveLength(1);

    });

    it('Render input-form correctly', () => {
        expect(mountComponent.find('.input-form')).toHaveLength(1)
        
        expect(mountComponent.find('form')).toHaveLength(1)

        // render long url input
        const input = mountComponent.find('input'); 
        expect(input.props().name).toEqual('longUrl')
        expect(input.props().value).toEqual('')
        expect(input.props().required).toEqual(true)
        
    });

});