import React from 'react';
import { Route } from 'react-router';
import Layout from './components/shared/Layout';
import Movies from './components/movies/Index';

export default () => (
	<div>
		<Layout>
			<Route exact path='/' component={Movies} />
		</Layout>
	</div>
);
