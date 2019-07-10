import React, { PureComponent } from 'react';
import { getAll } from '../server/Service';
import { Actions, ActionConst } from 'react-native-router-flux';
import CustomIndicator from '../appComponents/CustomIndicator';

class Init extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      items: [],
      error: ''
    }
  }

  componentDidMount = () => {
    return getAll()
      .then((responseJson) => {
        this.setState({
          isFetching: false,
          items: responseJson.fruits
        }, () => Actions.Authenticated({ type: ActionConst.RESET, items: responseJson.fruits }));
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