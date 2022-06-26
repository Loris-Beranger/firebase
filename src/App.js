import { async } from '@firebase/util';
import { useContext } from 'react';
import './App.css';
import SignUp from './SignUp/SignUp';
import { UserContext } from './userContext';

function App() {
  const { signUp } = useContext(UserContext);

  const handleForm = async (e) => {
    
    try {
      const cred = await signUp("loris@gmail.com", "lolo01")
      console.log(cred);
    } catch (err) {
      
    }
  }
  
  handleForm();

  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
