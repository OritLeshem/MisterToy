import { userService } from '../services/user.service.js'

// import { userService } from '../services/user.service.js'
// import { SET_USER } from '../store/user.reducer.js'
// import { TOGGLE_CART_SHOWN } from '../store/car.reducer.js'
// import { logout } from '../store/user.action.js'

// import { LoginSignup } from './login-signup.jsx'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { LoginSignup } from './login-signup.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { logout } from '../store/actions/user.action.js'

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))

    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }



    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())

    return (
        <header className="app-header main-layout full">
            <nav className='app-header-nav'>
                <div className='app-header-nav-links'>
                    <NavLink to="/"><img className="logo" src={require(`../assets/img/bee.png`)} alt="" /></NavLink>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/dashboard">Dashbord</NavLink>
                </div>
                <div className='app-header-nav-login'>
                    {user && <section className="user-info">
                        <p>{user.fullname} <span></span></p>
                        <button className='btn-icon' onClick={onLogout}><img src={require(`../assets/img/logout.png`)} alt="" /></button>
                    </section>}

                    {!user && <section className="user-info">
                        <LoginSignup setUser={setUser} />
                    </section>}
                </div>

            </nav>




        </header>
    )
}

