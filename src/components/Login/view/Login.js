import React, { useRef, useState } from "react";
import Header from "../../Header/view/Header";
import { Form, useNavigate } from "react-router-dom";
import { checkValidateData } from "../../../utils/validate";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
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
            photoURL: 'https://media.licdn.com/dms/image/v2/D4D03AQELINwCSWgJNw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1691239087155?e=1730937600&v=beta&t=MzDIT15M74h0l76C_dK50AYCplVa5VT1uVkqtcWRNe4'
          }).then(() => {
            const {uid, email, photoURL, displayName} = auth.currentUser;
            dispatch(addUser({
              uid, email, photoURL, displayName
            }));
            navigate("/browse");
          }).catch((error) => {
            setErrorMsg(error.code + "-" + error.errorMsg);
          })
          // ...
        })
        .catch((error) => {
          setErrorMsg(error.code + "-" + error.message);
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('Singed In user ', user );
          navigate('/browse');
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
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
