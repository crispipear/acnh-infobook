import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

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
const storageRef = fire.storage().ref();

async function getData(){
    const collection = await firestore.collection('fish').get()
    collection.docs.map(doc => {
      console.log(doc.data())
    })
}

function create(){
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