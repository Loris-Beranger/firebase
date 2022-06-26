import { async } from '@firebase/util';
import { useContext } from 'react';
import './App.css';
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
      <p>test</p>
    </div>
  );
}

export default App;
