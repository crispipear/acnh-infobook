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
    // getData();
    // create();
  }, [])

  useEffect(() => {
    let filtered = Object.assign({}, dataset);
    if(loc !== 'all'){
      Object.keys(filtered).forEach(key => {// filter location
        if (filtered[key].location !== loc) delete filtered[key];
      })
    }
    if(avai !== 1){
      Object.keys(filtered).forEach(key => {// filter availability
        if(avai == 2){ // filter month ending soon
          if(filtered[key].allYear){
            delete filtered[key];
          }else{
            let curMonth = new Date().getMonth() + 1;
            let months = north ? filtered[key].monthsN : filtered[key].monthsS;
            if(!months.includes(curMonth) || months.includes(curMonth+1)) delete filtered[key];
          }
        }else if(avai == 3){ //filter available now
          if(!getAvailability(filtered[key], north)) delete filtered[key]
        }
      })
    }
    setData(filtered);
  }, [loc, avai, north])

  useEffect(() => {
    // let dataset = type == 'fish' ? FishData : BugsData
    let dataset = FishData;
    setDataset(dataset);
    setData(dataset);
  }, [type])

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
    <div className="App">
      <div id="bg-pattern"/>
      <Menu type={type} setType={setType} setNorth={setNorth} setLoc={setLoc} setAvai={setAvai} search={search}/>
      <Header/>
      <Main data={data} north={north} type={type}/>
    </div>
  );
}

export default App;
