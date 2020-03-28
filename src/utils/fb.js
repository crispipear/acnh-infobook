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

async function getData(dataSetter){
    let data = {}
    let fishData = {}
    let bugsData = {}
    const fcolData = await firestore.collection('fish').get()
    fcolData.docs.map(doc => {
        fishData[doc.id] = doc.data();
        fishData[doc.id].img = `https://firebasestorage.googleapis.com/v0/b/nookiesbook.appspot.com/o/fish%2F${doc.id}.png?alt=media`
    })
    const bcolData = await firestore.collection('bugs').get()
    bcolData.docs.map(doc => {
        bugsData[doc.id] = doc.data();
        bugsData[doc.id].img = `https://firebasestorage.googleapis.com/v0/b/nookiesbook.appspot.com/o/bugs%2F${doc.id}.png?alt=media`
    })
    data = {
        fish: fishData,
        bugs: bugsData
    }
    dataSetter(data)
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
    getData
}