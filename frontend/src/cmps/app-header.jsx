
// import { userService } from '../services/user.service.js'
// import { SET_USER } from '../store/user.reducer.js'
// import { TOGGLE_CART_SHOWN } from '../store/car.reducer.js'
// import { logout } from '../store/user.action.js'

// import { LoginSignup } from './login-signup.jsx'
// import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())

    return (
        <header className="app-header main-layout full">
            <nav className='app-header-nav'>

                <NavLink to="/"><img className="logo" src={require(`../assets/img/bee.png`)} alt="" /></NavLink>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashbord</NavLink>



            </nav>




        </header>
    )
}

