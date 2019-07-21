import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
import ImageGallery from '/Users/TinaLe/Documents/gallery/client/src/components/ImageGallery.jsx'
import { exportDefaultSpecifier } from '@babel/types';

Enzyme.configure({ adapter: new Adapter() }); 

xdescribe('ImageGallery', () => {
    it('shoud have a gallery class', () => {
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']}/>, {disableLifecycleMethods: true});
        expect(wrapper.find('.gallery')).toHaveLength(1);
    });

    it('should have visible arrow icons when arrows is true and modal is false', () => {
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']} arrows={true} modal={false} />, {disableLifecycleMethods: true});
        expect(wrapper.find('.fa-chevron-right')).toHaveLength(1);
        expect(wrapper.find('.fa-chevron-left')).toHaveLength(1);
        expect(wrapper.find('.left')).toHaveLength(1);
        expect(wrapper.find('.right')).toHaveLength(1);
    });

    it('should not have visible when arrows is true and modal is true', () => {
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']} arrows={true} modal={true} />, {disableLifecycleMethods: true});
        expect(wrapper.find('.fa-chevron-right')).toHaveLength(0);
        expect(wrapper.find('.fa-chevron-left')).toHaveLength(0);
        expect(wrapper.find('.left')).toHaveLength(0);
        expect(wrapper.find('.right')).toHaveLength(0);
    });

    it('should add arrows on mouse over', () => {
        const mouseover = jest.fn();
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']}/>);
        wrapper.setProps({
          onAddArrows: mouseover,
        });
        wrapper.find('.gallery').simulate('mouseover');
        expect(mouseover).toHaveBeenCalled();
      });
    
    it('should remove arrows on mouse out', () => {
        const mouseOut = jest.fn();
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']}/>);
        wrapper.setProps({
          onRemoveArrows: mouseOut,
        });
        wrapper.find('.gallery').simulate('mouseout');
        expect(mouseOut).toHaveBeenCalled();
    });

    it('should fire off scrolling when right arrow is clicked', () => {
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']} arrows={true} modal={false}/>);
        const clickfn = jest.fn(); 
        wrapper.setProps({
            onClickScroll: clickfn,
        })
        wrapper.find('.fa-chevron-right').simulate('click');
        expect(clickfn).toHaveBeenCalled();
    });

    it('should fire off scrolling when right arrow is clicked', () => {
        const wrapper = shallow(<ImageGallery images={['img1', 'img2', 'img3']} arrows={true} modal={false}/>);
        const clickfn = jest.fn(); 
        wrapper.setProps({
            onBackScroll: clickfn,
        })
        wrapper.find('.fa-chevron-left').simulate('click');
        expect(clickfn).toHaveBeenCalled();
    });


});

// console.log(wrapper.debug());