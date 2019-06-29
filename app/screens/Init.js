import React, { PureComponent } from 'react';
import { getAll } from '../server/Service';
import { Container } from 'native-base';
import { ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Init extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true
    }
  }

  componentDidMount = () => {
    return getAll()
      .then((responseJson) => {
        this.setState({
          isFetching: false,
        }, () => Actions.listView({ items: responseJson.fruits }));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render = () => {
    return (
      <Container>
        {
          (this.state.isFetching) ?
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
            null
        }
      </Container>
    )
  }

}

export default Init;