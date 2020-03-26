import React, { useEffect, useState } from 'react';
import './styles/global.scss';

import {getData, create} from './utils/fb';
import getAvailability from './utils/availability';
import Helpers from './utils/helpers';

import Header  from './components/Header';
import Main    from './components/Main';  
import Menu    from './components/Menu';
import Credits from './components/Credits';

function App() {
  const [showCredits, setShowCredits] = useState(false);
  const [fbData, setFbData] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [dataset, setDataset] = useState({}); //unfiltered dataset from firebase
  const [type, setType] = useState('fish'); 
  const [north, setNorth] = useState(true); //hemsphere location
  const [loc, setLoc] = useState('all'); //location
  const [avai, setAvai] = useState(1) //availability
  

  useEffect(() => {
    init();
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

  useEffect(() => {
    let filtered = Object.assign({}, dataset);
    if(loc !== 'all'){
      if(Array.isArray(loc)){
        Object.keys(filtered).forEach(key => {// filter location
          if (!loc.includes(filtered[key].location)) delete filtered[key];
        })
      }else{
        Object.keys(filtered).forEach(key => {// filter location
          if (filtered[key].location !== loc) delete filtered[key];
        })
      }
    }
    if(avai !== 1){
      Object.keys(filtered).forEach(key => {// filter availability
        if(avai == 2){ //filter available now
          if(!getAvailability(filtered[key], north, type)) delete filtered[key]
        }else if(avai == 3){ //filter month ending soon
          if(filtered[key].allYear){
            delete filtered[key];
          }else{
            let curMonth = new Date().getMonth() + 1;
            let months = north ? filtered[key].monthsN : filtered[key].monthsS;
            if(!months.includes(curMonth) || months.includes(curMonth+1)) delete filtered[key];
          }
        }else if(avai == 4 || avai == 5 || avai == 6 || avai == 7){ //by seasons
          if(!filtered[key].allYear){
            let months = north ? filtered[key].monthsN : filtered[key].monthsS;
            if(!months.some(r=> Helpers.seasons[avai].includes(r))) delete filtered[key];
          }
        }
      })
    }
    setData(filtered);
  }, [loc, avai, north])

  useEffect(() => {
    setDataOnType();
    // window.localStorage.setItem('acnh-data', JSON.stringify(fbData));
    let dataset = type == 'fish' ? fbData.fish : fbData.bugs;
    if(dataset){
      setDataset(dataset);
      setData(dataset);
    }
  }, [fbData])

  useEffect(() => {
    setDataOnType();
  }, [type])

  function setDataOnType(){
    let dataset = type == 'fish' ? fbData.fish : fbData.bugs;
    if(dataset){
      setDataset(dataset);
      setData(dataset);
    }
  }

  function search(e){
    if(e.keyCode == 13){
      let filtered = Object.assign({}, dataset);
      let userInput = document.getElementById('search-input').value;
      Object.keys(filtered).forEach(key => {
        let name = filtered[key].name.toLowerCase();
        if(!name.includes(userInput.toLowerCase())) delete filtered[key];
      })
      setData(filtered)
    }
  }

  return (
    <div className="app">
      <div id="bg-pattern"/>
      {showCredits && <Credits setShowCredits={setShowCredits} showCredits={showCredits}/>}
      <Menu type={type} setType={setType} setNorth={setNorth} setLoc={setLoc} setAvai={setAvai} search={search}/>
      <Header setShowCredits={setShowCredits}/>
      <Main data={data} north={north} type={type} loaded={loaded}/>
    </div>
  );
}

export default App;
