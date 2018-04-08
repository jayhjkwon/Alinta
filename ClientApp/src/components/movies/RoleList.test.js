import React from 'react';
import { shallow, mount } from 'enzyme';
import RoleList, { MovieName } from './RoleList';

it('renders role name', () => {
	const roles = [
		{
			actor: 'Eddie Murphy',
			name: 'Axel Foley',
			movieName: 'Beverly Hills Cop'
	 	}
	];
  const wrapper = shallow(<RoleList roles={roles} />);
	expect(wrapper.find('.role-name').exists()).toEqual(true);
	expect(wrapper.find('.role-name').text()).toEqual('Axel Foley');
});

it('renders movie name', () => {
	const roles = [
		{
			actor: 'Eddie Murphy',
			name: 'Axel Foley',
			movieName: 'Beverly Hills Cop'
	 	}
	];
	const wrapper = shallow(<RoleList roles={roles} />);
	const movieName = <MovieName> (Beverly Hills Cop)</MovieName>
	expect(wrapper.contains(movieName)).toEqual(true);
});
