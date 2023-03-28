import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };


    const logoutHandler = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error(error);
      }
    };

    console.log(auth?.currentUser?.email)

  return (
    <div>
      <br />
      <br />
      <br />
      <input
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <br />

      <input
        type="password"
        value={password}
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={signIn}>Sign In</button>
      <br />
      <br />
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <br />
      <br />
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default Auth;
