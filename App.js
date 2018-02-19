import React from 'react';
import {Provider} from "react-redux";
import Store from './store';
import Weather from './containers/weather/index';
class App extends React.Component {

  render() {
    return (
        <Provider store={Store}>
            <Weather/>
        </Provider>
    );
  }
}

export default App;
