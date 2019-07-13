import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import CenterImage from '/Users/TinaLe/Documents/gallery/client/src/components/CenterImage.jsx';

Enzyme.configure({ adapter: new Adapter() }); 

describe('Center Image', () => {

    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<CenterImage image={{
            URL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Small/munch2.jpg",
            caption: "nemo maiores possimus",
            idx: 1,
            name: "name2",
            userURL:"https://munch-gallery.s3-us-west-1.amazonaws.com/Users/users9.jpg",
        }} />, {disableLifecycleMethods: true});
    }); 

    it('should have an image element', () => {
        expect(wrapper.exists('img')).toEqual(true);
    }); 

    it('should have user image and caption classes', () => {
        expect(wrapper.exists('.userImage')).toEqual(true);
        expect(wrapper.exists('.caption')).toEqual(true);

    });

    it('should open modal on click', () => {
        const clickFn = jest.fn();
        wrapper.setProps({
            onOpenClick: clickFn,
        });
        wrapper.find('.centerFoodImg').simulate('click');
        expect(clickFn).toHaveBeenCalled();
    });

    it('should toggle to a smaller image when hover property is true', () => {
        wrapper.setProps({
            hover: true,
        });
        expect(wrapper.exists('.centerFoodImgSmall')).toEqual(true);
        wrapper.setProps({
            hover: false,
        });
        expect(wrapper.exists('.centerFoodImgSmall')).toEqual(false);
    })


});