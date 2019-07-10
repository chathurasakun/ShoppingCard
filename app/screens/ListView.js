import React, { PureComponent } from 'react';
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Container, Header, Left, Right, Title, Body, Button, Icon } from 'native-base';
import ItemCell from '../appComponents/itemCell';
import { Actions } from 'react-native-router-flux';
import Assets from '../functions/image';
import { getListRequest } from '../redux/Actions/CartAction';
import { connect } from 'react-redux';

class ListView extends PureComponent {
  // static navigationOptions = {
  //   tabBarLabel: 'List',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Image
  //       source={Assets.delete}
  //       style={[{ tintColor: tintColor }]}
  //     />
  //   ),
  // };

  componentDidMount = () => {
    this.props.getListRequest();
  }

  render = () => {
    return (
      <Container>
        <Header>
          <Left >
            <Button
              transparent
              onPress={() => Actions.drawerOpen()}>
              <Icon name='menu' style={{ color: '#FFFFFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFFFFF', alignSelf: 'center' }}>List</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={() => Actions.push('cardListView')}>
              <Text style={{ color: '#FFFFFF' }}>Card List</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
          {(this.props.loading) ?
            <ActivityIndicator
              size='large'
              color='#7573E1'
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            :
            <FlatList
              data={this.props.cardData}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => <ItemCell listItem={item} fromCardView={false} />}
            />
          }
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardData: state.card.cardData,
    loading: state.card.loading,
    error: state.card.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListRequest: () => {
      dispatch(getListRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);

