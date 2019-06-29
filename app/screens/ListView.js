import React, { PureComponent } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Left, Right, Title, Body } from 'native-base';
import ItemCell from '../appComponents/itemCell';
import { Actions } from 'react-native-router-flux';

class ListView extends PureComponent {

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
          <FlatList
            data={this.props.items}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => <ItemCell listItem={item} fromCardView={false} />}
            scrollEnabled={true}
          />
        </View>
      </Container>
    )
  }

}

export default ListView;
