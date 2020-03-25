import React, { useEffect } from 'react';
import './global.scss';

import {getData, create} from './utils/fb';

import Menu    from './components/Menu';
import Main    from './components/Main';       

function App() {
  useEffect(() => {
    // getData();
    // create();
  }, [])
  return (
    <div className="App">
      <div id="bg-pattern"/>
      <Menu/>
      <Main/>
    </div>
  );
}

export default App;
