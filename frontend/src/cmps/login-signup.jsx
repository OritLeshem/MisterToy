
import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { signup, login } from '../store/actions/user.action.js'


function getEmptyCredentials() {
  return {
    fullname: '',
    username: 'admin',
    password: 'admin',
  }
}

export function LoginSignup({ setUser }) {

  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)

  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const func = isSignupState ? signup : login
    return func(credentials)
      .then((user) => {
        showSuccessMsg(`Welcome ${user.fullname}`)
      })
      .catch(err => {
        showErrorMsg('OOps try again')
      })
  }
  function onToggleSignupState() {
    setIsSignupState(!isSignupState)
  }
  // function onToggleSignupState(signOrLogin) {
  //   setIsSignupState(signOrLogin)
  // }

  const { username, password, fullname } = credentials
  return <div className="login-signup">

    <form className="login-signup-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="Username"
        onChange={handleCredentialsChange}
        required
        autoFocus
      />

      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={handleCredentialsChange}
        required
      />

      {isSignupState && <input
        type="text"
        name="fullname"
        value={fullname}
        placeholder="Full name"
        onChange={handleCredentialsChange}
        required
      />}

      <button className="btn-icon">{isSignupState ? <img src={require(`../assets/img/signup.png`)} alt="" /> : <img src={require(`../assets/img/login.png`)} alt="" />}</button>
    </form>

    <div className="login-signup-btns">
      <a href="#" onClick={onToggleSignupState}>
        {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
      </a >
    </div>
    {/* <button onClick={() => onToggleSignupState(login)}>login</button>
    <button onClick={() => onToggleSignupState(signup)}>signup</button> */}
  </div >

}

