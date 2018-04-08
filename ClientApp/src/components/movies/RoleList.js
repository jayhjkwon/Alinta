import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';

export const MovieName = styled.span`
	font-weight: 300;
	color: #333;
`;

const RoleList = props => (
	<ListGroup>
		{props.roles.map(role => {
			return (
				<ListGroupItem key={`${role.actor}_${role.name}_${role.movieName}`}>
					<span className="role-name">{role.name}</span>
					<MovieName>
						{' '}({role.movieName})
					</MovieName>
				</ListGroupItem>
			)
		})}
	</ListGroup>
)

export default RoleList;
