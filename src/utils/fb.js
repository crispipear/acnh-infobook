import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';

//static db backup
import fish from '../db/fishData';
import bugs from '../db/bugsData';

const apiKey = process.env.REACT_APP_FB_KEY;
const appId = process.env.REACT_APP_APP_ID


const config = {
    apiKey,
    authDomain: "nookiesbook.firebaseapp.com",
    databaseURL: "https://nookiesbook.firebaseio.com",
    projectId: "nookiesbook",
    storageBucket: "nookiesbook.appspot.com",
    messagingSenderId: "900326977183",
    appId,
    measurementId: "G-4T8TTM05QT"
  };


const fire = firebase.initializeApp(config);

const firestore = fire.firestore();

async function getVersions(){
    let verData = {};
    const verColData = await firestore.collection('versions').get();
    verColData.docs.map(doc => {
        verData[doc.id] = doc.data();
    })
    return verData;
}

async function getData(outdated=[]){
    console.log('fetching data from firebase...');
    if(outdated.length === 0){
        outdated = ['fish', 'bugs'];
    }
    let data = {}
    for(let i=0; i<outdated.length; i++){
        let item = outdated[i];
        let tempColData = await firestore.collection(item).get();
        let tempData = {};
        tempColData.docs.map(doc => {
            tempData[doc.id] = doc.data();
            tempData[doc.id].img = `https://firebasestorage.googleapis.com/v0/b/nookiesbook.appspot.com/o/${item}%2F${doc.id}.png?alt=media`
        })
        data[item] = tempData;
    }
    return data;
}
function create(){
    // bulk create data from local json..

    // const batch = firestore.batch();
    // Object.keys(fish).map(id => {
    //     var docRef = firestore.collection("fish").doc(id);
    //     batch.set(docRef, fish[id]);
    // })
    // batch.commit().then(function () {
    //    console.log('done')
    // });
}

export {
    create,
    getVersions,
    getData
}