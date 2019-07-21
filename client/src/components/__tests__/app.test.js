import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import App from '/Users/TinaLe/Documents/gallery/client/src/components/App.jsx';
import sampleData from '/Users/TinaLe/Documents/gallery/client/src/data/sampleData.js';



Enzyme.configure({ adapter: new Adapter() }); 

let wrapper;
let instance;

beforeEach(() => {
    wrapper = shallow(<App />, {disableLifecycleMethods: true});
    instance = wrapper.instance();
}); 
  
xdescribe('App', () => {

    it('should have state', () =>{
        expect(wrapper.state()).toExist;
    });

    // it('should have three starter items in its current state', () => {
    //     expect(wrapper.state('current')).toHaveLength(3);
    // });

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

    it('should have a close button only when modal is open', () => {
        expect(wrapper.state('modalIsOpen')).toBe(false); 
        expect(wrapper.find('.close')).toHaveLength(0);
        instance.openModal(null, 'sampleImgURL.jpg'); 
        expect(wrapper.state('modalIsOpen')).toBe(true);
        expect(wrapper.find('.close')).toHaveLength(1);
    });

    it('should close modal on close button click', () => {
        wrapper.instance().closeModal = jest.fn();
        wrapper.update();
        instance.openModal(null, 'sampleImgURL.jpg');
        wrapper.find('.close').simulate('click'); 
        expect(wrapper.instance().closeModal).toHaveBeenCalled();
    });

    it('should have methods that scroll left and right', () => {
        wrapper.setState({
            modal: sampleData[0],
            images: sampleData
        }, () => {
            expect(wrapper.state('currStart')).toEqual(0); 
            instance.clickScroll(); 
            expect(wrapper.state('currStart')).toEqual(1);
            instance.backScroll(); 
            expect(wrapper.state('currStart')).toEqual(0);
        });
    });
});

describe('Modal', () => {

    beforeEach(() => {
        instance.openModal(null, 'sampleImgURL.jpg');
    }); 
    
    it('should have an image element', () => {
        expect(wrapper.exists('img')).toEqual(true);
    });

    it('should have an info panel with user information', () => {
        expect(wrapper.exists('.info')).toEqual(true);
        expect(wrapper.exists('.user')).toEqual(true);
        expect(wrapper.exists('.friend')).toEqual(true);
        expect(wrapper.exists('.star')).toEqual(true);

    })

    it('should fire off modal left method when left arrow is clicked', () => {
        wrapper.instance().modalLeft = jest.fn();
        wrapper.update();
        expect(wrapper.find('.left')).toHaveLength(1);
        wrapper.find('.left').simulate('click');
        expect(wrapper.instance().modalLeft).toHaveBeenCalled();
    });

    it('should fire off modal right method when right arrow is clicked', () => {
        wrapper.instance().modalRight = jest.fn();
        wrapper.update();
        expect(wrapper.find('.right')).toHaveLength(1);
        wrapper.find('.right').simulate('click');
        expect(wrapper.instance().modalRight).toHaveBeenCalled();
    });

    it('should have modal arrows that shift image left and right', () => {
        wrapper.setState({
            modal: sampleData[0],
            images: sampleData
        }, () => {
                instance.modalRight(); 
                expect(instance.state.modal.idx).toEqual(1);
                instance.modalLeft();
                expect(instance.state.modal.idx).toEqual(0); 
        })
    });

});