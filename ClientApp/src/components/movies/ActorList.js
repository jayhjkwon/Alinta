import React from 'react';
import _ from 'lodash';
import RoleList from './RoleList';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export const generateKey = actor => {
	if (actor.roles) {
		let roleNameAndMovieName = [];
		_.each(actor.roles, (role) => {
			roleNameAndMovieName.push(`${role.name}_${role.movieName}`);
		});
		return `${actor.actorName}+${roleNameAndMovieName.join('+')}`;
	}

	return actor.actorName;
}

const ActorList = props => (
	<div>
		{props.actors.map(actor => {
			return (
				<ListGroup key={generateKey(actor)}>
					<ListGroupItem
						className="actor-name"
						active>
						{actor.actorName}
					</ListGroupItem>

					<RoleList roles={actor.roles} />
				</ListGroup>
			)
		})}

	</div>
)

export default ActorList;
