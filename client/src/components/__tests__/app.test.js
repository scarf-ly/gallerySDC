import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import App from '/Users/TinaLe/Documents/gallery/client/src/components/App.jsx'

Enzyme.configure({ adapter: new Adapter() }); 

  
describe('App', ()=>{
    let wrapper;
    let instance;

    beforeEach(() => {
    wrapper = shallow(<App />, {disableLifecycleMethods: true});
    instance = wrapper.instance();
    }); 

    it('should have state', () =>{
        expect(wrapper.state()).toExist;

    });

    it('should have three starter items in its current state', () => {
        expect(wrapper.state('current')).toHaveLength(3);
    });

    it('should have a hover method that toggles hover state to true', () => {
        expect(wrapper.state('hover')).toBeFalsy(); 
        instance.hover()
        expect(wrapper.state('hover')).toBeTruthy(); 
    });

    it('should have a hoverOut method that toggles hover state to false', () => {
        instance.hover();
        expect(wrapper.state('hover')).toBe(true); 
        instance.hoverOut();
        expect(wrapper.state('hover')).toBe(false);
    });

    it('should have open and close modal methods that change toggle modal state', () => {
        expect(wrapper.state('modalIsOpen')).toBe(false);
        instance.openModal(null, 'sampleImgURL.jpg'); 
        expect(wrapper.state('modalIsOpen')).toBe(true);
        expect(wrapper.state('modal')).toBe('sampleImgURL.jpg');
        instance.closeModal();
        expect(wrapper.state('modalIsOpen')).toBe(false); 
    });

    it('should have add and remove arrow methods that toggle arrows state for Image Gallery', () => {
        expect(wrapper.state('arrows')).toBe(false);
        instance.addArrows(); 
        expect(wrapper.state('arrows')).toBe(true);
        instance.removeArrows();
        expect(wrapper.state('arrows')).toBe(false); 
    });

    it('should have modal arrows that shift image left and right', () => {
        wrapper.setState({
            modal: {
                URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch1.jpg",
                caption: "cap1",
                idx: 0,
                name: "name1",
                userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg"
            },
            images: [{
                URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch2.jpg",
                caption: "nemo maiores possimus",
                idx: 1,
                name: "name2",
                userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg",
            }, 
            { 
                URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch1.jpg",
                caption: "nemo maiores possimus",
                idx: 0,
                name: "Lempi Hartmann",
                userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg"
            }
            ]}, () =>{
                instance.modalRight(); 
                expect(instance.state.modal.idx).toEqual(1);
                instance.modalLeft();
                expect(instance.state.modal.idx).toEqual(0); 
            })
    });

});