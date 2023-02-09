import { initializeApp } from "firebase/app";
import {
    ref,
    getStorage,
    uploadBytes,
    getDownloadURL,
    uploadString
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0r7IdJs6JIjlAvMzSFWqmP3c10jCqSSM",
  authDomain: "mimir-b37d1.firebaseapp.com",
  projectId: "mimir-b37d1",
  storageBucket: "mimir-b37d1.appspot.com",
  messagingSenderId: "931883759201",
  appId: "1:931883759201:web:13c60b026b7984ec2edc20"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function addImageToStorage(file) {
    try {
      console.log("start bucket upload")
      if (!file) return;
      const storage = getStorage();
      console.log("test1")
      const storageRef = ref(storage, (`${file.name}` + String(Math.random() * 10000000)));
      console.log("test2")
      const id = await uploadBytes(storageRef, `../../${file.path}`);
      console.log("test3")
      console.log("Bucket upload finished")
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error(error.message);
    }
}
  
async function getImageFromStorage (imageId) {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, imageId);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error(error.message);
    }
}

export { 
    getImageFromStorage,
    addImageToStorage,
  };