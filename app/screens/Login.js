import React, { PureComponent } from 'react';
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
//import { storeUser } from '../../redux/actions/userAction';
import { login } from '../redux/Actions/AuthActions';
//import Images from '../functions/image';
import { Container, Content, Button } from 'native-base';
//import jwt_decode from 'jwt-decode';
//import DropdownAlert from 'react-native-dropdownalert';

class Login extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			nic: '',
			password: '',
			passError: '',
			nicError: '',
			isLogging: false,
			isPushedToken: false,
			showPassword: true,
			showText: 'SHOW'
		}
	}

	componentDidMount = () => {
		console.log('in the logging screen');
	}

	showPassword = () => {
		if (this.state.showPassword)
			this.setState({
				showPassword: false,
				showText: 'HIDE'
			});
		else
			this.setState({
				showPassword: true,
				showText: 'SHOW'
			});
	}

	LoginToDashboard = () => {
		if (this.state.password !== '' && this.state.passError === '' && this.state.nic !== '' && this.state.nicError === '') {
			this.props.login(this.state.nic, this.state.password);
			// this.setState({ isLogging: true }, () => {
			// 	BackendFactory((api) => {
			// 		api.login(data, (res, error) => {
			// 			if (res && res.data) {
			// 				store.save('sessionToken', { sessionToken: res.data }).then((sessionToken) => {
			// 					let decode = jwt_decode(res.data.token);
			// 					this.setState({
			// 						username: '',
			// 						password: '',
			// 						isLogging: false
			// 					}, () => this.getUserDetailsByUserId(decode));
			// 				})
			// 					.catch((error) => console.log(error.message));
			// 			}
			// 			else {
			// 				this.setState({ isLogging: false }, () => this.dropdown.alertWithType('error', '', 'Please Check Password'));
			// 			}
			// 		});
			// 	});
			// });
		}
		else {
			if (this.state.password === '') {
				this.setState({
					passError: 'Please enter a password'
				});
			}
		}
	}

	// persistPushToken = () => {
	// 	this.setState({ isPushedToken: true }, () => {
	// 		BackendFactory((api) => {
	// 			api.persistPushToken((res, error) => {
	// 				if (res && res.data === '') {
	// 					this.setState({ isPushedToken: false }, () => Actions.ongoingJob());
	// 				}
	// 				else {
	// 					this.setState({ isPushedToken: false }, () => this.dropdown.alertWithType('error', 'Error', error.message));
	// 				}
	// 			});
	// 		});
	// 	});
	// }

	getUserDetailsByUserId = (decode) => {
		this.setState({ isLogging: true }, () => {
			BackendFactory((api) => {
				api.getUser(decode.userID, (res, error) => {
					if (res && res.data) {
						this.setState({ isLogging: false }, () => {
							const newUser = { ...res.data, ...decode };
							this.props.storeUser(newUser);
							this.persistPushToken();
						});
					}
					else {
						this.setState({ isLogging: false }, () => this.dropdown.alertWithType('error', 'Error', error.message));
					}
				});
			});
		});
	}

	passwordIsEmpty = (text) => {
		if (text.length < 8) {
			this.setState({
				passError: 'Please enter a password',
				password: text
			});
		}
		else {
			this.setState({
				passError: '',
				password: text
			});
		}
	}

	validateNIC = (nic) => {
		let reg = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
		if (reg.test(nic)) {
			this.setState({
				nicError: '',
				nic: nic
			});
		}
		else {
			this.setState({
				nicError: 'NIC Number not correct',
				nic: nic
			});
		}
	}

	render = () => {
		return (
			<Container>
				<Content keyboardShouldPersistTaps='always'>
					<View style={Loginstyle.inputContainer}>
						<TextInput
							style={Loginstyle.inputs}
							editable={true}
							placeholder={'Nic'}
							placeholderTextColor='#000000'
							ref='nic'
							keyboardType='default'
							underlineColorAndroid='transparent'
							onChangeText={(nic) => this.validateNIC(nic)}
							value={this.state.nic}
						/>
					</View>
					<View style={Loginstyle.inputContainer}>
						<TextInput
							style={Loginstyle.inputs}
							editable={true}
							placeholder={'Password'}
							placeholderTextColor='#000000'
							ref='password'
							returnKeyType='next'
							secureTextEntry={this.state.showPassword}
							underlineColorAndroid='transparent'
							onChangeText={(password) => this.passwordIsEmpty(password)}
							value={this.state.password}
						/>
						<TouchableOpacity
							hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
							style={{ flex: 0.12 }}
							onPress={() => this.showPassword()}>
							<Text style={{ color: '#000000', fontSize: 11 }}>{this.state.showText}</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, alignSelf: 'center' }}>
						<Button style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#1422D5', width: 300, height: 55, borderRadius: 8 }} transparent onPress={this.LoginToDashboard}>
							<Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700' }}>Login</Text>
						</Button>
					</View>
				</Content>
			</Container>
		)
	}

}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => {
			dispatch(login(email, password))
		}
	}
}

const Loginstyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#DCDCDC',
	},
	imageContainer: {
		top: 50,
		borderRadius: 8,
		color: '#000000'
	},
	inputContainer: {
		borderColor: '#000000',
		borderWidth: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		//marginBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 3
	},
	inputs: {
		fontSize: 15,
		flex: 1,
		color: '#000000'
	},
	buttonContainer: {
		height: '7%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 12,
		width: '85%',
		borderRadius: 3
	},
	loginButton: {
		backgroundColor: '#000000'
	},
	registerButton: {
		backgroundColor: '#000000'
	},
	loginText: {
		color: '#7573E1',
		fontWeight: '500',
		fontSize: 14
	},
	registerText: {
		color: '#007CC4',
		fontWeight: 'bold',
		fontSize: 15
	}
});

export default connect(null, mapDispatchToProps)(Login);
