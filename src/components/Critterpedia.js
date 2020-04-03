import React, { useEffect, useState} from 'react';

import getAvailability from '../utils/availability';
import Helpers from '../utils/helpers';

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
        }else if(avai == 4){//filter new this month
          if(filtered[key].allYear){
            delete filtered[key];
          }else{
            let curMonth = new Date().getMonth() + 1;
            let months = north ? filtered[key].monthsN : filtered[key].monthsS;
            if(!months.includes(curMonth) || months.includes(curMonth-1)) delete filtered[key];
          }
        }else if(avai == 11 || avai == 12 || avai == 13 || avai == 14){ //by seasons
          if(!filtered[key].allYear){
            let months = north ? filtered[key].monthsN : filtered[key].monthsS;
            if(!months.some(r=> Helpers.seasons[avai].includes(r))) delete filtered[key];
          }
        }
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
