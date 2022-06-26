import React from 'react'
import './SignUp.scss';

export default function SignUp() {
  return (
    <div className='form-page'>
        <form>
            <h2>Inscription</h2>
            <input type="email" placeholder='Email'/>
            <input type="password" placeholder='Mot de passe'/>
            <input type="password" placeholder='Mot de passe'/>
            <input type="submit" value="S'inscrire"/>
        </form>
    </div>
  )
}
