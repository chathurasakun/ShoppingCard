import React, { PureComponent } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Left, Right, Title, Body } from 'native-base';
import ItemCell from '../appComponents/itemCell';
import { Actions } from 'react-native-router-flux';
import { getList } from '../redux/Actions/CartAction';
import { connect } from 'react-redux';
import CustomIndicator from '../appComponents/CustomIndicator';

class ListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  componentDidMount = () => {
    this.props.getList();
  }

  render = () => {
    return (
      <Container>
        <Header>
          <Left />
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
            <CustomIndicator
              isFetching={this.props.loading}
              empty={this.props.cardData.length === 0}
              error={this.state.error}
              errorText={''}
            />
            :
            <FlatList
              data={this.props.cardData}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => <ItemCell listItem={item} fromCardView={false} />}
              scrollEnabled={true}
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
    getList: () => {
      dispatch(getList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);

