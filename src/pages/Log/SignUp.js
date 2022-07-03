import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function SignUp() {
    const notify = () => toast.success('Tu es maintenant inscrit !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      const navigate = useNavigate();
    
      const [validation, setValidation] = useState("");
      const [userInfos, setUserInfos] = useState(false);
    
      const { signUp } = useContext(UserContext);
      const formRef = useRef();
      const inputs = useRef([])
      const addInputs = el => {
        if(el && !inputs.current.includes(el)){
          inputs.current.push(el)
        }
      }  
      const handleForm = async (e) => {
        e.preventDefault();
        
        if((inputs.current[2].value.length || inputs.current[3].value.length) < 6){
          setValidation("6 caractères minimum");
          return;
        }
        else if(inputs.current[2].value !== inputs.current[3].value) {
          setValidation("Mots de passes différents");
          return;
        }
      
        try {
          const result = await signUp(inputs.current[1].value, inputs.current[2].value);
          setValidation("");
          console.log(result.user);
          /* formRef.current.reset(); */
          /* notify(); */
          await setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            email: result.user.email,
            name: inputs.current[0].value,
            avatarPath: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png",
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true
          });
          navigate("/private/private-home");
        } catch (err) {
          console.log(err)
          if(err.code === "auth/invalid-email") {
            setValidation("Format d'email incorrect")
          }
          
          if(err.code === "auth/email-already-in-use") {
            setValidation("Email déja utilisée");
          }
        }
   
       
      }
  return (
    <form onSubmit={handleForm} ref={formRef}>
      <h2>Inscription</h2>
      <input type="text" placeholder="Nom" ref={addInputs} />
      <input type="email" placeholder="Email" ref={addInputs} />
      <input type="password" placeholder="Mot de passe" ref={addInputs} />
      <input type="password" placeholder="Mot de passe" ref={addInputs} />
      <p className="validation">{validation}</p>
      <input type="submit" value="S'inscrire" />
    </form>
  );
}
