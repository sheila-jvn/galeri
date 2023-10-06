import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgdFItCxEgKRIEWi9bLsYGIH0OQsQ5Ong",
  authDomain: "galeri-482cc.firebaseapp.com",
  projectId: "galeri-482cc",
  storageBucket: "galeri-482cc.appspot.com",
  messagingSenderId: "581696596182",
  appId: "1:581696596182:web:ba017fe2a7f1953b4bc177"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage(app);
const firestore=getFirestore(app)

export async function UploadImage(title : string, tags: string[], file: File) { 

  const imageref = ref(storage, 'images/'+file.name);
  const result = await uploadBytes(imageref, file);
  const url = await getDownloadURL(result.ref);
  addDoc(collection(firestore, "images"), {
    title: title,
    tags: tags,
    url: url,
    path: result.ref.fullPath
  });
}
export async function GetImages() {
  const snapshot = await getDocs(collection(firestore, "images"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
}

export async function GetImage(id: string) {
  const docRef = doc(firestore, "images", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function DeleteImage(id: string) {
  const docRef = doc(firestore, "images", id);
  await deleteDoc(docRef);
}

export async function EditImage(id: string, title: string, tags: string[]) {
  const docRef = doc(firestore, "images", id);
  await updateDoc(docRef, {
    title: title,
    tags: tags
  });
}