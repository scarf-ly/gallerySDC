import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import App from '/Users/TinaLe/Documents/gallery/client/src/components/App.jsx'

Enzyme.configure({ adapter: new Adapter() }); 

describe('App', ()=>{
    it('should have state', done =>{
        const wrapper = shallow(<App />, {disableLifecycleMethods: true});
        expect(wrapper.state()).toExist;
        done(); 
    });

    it('should have three starter items in its current state', done => {
        const wrapper = shallow(<App />, {disableLifecycleMethods: true});
        expect(wrapper.state('current')).toHaveLength(3);
        done();
    });

    it('should have a hover method that toggles hover state to true', done => {
        const wrapper = shallow(<App/>, {disableLifecycleMethods: true}); 
        const instance = wrapper.instance();
        expect(wrapper.state('hover')).toBeFalsy(); 
        instance.hover()
        expect(wrapper.state('hover')).toBeTruthy();  
        done();
    });

    it('should have a hoverOut method that toggles hover state to false', done => {
        const wrapper = shallow(<App/>, {disableLifecycleMethods: true}); 
        const instance = wrapper.instance(); 
        instance.hover();
        expect(wrapper.state('hover')).toBe(true); 
        instance.hoverOut();
        expect(wrapper.state('hover')).toBe(false);
        done();
    });

    it('should have open and close modal methods that change toggle modal state', done => {
        const wrapper = shallow(<App/>, {disableLifecycleMethods: true}); 
        const instance = wrapper.instance(); 
        expect(wrapper.state('modalIsOpen')).toBe(false);
        instance.openModal(null, 'sampleImgURL.jpg'); 
        expect(wrapper.state('modalIsOpen')).toBe(true);
        expect(wrapper.state('modal')).toBe('sampleImgURL.jpg');
        instance.closeModal();
        expect(wrapper.state('modalIsOpen')).toBe(false); 
        done();
    });

    it('should have modal arrows that shift image left and right', done => {
        const wrapper = shallow(<App/>, {disableLifecycleMethods: true}); 
        wrapper.setState({
            modal: {
                URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch2.jpg",
                caption: "nemo maiores possimus",
                idx: 0,
                name: "Lempi Hartmann",
                userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg"
            },
            images: [{
                URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch2.jpg",
                caption: "nemo maiores possimus",
                idx: 1,
                name: "Lempi Hartmann",
                userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg",
            }, 
            { 
                URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch2.jpg",
                caption: "nemo maiores possimus",
                idx: 0,
                name: "Lempi Hartmann",
                userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg"
            }
        ]
    }, () => {
            const instance = wrapper.instance(); 
            instance.modalRight(); 
            expect(instance.state.modal.idx).toEqual(1);
            instance.modalLeft();
            expect(instance.state.modal.idx).toEqual(0); 
        })
        done(); 
    })

});