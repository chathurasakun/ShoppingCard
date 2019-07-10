import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, SectionList, Image } from 'react-native';
import DrawerCell from '../appComponents/DrawerCell';
import Images from '../functions/image';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
//import store from 'react-native-simple-store';
//import { strings } from '../i18';
//import { CachedImage } from 'react-native-cached-image';

class SideMenu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			firstName: 'CHATHURA',
			lastName: 'ELLAWALA',
			userType: '',
			imgUrl: ''
		}
	};

	logout = () => {
		Actions.registration();
	}

	goToHome = () => {

	}

	goToChangeLanguage = () => {

	}

	goToMyAccount = () => {

	}

	goToSync = () => {

	}

	goToAbout = () => {

	}

	goToHelpandSupport = () => {

	}

	goToContact = () => {

	}

	returnSideMenuList = () => {
		let sections = [
			{ key: "home", data: [{ action: this.goToHome, icon: Images.plus, title: 'Parking', key: "1" }] },
			{ key: "language", data: [{ action: this.goToChangeLanguage, icon: Images.minus, title: 'Gps', key: "2" }] },
			{ key: "logout", data: [{ action: this.logout, icon: Images.delete, title: 'Sign out', key: "0" }] }
		];

		return sections;
	}

	render = () => {
		return (
			<Container>
				<View style={styles.header}>
					<View style={{ width: '100%', height: '100%', backgroundColor: '#ffaf20' }} />
					<View style={styles.detailContainer}>
						{(this.state.imgUrl === '') ?
							<Image
								source={Images.userImage}
								style={{
									width: 75,
									height: 75,
									borderColor: '#FFFFFF',
									borderWidth: 2,
									borderRadius: 75 / 2
								}}
							/>
							:
							null
						}
						<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', marginLeft: '3%' }}>
							<Text style={[styles.navHeaderName]}>{this.state.firstName}</Text>
							<Text style={[styles.navHeaderName]}>{this.state.lastName}</Text>
							<Text style={[styles.navHeaderUserRole]}>{this.state.userType}</Text>
						</View>
					</View>
				</View>
				<View>
					<SectionList
						sections={this.returnSideMenuList()}
						renderItem={({ item }) =>
							<DrawerCell
								icon={item.icon}
								title={item.title}
								action={item.action.bind(this)}
							/>
						}
						renderSectionHeader={({ section }) =>
							section.key === "logout" ?
								<View style={{ flex: 1, height: 0.4, backgroundColor: "#DFDFDF" }} />
								:
								null
						}
					/>
				</View>
				<View style={{ flexDirection: 'row', position: 'absolute', bottom: 2 }}>
					<View style={{ flexDirection: 'row', flex: 3 }}>
						<Text style={{ color: '#ffaf20', fontSize: 20, fontWeight: '300', marginLeft: 20 }}>CITY</Text>
						<Text style={{ color: '#ffaf20', fontSize: 20, fontWeight: 'bold' }}>MEAD</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={{ color: '#828282', fontSize: 18, fontWeight: 'normal' }}>V 0.1</Text>
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		height: 140
	},
	detailContainer: {
		position: 'absolute',
		bottom: 30,
		left: 25,
		flexDirection: 'row',
	},
	navHeaderName: {
		fontSize: 20,
		color: '#FFFFFF',
		fontWeight: 'bold'
	},
	navHeaderUserRole: {
		fontSize: 14,
		color: '#FFFFFF',
		fontWeight: 'normal'
	}
});

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.user.userObject
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		removeUser: () => {
// 			dispatch(removeUser())
// 		}
// 	}
// }

export default SideMenu;