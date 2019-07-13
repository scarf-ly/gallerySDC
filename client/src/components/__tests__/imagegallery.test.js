import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import ImageGallery from '/Users/TinaLe/Documents/gallery/client/src/components/ImageGallery.jsx'
import { exportDefaultSpecifier } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() }); 

describe('ImageGallery', () => {
    it('shoud have a gallery class', () => {
        const wrapper = mount(<ImageGallery images={['img1', 'img2', 'img3']} arrows={true} modal={false} />, {disableLifecycleMethods: true});
        expect(wrapper.find('.gallery')).toHaveLength(1);
    });

    it('should have arrow icons', () => {
        const wrapper = mount(<ImageGallery images={['img1', 'img2', 'img3']} arrows={true} modal={false} />, {disableLifecycleMethods: true});
        expect(wrapper.find('.fa-chevron-right')).toHaveLength(1);
        expect(wrapper.find('.fa-chevron-left')).toHaveLength(1);
        expect(wrapper.find('.gallery'))
    });
});

// console.log(wrapper.debug());