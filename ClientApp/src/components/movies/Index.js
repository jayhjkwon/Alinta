import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Movies';
import ActorList from './ActorList';
import styled from 'styled-components';

export const SortingIcon = styled.i.attrs({
	className: props => `fas pull-right ${props.descending ? 'fa-sort-amount-down' : 'fa-sort-amount-up'}`
})`
	cursor: pointer;
	font-size: .8em;
	margin-top: .2em;
`;

export class Index extends Component {
	componentDidMount() {
		this.props.getMovieList();
	}

	handleSortIconClick = () => {
		this.props.sortActorList(!this.props.descending);
	}

	render() {
		return (
			<div>
				<h2>
					Actor List
					<SortingIcon
					  className="home__sorting-icon"
						onClick={this.handleSortIconClick}
						descending={this.props.descending} />
				</h2>

				<ActorList actors={this.props.actors} />
  		</div>
		)
	}
}

export default connect(
  state => state.movies,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Index);
