import React, { PureComponent } from 'react';
import { getAll } from '../server/Service';
import { Container } from 'native-base';
import { ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CustomIndicator from '../appComponents/CustomIndicator';

class Init extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      items: [],
      error: null
    }
  }

  componentDidMount = () => {
    return getAll()
      .then((responseJson) => {
        this.setState({
          isFetching: false,
          items: responseJson.fruits
        }, () => Actions.listView({ items: responseJson.fruits }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render = () => {
    return (
      <CustomIndicator
        isFetching={this.state.isFetching}
        empty={this.state.items.length === 0}
        error={this.state.error}
        errorText={''}
      />
    )
  }

}

export default Init;