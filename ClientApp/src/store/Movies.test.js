import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import fetchMock from 'fetch-mock'
import {
	actionCreators,
	reducer,
	requestMovieListType,
	successMovieListType,
	sortActorList
} from './Movies'

const testData = [
  {
    "name": "Beverly Hills Cop",
    "roles": [
      {
        "name": "Axel Foley",
        "actor": "Eddie Murphy"
      },
      {
        "name": "Mikey Tandino",
        "actor": ""
      }
    ]
	},
	{
    "name": "Stand By Me",
    "roles": [
      {
        "name": "Gorgie Lachance",
        "actor": "Wil Wheaton"
      },
      {
        "name": "Ace Merrill",
        "actor": "Keifer Sutherland"
      }
    ]
  },
  {
    "name": "Star Trek",
    "roles": [
      {
        "name": "Romulan",
        "actor": "Wil Wheaton"
      },
      {
        "name": "Amanda Grayson",
        "actor": "Winona Ryder"
      }
    ]
  },
  {
    "name": "Family Guy",
    "roles": [
      {
        "name": "Meg Griffin",
        "actor": "Mila Kunis"
      },
      {
        "name": "Meg Griffin",
        "actor": "Mila Kunis"
      },
      {
        "name": "Chris Griffin",
        "actor": "Seth Green"
      },
      {
        "name": "Luke Skywalker",
        "actor": "Seth Green"
      },
      {
        "name": "Joe Swanson"
      }
    ]
  },
  {
    "roles": [
      {
        "name": "Dr Barry Wolfson",
        "actor": "Keifer Sutherland"
      }
    ]
  }
];

const mockedDispatch = payload => payload

describe('actionCreators ', () => {
	afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
	});

	it('action creators should have properties', () => {
		expect(actionCreators).toHaveProperty('getMovieList');
		expect(actionCreators).toHaveProperty('sortActorList');
	});

	it('getMovieList action creator should create successMovieListType type action', async () => {
		fetchMock.getOnce('api/movies', []);

		const successAction = await actionCreators.getMovieList()(mockedDispatch);

		expect(successAction).toEqual({ type: successMovieListType, movies: [] });
	});

	it('sortActorList action creator should create an action to sort actors', () => {
		expect(actionCreators.sortActorList(true)(mockedDispatch)).toEqual({
			type: sortActorList,
			descending: true
		});

		expect(actionCreators.sortActorList(false)(mockedDispatch)).toEqual({
			type: sortActorList,
			descending: false
		});
	});
});

describe('Movies reducer', () => {
	it('should return initial state', () => {
		const state = reducer(undefined, {});
		expect(state).toEqual({
			movies: [],
			actors: [],
			isLoading: false,
			descending: false
		})
	});

	it('should handle requestMovieListType action type', () => {
		const state = reducer(undefined, {type: requestMovieListType});
		expect(state.isLoading).toEqual(true);
	});

	describe('should handle successMovieListType action type', () => {

		let state = null;

		beforeAll(() => {
			state = reducer(undefined, { type: successMovieListType, movies: testData });
		});

		it('isLoading should be false', () => {
			expect(state.isLoading).toEqual(false);
		});

		it('actors should be returned', () => {
			expect(state.actors.length).toEqual(6);
		});

		it('actors should be returned as expected format', () => {
			expect(state.actors[0]).toHaveProperty('actorName');
			expect(state.actors[0]).toHaveProperty('roles');
			expect(_.isArray(state.actors[0].roles)).toEqual(true);
		});

		it('"Eddie Murphy" starred as "Axel Foley" in "Beverly Hills Cop" ', () => {
			expect(state.actors[0].roles.length).toEqual(1);
			expect(state.actors[0].roles[0]).toEqual({
				name: 'Axel Foley',
				actor: 'Eddie Murphy',
				movieName: 'Beverly Hills Cop'
			})
		});

		it('"Wil Wheaton" starred in the two moviesas', () => {
			expect(state.actors[4].roles.length).toEqual(2);
		});

		it('character names should be sorted by its movie name', () => {
			expect(state.actors[4].roles.length).toEqual(2);
			expect(state.actors[4].roles[0]).toEqual({
				actor: 'Wil Wheaton',
				name: 'Gorgie Lachance',
				movieName: 'Stand By Me'
			});
			expect(state.actors[4].roles[1]).toEqual({
				actor: 'Wil Wheaton',
				name: 'Romulan',
				movieName: 'Star Trek'
			});
		});

		it('actor list should be sorted by actor name in ascending order by default', () => {
			expect(state.actors[0].actorName).toEqual('Eddie Murphy');
			expect(state.actors[state.actors.length - 1].actorName).toEqual('Winona Ryder');
		});

		it('data with empty actor name should not be returned', () => {
			const emptyActorNameData = _.filter(state.actors, actor => !actor);
			expect(emptyActorNameData.length).toEqual(0);
		});

		it('duplicated roles shoud be combined', () => {
			const milaKunis = _.find(state.actors, actor => actor.actorName === 'Mila Kunis');
			expect(milaKunis.roles.length).toEqual(1);
		});
	});

	describe('should handle sortActorList action type', () => {

		let state = null;

		beforeAll(() => {
			state = reducer(undefined, { type: successMovieListType, movies: testData });
		});

		it('descending should be false by default', () => {
			expect(state.descending).toEqual(false);
		});

		it('actors should be sorted by actorName', () => {
			expect(state.actors[0].actorName).toEqual('Eddie Murphy');
			state = reducer(state, { type: sortActorList, descending: true });
			expect(state.actors[0].actorName).toEqual('Winona Ryder');
			state = reducer(state, { type: sortActorList, descending: false });
			expect(state.actors[0].actorName).toEqual('Eddie Murphy');
		});
	});


});
