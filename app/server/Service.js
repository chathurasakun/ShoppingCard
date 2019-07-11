import Endpoints from './ApiEndpoints';
import Backend from './Backend';
import _ from 'underscore';
import axios from 'axios';

export class ApiServices extends Backend {
  initialize(token, fetchErrorHandler) {
    this.API_BASE_URL = `http://ec2-3-18-5-207.us-east-2.compute.amazonaws.com:8765/`;

    if (!_.isNull(token)) {
      if (_.isUndefined(token.sessionToken))
        throw new Error('TokenMissing')
      //
      this._sessionToken = token.sessionToken.sessionToken;
      this.tokenObject = token.sessionToken;
    }

    _this = this;
    this._fetchErrorHandler = fetchErrorHandler;
  }

  getAll = async (cb) => {
    try {
      const response = await fetch(Endpoints.GET_ALL_FRUITS);
      const responseJson = await response.json();
      cb(responseJson);
    }
    catch (error) {
      cb({}, error);
    }
  }

  login = (data, cb) => {
    axios({
      method: 'POST',
      url: `http://68.183.92.2:17100/${Endpoints.LOGIN}`,
      data: data,
    })
      .then((res) => {
        cb(res);
      })
      .catch((error) => {
        cb({}, error);
      })
  }

  checkFirstLogin = (data, cb) => {
    axios({
      method: 'POST',
      url: `${this.API_BASE_URL}${Endpoints.CHECK_FIRST_LOGIN}`,
      data: data
    })
      .then((res) => {
        cb(res);
      })
      .catch((error) => {
        cb({}, error);
      })
  }
}

export let apiServices = new ApiServices();


