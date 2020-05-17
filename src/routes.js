import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/Users';

// Criação do Objeto que define o tipo de fila
const Stack = createStackNavigator();

// Criação da fila
function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTintColor: 'white',
					headerStyle: { backgroundColor: '#7159c1' },
					headerTitleAlign: 'center',
					title: 'Sem titulo',
					headerBackTitleVisible: false,
				}}
			>
				<Stack.Screen
					name="Main"
					component={Main}
					options={{
						title: 'Pagina Inicial',
					}}
				/>
				<Stack.Screen
					name="Users"
					component={User}
					options={{
						title: 'Pagina de Usuários',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;
