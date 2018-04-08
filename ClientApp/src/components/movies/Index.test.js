import React from 'react';
import { shallow, mount } from 'enzyme';
import { Index, SortingIcon } from './Index';

let props = null;
let wrapper = null;

beforeEach(() => {
	props = {
		getMovieList: jest.fn(),
		sortActorList: jest.fn()
	}
	wrapper = shallow(<Index {...props} />);
});

it('getMovieList function should be called after component mounted', () => {
	expect(props.getMovieList.mock.calls.length).toEqual(1);
});

it('sortActorList function should be called when sorting icon clicked', () => {
	wrapper.find('.home__sorting-icon').simulate('click');
	expect(props.sortActorList.mock.calls.length).toEqual(1);
});

it('SortingIcon component should have proper class name', () => {
	let sortingIconWrapper = shallow(<SortingIcon descending={true} />);
	expect(sortingIconWrapper.hasClass('fa-sort-amount-down')).toEqual(true);

	sortingIconWrapper = shallow(<SortingIcon descending={false} />);
	expect(sortingIconWrapper.hasClass('fa-sort-amount-up')).toEqual(true);
});

