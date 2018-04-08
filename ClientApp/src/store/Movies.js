import _ from 'lodash';

export const requestMovieListType = 'REQUEST_MOVIE_LIST';
export const successMovieListType = 'SUCCESS_MOVIE_LIST';
export const failMovieListType = 'FAIL_MOVIE_LIST';
export const sortActorList = 'SORT_ACTOR_LIST';
export const initialState = {
	movies: [],
	actors: [],
	isLoading: false,
	descending: false
};

export const actionCreators = {
  getMovieList: () => async (dispatch) => {
    dispatch({ type: requestMovieListType });

    const response = await fetch('api/movies');
    const movies = await response.json();

    return dispatch({ type: successMovieListType, movies });
	},

	sortActorList: descending => dispatch => {
		return dispatch({ type: sortActorList, descending })
	}
};


export const reducer = (state = initialState, action) => {

  if (action.type === requestMovieListType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === successMovieListType) {

		const actors = _.chain(action.movies)
			.flatMap(movie => {
				return movie.roles.map(role => ({
						name: role.name,
						actor: role.actor,
						movieName: movie.name
				}))
			})
			.filter(item => item.actor && item.name && item.movieName)
			.uniqBy(item => `${item.name}_${item.actor}_${item.movieName}`)
			.orderBy(['movieName'], ['asc'])
			.groupBy('actor')
			.map((value, key) => ({
				actorName: key,
				roles: value
			}))
			.orderBy(['actorName'], [state.descending ? 'desc' : 'asc'])
			.value();

    return {
      ...state,
			movies: action.movies,
			actors,
			isLoading: false
    };
	}

	if (action.type === sortActorList) {
		return {
			...state,
			actors: _.orderBy(state.actors, ['actorName'], [action.descending ? 'desc' : 'asc']),
			descending: action.descending
		}
	}

  return state;
};
