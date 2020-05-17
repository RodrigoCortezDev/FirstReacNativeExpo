import React from 'react';
import Routes from './src/routes';
import { StatusBar } from 'react-native';

import './src/config/ReactotronConfig';

export default function App() {
	return (
		<>
			<StatusBar backgroundColor="#7159c1" barStyle="light-content" />
			<Routes />
		</>
	);
}
