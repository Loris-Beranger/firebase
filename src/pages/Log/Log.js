import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Log.scss';
import {useNavigate} from 'react-router-dom'
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Log() {
  const [signModal, setSignModal] = useState("signup");
 
  return (
    <div className="form-page">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="wrapper-log">
        <div className="switch-buttons">
          <button className={signModal === "signin" ? "btn-switch actif" : "btn-switch"} onClick={() => {
            setSignModal("signin");
          }}>Connexion</button>
          <button className={signModal === "signup" ? "btn-switch actif" : "btn-switch"} onClick={() => {
            setSignModal("signup");
          }}>Inscription</button>
        </div>
        {signModal === "signup" ? (
          <SignUp />
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
}
