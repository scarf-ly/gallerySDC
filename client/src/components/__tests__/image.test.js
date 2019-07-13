import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import Image from '/Users/TinaLe/Documents/gallery/client/src/components/Image.jsx';

Enzyme.configure({ adapter: new Adapter() }); 

describe('Image', () => {
    let wrapper; 

    beforeEach(() => {
        wrapper = shallow(<Image image={{
            URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch2.jpg",
            caption: "nemo maiores possimus",
            idx: 1,
            name: "name2",
            userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg",
        }} />, {disableLifecycleMethods: true});
        expect(wrapper.exists('img')).toEqual(true);
    }); 

    it('should have an image element', () => {
        expect(wrapper.exists('img')).toEqual(true);
    }); 

    it('should have a user image class', () => {
        expect(wrapper.exists('.userImage')).toEqual(true);
    })

    it('should open modal on click', () => {
        const clickFn = jest.fn();
        wrapper.setProps({
            onOpenClick: clickFn,
        });
        wrapper.find('.foodImg').simulate('click');
        expect(clickFn).toHaveBeenCalled();
    });

    it('should fire off hover toggle functions on mouseover and mouseout', () => {
        const mouseIn = jest.fn();
        const mouseOut = jest.fn(); 
        wrapper.setProps({
            onHover: mouseIn,
            onHoverOut: mouseOut,
        });
        wrapper.find('.foodImg').simulate('mouseover');
        expect(mouseIn).toHaveBeenCalled();
        wrapper.find('.foodImg').simulate('mouseout');
        expect(mouseOut).toHaveBeenCalled();
    });

});