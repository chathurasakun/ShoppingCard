import React, { PureComponent } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Init from './app/screens/Init';
import ListView from './app/screens/ListView';
import ItemDetails from './app/screens/ItemDetails';
import CardListView from './app/screens/CardListView';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './app/redux/Store';

class App extends PureComponent {
  render = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router navigationBarStyle={{ backgroundColor: '#7573E1' }}>
            <Scene key='root' hideNavBar>
              <Scene key='init' component={Init} type='replace' initial />
              <Scene key='listView' component={ListView} type='replace' />
              <Scene key='itemDetails' component={ItemDetails} type='replace' />
              <Scene key='cardListView' component={CardListView} type='replace' />
            </Scene>
          </Router>
        </PersistGate>
      </Provider>
    )
  }

}

export default App;
