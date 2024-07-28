import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';
const addFormData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'patientData'), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
export default  addFormData ;