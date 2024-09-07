import React, { useRef, useState } from "react";
import Header from "../../Header/view/Header";
import { Form } from "react-router-dom";
import { checkValidateData } from "../../../utils/validate";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../../utils/userSlice";
import { BG_IMG, USER_AVTAR } from "../../../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch =  useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    const message = checkValidateData(
      isSignInForm,
      email.current.value,
      password.current.value,
      name?.current?.value
    );
    setErrorMsg(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log('Singed Up user ', user);
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:USER_AVTAR
          }).then(() => {
            const {uid, email, photoURL, displayName} = auth.currentUser;
            dispatch(addUser({
              uid, email, photoURL, displayName
            }));
          }).catch((error) => {
            setErrorMsg(error.code + "-" + error.errorMsg);
          })
        })
        .catch((error) => {
          setErrorMsg(error.code + "-" + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('Singed In user ', user );
          // ...
        })
        .catch((error) => {
          setErrorMsg(error.code + "-" + error.message);
        });
    }
  } 

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="bg-image"
          src={BG_IMG}
        />
      </div>
      <Form onSubmit={handleButtonClick} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-800 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email address"
          className="p-2 my-4 w-full bg-gray-800 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-800"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMsg}</p>
        <button type="submit" className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="pay-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up Now."
            : "Already Registered? Sign In Now."}
        </p>
      </Form>
    </div>
  );
};

export default Login;
