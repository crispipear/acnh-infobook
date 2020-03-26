import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';

//static db backup
import fish from '../db/fishData';
import bugs from '../db/bugsData';

const apiKey = process.env.REACT_APP_FB_KEY;

const config = {
    apiKey,
    authDomain: "acnh-infobook.firebaseapp.com",
    databaseURL: "https://acnh-infobook.firebaseio.com",
    projectId: "acnh-infobook",
    storageBucket: "acnh-infobook.appspot.com",
    messagingSenderId: "245629006198",
    appId: "1:245629006198:web:6d28b85fc25053d0cf8a57"
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
        fishData[doc.id].img = `https://firebasestorage.googleapis.com/v0/b/acnh-infobook.appspot.com/o/fish%2F${doc.id}.png?alt=media`
    })
    const bcolData = await firestore.collection('bugs').get()
    bcolData.docs.map(doc => {
        bugsData[doc.id] = doc.data();
        bugsData[doc.id].img = `https://firebasestorage.googleapis.com/v0/b/acnh-infobook.appspot.com/o/bugs%2F${doc.id}.png?alt=media`
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
    // Object.keys(bugs).map(id => {
    //     var docRef = firestore.collection("bugs").doc(id);
    //     batch.set(docRef, bugs[id]);
    // })
    // batch.commit().then(function () {
    //    console.log('done')
    // });
}

export {
    create,
    getData
}