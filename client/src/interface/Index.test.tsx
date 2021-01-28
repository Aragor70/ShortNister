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

    it('Does not render complete form when longUrl is empty or not valid', () => {
        
        expect(mountComponent.find('form')).toHaveLength(1)

        // render long url input
        const input = mountComponent.find('input'); 

        expect(input.text()).toContain('')

        // fill the value of input with not valid URL
        input.getDOMNode<HTMLInputElement>().value = 'Not_Valid_URL';
        input.simulate('change');

        // get the response with no visible element as randomize button
        expect(mountComponent.find('.randomize')).toHaveLength(0)

        input.getDOMNode<HTMLInputElement>().value = '';
        input.simulate('change');
        
    });


    it('Display hidden form when longUrl is valid', () => {
        
        expect(mountComponent.find('form')).toHaveLength(1)

        // render long url input
        const input = mountComponent.find('input'); 

        expect(input.text()).toContain('')
        input.getDOMNode<HTMLInputElement>().value = 'https://github.com/Aragor70/Shortster';
        //input.props().value = 'https://github.com/Aragor70/Shortster';

        //expect(input.text()).toContain('https://github.com/Aragor70/Shortster')
        input.simulate('change');
        

        expect(mountComponent.find('.randomize')).toHaveLength(1)

        console.log(input.props())
        
    });

});