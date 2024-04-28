import { initializeApp } from "firebase/app";
import React, { createContext, useContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  Firestore,
  query,
  where,
} from "firebase/firestore";
const firebaseContext = createContext();
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIAF37yuOahlPX5EwNhEhHYaMkWW47HuA",
  authDomain: "apnabookstore-f17cc.firebaseapp.com",
  projectId: "apnabookstore-f17cc",
  storageBucket: "apnabookstore-f17cc.appspot.com",
  messagingSenderId: "939346571170",
  appId: "1:939346571170:web:c997dfb3f87b14c53c0cfb",
};
export const useFirebase = () => useContext(firebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    // starting me user object aayega ya to undefined aayega
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  //*signup
  const signup = (email, password) => {
    try {
      return createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw error;
    }
  };
  //*login
  const login = (email, password) => {
    try {
      return signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw error;
    }
  };
  //* sign in with googel
  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  //* Add listing functionlity

  const handleCreateNewListing = async (
    name,
    isbn,
    price,
    desc,
    cover,
    username
  ) => {
    try {
      // Create a reference to the storage location
      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${cover.name}`
      );
      console.log(imageRef);
      // Upload the image bytes to the storage location
      const uploadedResult = await uploadBytes(imageRef, cover);

      // Store image metadata and other details in Firestore
      await addDoc(collection(fireStore, "books"), {
        name,
        isbn,
        price,
        desc,
        imageUrl: uploadedResult.ref.fullPath, // Storing the image path in Firestore
        userId: user.uid,
        userEmail: user.email,
      });

      console.log("Listing added successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Rethrow the error for further handling
    }
  };

  //* ab firestore me se image ko retrive karo
  const listAllBooks = () => {
    return getDocs(collection(fireStore, "books"));
  };

  const listAllPDFs = () => {
    return getDocs(collection(fireStore, "pdfs"));
  };
  //*getimageUrl
  const getImageUrl = async (path) => {
    try {
      // const url = await getDownloadURL(ref(storage, path));
      const url = await getDownloadURL(ref(storage, path))
      return url;
    } catch (error) {
      console.error("Error getting download URL:", error);
      return null;
    }
  };

  //*getBookById
  const getBookById = async (id) => {
    const docRef = doc(fireStore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  //*placeOrder
  const placeOrder = async (bookId, quantity) => {
    const collectionRef = collection(fireStore, "books", bookId, "orders");
    // ye order kb or kisne place kiya user ki details

    const result = await addDoc(collectionRef, {
      username: user.displayName,
      userId: user.uid,
      userEmail: user.email,
      quantity: Number(quantity),
    });
    return result;
  };

  //*FetchMyBooks
  const fetchMyBooks = async (userid) => {
    const collectionRef = collection(fireStore, "books");
    const q = query(collectionRef, where("userId", "==", userid));

    const result = await getDocs(q);
    return result;
  };

  //* get orders
  const getOrders = async (books) => {
    const collectionRef = collection(fireStore, "books", books, "orders");
    const result = await getDocs(collectionRef);
    return result;
    // console.log(result)
  };
  //* handlepdfUpload
  const handlePDFUpload = async (subject, year, file) => {
    try {
      // const pdfCollectionRef = collection(fireStore, "pdfs");
      const storageRef = ref(
        storage,
        `uploads/pdfs/${Date.now()}-${file.name}`
      );
      const uploadedResult = await uploadBytes(storageRef, file);

      return await addDoc(collection(fireStore, "pdf"), {
        subject,
        year,
        file,
        filename: file.name,
        path: uploadedResult.ref.fullPath,
      });
    } catch (err) {
      console.log("Error uploading pdf", err);
      throw err;
    }
  };

  const getPdfUrl = async (file) => {
    try {
      const url = await getDownloadURL(ref(storage, file));
      return url;
    } catch (error) {
      console.error("Error getting PDF URL:", error);
      return null;
    }
  };

  const isLoggedIn = user ? true : false;

  return (
    <div>
      <firebaseContext.Provider
        value={{
          signup,
          login,
          signInWithGoogle,
          isLoggedIn,
          handleCreateNewListing,
          listAllBooks,
          listAllPDFs,
          getImageUrl,
          getBookById,
          placeOrder,
          fetchMyBooks,
          user,
          getOrders,
          handlePDFUpload,
          getPdfUrl,
        }}
      >
        {props.children}
      </firebaseContext.Provider>
    </div>
  );
};
