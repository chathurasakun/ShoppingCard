import React, { PureComponent } from 'react';
import { getSessionToken } from '../redux/Actions/AuthActions';
import { connect } from 'react-redux';
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
    this.props.getSessionToken();
  }

  render = () => {
    return (
      <CustomIndicator
        isFetching={this.state.isFetching}
        empty={false}
        error={this.state.error}
        errorText={''}
      />
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getSessionToken: () => {
      dispatch(getSessionToken())
    }
  }
}

export default connect(null, mapDispatchToProps)(Init);