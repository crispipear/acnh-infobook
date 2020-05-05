import React, { useEffect, useState} from 'react';

import {availabilityStatus} from '../utils/availability';

import Main    from './CritterpediaMain';  
import Menu    from './CritterpediaMenu';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function Critterpedia(props) {
  const [data, setData] = useState({}); //current displaying filtered data
  const [dataset, setDataset] = useState({}); //current data by selected data type
  const [type, setType] = useState('fish'); 
  const [north, setNorth] = useState(true); //hemsphere location
  const [loc, setLoc] = useState('all'); //location
  const [avai, setAvai] = useState(1) //availability

  useEffect(() => {
    setDataOnType();
  }, [type])

  useEffect(() => {
    filterData();
  }, [loc, avai, north])

  useEffect(() => {
    setDataOnType();
  }, [props.fbData])


  function filterData(){
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
    if(avai !== 0){
      Object.keys(filtered).forEach(key => {// filter availability
        let status = availabilityStatus(filtered[key], north, type);
        if(!status.includes(avai)) delete filtered[key];
      })
    }
    setData(filtered);
  }

  function setDataOnType(){
    let dataset = type == 'fish' ? props.fbData.fish : props.fbData.bugs;
    if(dataset){
      setDataset(dataset);
      setData(dataset);
    }
  }

  function search(e){
      let userInput = document.getElementById('search-input').value.toLowerCase();
      let filtered = Object.assign({}, dataset);
      if(userInput.length > 0){
        Object.keys(filtered).forEach(key => {
          let name = filtered[key].name.toLowerCase();
          if(!name.includes(userInput)) delete filtered[key];
        })
      }
      setData(filtered)
  }

  return (
    <div id="critterpedia">
      <Menu type={type} setType={setType} setNorth={setNorth} setLoc={setLoc} setAvai={setAvai} search={search}/>
      <Main data={data} north={north} type={type} loaded={props.loaded}/>
    </div>
  );
}

export default Critterpedia;
