import React from 'react';
import { shallow, mount } from 'enzyme';
import ActorList, { generateKey } from './ActorList';

it('renders actor name', () => {
	const actors = [
		{
			actorName: 'Eddie Murphy',
			roles: [
				{
					actor: 'Eddie Murphy',
					name: 'Axel Foley',
					movieName: 'Beverly Hills Cop'
				 }
			]
		}
	];
  const wrapper = mount(<ActorList actors={actors} />);
	expect(wrapper.find('span.actor-name').exists()).toEqual(true);
	expect(wrapper.find('span.actor-name').length).toEqual(1);
	expect(wrapper.find('span.actor-name').text()).toEqual('Eddie Murphy');
});

it('generateKey should create a key using actor name', () => {
	const actor = {
		actorName: 'Eddie Murphy'
	};

	const key = generateKey(actor);
	const expected = 'Eddie Murphy';
	expect(key).toEqual(expected);
});

it('generateKey should create a key with roles info when having roles', () => {
	const actor = {
		actorName: 'Eddie Murphy',
		roles: [
			{
				actor: 'Eddie Murphy',
				name: 'Axel Foley',
				movieName: 'Beverly Hills Cop'
			},
			{
				actor: 'Eddie Murphy',
				name: 'Nero',
				movieName: 'Star Trek'
			}
		]
	};

	const key = generateKey(actor);
	const expected = 'Eddie Murphy+Axel Foley_Beverly Hills Cop+Nero_Star Trek';
	expect(key).toEqual(expected);
});
