import React, { useEffect, useState, useCallback } from 'react';
import './styles/global.scss';

import {getData, create} from './utils/fb';
import Credits from './components/Credits';
import Header from './components/Header';
import Critterpedia from './components/Critterpedia';
import Villagers from './components/Villagers';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function App() {
  const [showCredits, setShowCredits] = useState(false);
  const [fbData, setFbData] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [panel, setPanel] = useState(1); //0 = selection, 1 = Critterpedia, 2 = Villagers

  useEffect(() => {
    init();
    window.addEventListener('resize', forceUpdate);
    return () => {
      window.removeEventListener('resize', forceUpdate);
    }
    // create();
  }, [])

  function fetchData(){
    getData(setFbData).then(() => {
      setLoaded(true);
    })
  }

  function init(){
      fetchData();
    // const localData = window.localStorage.getItem('acnh-data');
    // if (!localData || localData == null || Object.keys(JSON.parse(localData)).length === 0){
    //   fetchData();
    // }else{
    //   setFbData(JSON.parse(localData))
    //   setTimeout(() => {
    //     setLoaded(true);
    //   }, 250)
    // }
  }

  return (
    <div className="app">
      <div id="bg-pattern"/>
      {showCredits && <Credits setShowCredits={setShowCredits} showCredits={showCredits}/>}
      <Header setShowCredits={setShowCredits} setPanel={setPanel}/>
      {
        panel == 1 ?
        <Critterpedia fbData={fbData} loaded={loaded}/>
        : panel == 2 ?
        <Villagers/>
        :
        <section id="app-selection">
          <div className="selection" onClick={() => setPanel(1)}>
            <div className="selection-img"/>
            <div className="selection-text">
              <h4>Critterpedia</h4>
            </div>
          </div>
          <div className="selection" onClick={() => setPanel(2)}>
            <div className="selection-img"/>
            <div className="selection-text">
              <h4>Villagers</h4>
            </div>
          </div>
        </section>
      }
    </div>
  );
}

export default App;
