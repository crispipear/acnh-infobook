import React, { useEffect, useState, useCallback } from 'react';
import './styles/global.scss';

import {getData, getVersions} from './utils/fb';
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
  }, [])

  function reset(){
    window.localStorage.removeItem('nookiesbook-data-versions');
    window.localStorage.removeItem('nookiesbook-data');
    getVersions().then(remoteVersions => {
      fetchData();
      setLocalVersions(remoteVersions);
    })
  }

  function setLocalVersions(ver){
    window.localStorage.setItem('nookiesbook-data-versions', JSON.stringify(ver));
  }

  function init(){
    getVersions().then(remoteVersions => {
      if(window.localStorage){
        const localVersions = window.localStorage.getItem('nookiesbook-data-versions');
        if(!localVersions){
          reset();
        }else{
          try{
            const localData = window.localStorage.getItem('nookiesbook-data');
            const parsedData = JSON.parse(localData);
            const parsedVersions = JSON.parse(localVersions);
            const comparison = compareVersions(remoteVersions, parsedVersions);
            if(comparison.status && parsedData.fish && parsedData.bugs && Object.keys(parsedData).length !== 0){
              setFbData(parsedData);
              setTimeout(() => {
                setLoaded(true);
              }, 100)
            }else{
              fetchData(comparison.outdated, parsedData);
              setLocalVersions(remoteVersions);
            }
          }catch(error){
            console.log('local storage exists but has error processing: '+ error);
            window.localStorage.removeItem('nookiesbook-data');
            fetchData();
          }
        }
      }else{
        //if localStorage not supported.
        fetchData();
      }
    })
  }

  function fetchData(outdated, parsedData = {}){
    getData(outdated).then(data => {
      Object.keys(data).map(item => {
        parsedData[item] = data[item];
      })
      setFbData(parsedData);
      window.localStorage &&
      window.localStorage.setItem('nookiesbook-data', JSON.stringify(data));
      setLoaded(true);
    })
  }

  function compareVersions(remote, local){
    let status = true;
    let outdated = []
    Object.keys(remote).map(item => {
      if(remote[item].version !== local[item].version){
        status = false;
        outdated.push(item);
      }
    });
    return {
      status,
      outdated
    }
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
