import React from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import {
	Container,
	Form,
	Input,
	SubmitButton,
	SubmitButtonText,
	List,
	User,
	Avatar,
	Name,
	Bio,
	ProfileButton,
	ProfileButtonText,
} from './styles';
import api from '../../services/api';

import { MaterialIcons } from 'react-native-vector-icons';

export default class Main extends React.Component {
	//Variaveis de estado
	state = {
		newUser: '',
		users: [],
		loading: false,
	};

	//Ao abrir o app
	async componentDidMount() {
		const users = await AsyncStorage.getItem('users');
		if (users) {
			this.setState({ users: JSON.parse(users) });
		}
	}

	//Ao alterar o state
	async componentDidUpdate(_, prevState) {
		const { users } = this.state;
		if (prevState.users !== users) {
			await AsyncStorage.setItem('users', JSON.stringify(users));
		}
	}

	//Adicionar o usuário
	handleAddUser = async () => {
		const { users, newUser } = this.state;

		try {
			this.setState({ loading: true });
			const response = await api.get(`/users/${newUser}`);

			const data = {
				name: response.data.name,
				login: response.data.login,
				bio: response.data.bio,
				avatar: response.data.avatar_url,
			};

			this.setState({ users: [...users, data], newUser: '', loading: false });
		} catch (error) {
			this.setState({ newUser: '', loading: false });
		}

		Keyboard.dismiss();
	};

	//Realiza a navegação entre abas
	handleNavigateUser = (user) => {
		const { navigation } = this.props;
		if (navigation) {
			navigation.navigate('Users', { user });
		}
	};

	//Renderização da tela
	render() {
		const { users, newUser, loading } = this.state;

		return (
			<Container>
				<Form>
					<Input
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Adicionar Usuário..."
						onChangeText={(text) => this.setState({ newUser: text })}
						returnKeyType="send"
						onSubmitEditing={this.handleAddUser}
						value={newUser}
					/>
					<SubmitButton enabled={!loading} carregando={loading} rippleColor="#fff" onPress={this.handleAddUser}>
						{loading ? <ActivityIndicator color="#fff" /> : <SubmitButtonText> + </SubmitButtonText>}
					</SubmitButton>

					{/* <SubmitButton color="#fff" onPress={() => this.props.navigation.navigate('Users')}>
						<Icon name="add" size={20} color="#fff" />
					</SubmitButton> */}
				</Form>

				<List
					data={users}
					keyExtractor={(user) => user.login} //{(user, login) => login.toString()}
					renderItem={({ item }) => (
						<User>
							<Avatar source={{ uri: item.avatar }} />
							<Name>{item.name}</Name>
							<Bio>{item.bio}</Bio>
							<ProfileButton onPress={() => this.handleNavigateUser(item)}>
								<ProfileButtonText>Ver Perfil</ProfileButtonText>
							</ProfileButton>
						</User>
					)}
				/>
			</Container>
		);
	}
}
