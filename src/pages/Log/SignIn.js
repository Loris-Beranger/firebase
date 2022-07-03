import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

export default function SignIn() {
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
    
      const { signIn } = useContext(UserContext);
      const formRef = useRef();
      const inputs = useRef([])
      const addInputs = el => {
        if(el && !inputs.current.includes(el)){
          inputs.current.push(el)
        }
      }  
      const handleForm = async (e) => {
        e.preventDefault();
      
        try {
          const cred = await signIn(inputs.current[0].value, inputs.current[1].value);
          setValidation("");
          console.log(cred);
          formRef.current.reset();
          /* notify(); */
          navigate("/private/private-home");
        } catch {
          setValidation("L'email ou le mot de passe est incorrecte");
        }
      }
  return (
    <form onSubmit={handleForm} ref={formRef}>
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" ref={addInputs} />
      <input type="password" placeholder="Mot de passe" ref={addInputs} />
      <p className="validation">{validation}</p>
      <input type="submit" value="Se connecter" />
    </form>
  );
}