import React, { useEffect, useState } from 'react';
import './global.scss';

import {getData, create} from './utils/fb';
import FishData from './db/fish';
import getAvailability from './utils/availability';

import Header  from './components/Header';
import Main    from './components/Main';  
import Menu    from './components/Menu';     

function App() {
  const [data, setData] = useState({});
  const [dataset, setDataset] = useState({}); //unfiltered dataset from firebase
  const [type, setType] = useState('fish'); 
  const [north, setNorth] = useState(true); //hemsphere location
  const [loc, setLoc] = useState('all'); //location
  const [avai, setAvai] = useState(1) //availability

  useEffect(() => {
    loadData();
    // getData();
    // create();
  }, [])

  function loadData(){
    setData(FishData);
  }

  useEffect(() => {
    if(loc == 'all'){
      setData(dataset);
    }else{
      let filtered = filterData('location', loc);
      setData(filtered);
    }
  }, [loc])

  useEffect(() => {
    if(avai == 1){
      //all
      setData(dataset);
    }else if(avai == 2){
      //over after this month
      let curMonth = new Date().getMonth() + 1;
      let filtered = filterData('month', curMonth);
      setData(filtered);
    }else if (avai == 3){
      //at this time
    }
  }, [avai])

  useEffect(() => {
    // let dataset = type == 'fish' ? FishData : BugsData
    let dataset = FishData;
    setDataset(dataset);
    setData(dataset);
  }, [type])

  function filterData(targetKey, targetVal){
    let filtered = Object.assign({}, dataset);
    Object.keys(filtered).forEach(key => {
      if(targetKey == 'location'){
        if (filtered[key][targetKey] !== targetVal) delete filtered[key];
      }else if(targetKey == 'month'){
        if(filtered[key].allYear){
          delete filtered[key];
        }else{
          let months = north ? filtered[key].monthsN : filtered[key].monthsS;
          if(!months.includes(targetVal) || months.includes(targetVal+1)) delete filtered[key];
        }
      }else if(targetKey == 'now'){

      }
    });
    return filtered;
  }

  return (
    <div className="App">
      <div id="bg-pattern"/>
      <Menu type={type} setType={setType} setNorth={setNorth} setLoc={setLoc} setAvai={setAvai}/>
      <Header/>
      <Main data={data} north={north} type={type}/>
    </div>
  );
}

export default App;
