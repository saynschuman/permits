import { initializeApp } from 'firebase/app';
import { getFirestore, collection, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_3Qe1P83eUrwcl8d52CEE1Bhk_FSQzb0',
  authDomain: 'shirley-60476.firebaseapp.com',
  databaseURL: 'https://shirley-60476-default-rtdb.firebaseio.com',
  projectId: 'shirley-60476',
  storageBucket: 'shirley-60476.appspot.com',
  messagingSenderId: '891189830436',
  appId: '1:891189830436:web:d2be64738e78dab97009b1',
  measurementId: 'G-KL6C1YH72V',
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
