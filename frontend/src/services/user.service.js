import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getUsers,
    remove,
    update,

    getEmptyCredentials
}

window.us = userService
function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}
async function getById(userId) {
    // return storageService.get(STORAGE_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    return user

}
function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

function login(credentials) {
    return httpService.post('auth/login', credentials)
        .then(_setLoggedinUser)
        .catch(err => {
            console.log('err:', err)
            throw new Error('Invalid login')
        })
}

// function login(credentials) {
//     return axios.post('//localhost:3030/api/user/login', credentials)
//         .then(user => {
//             console.log('user:', user)
//         })
// }

// function login({ username, password }) {
//     return storageService.query(STORAGE_KEY)
//         .then(users => {
//             const user = users.find(user => user.username === username)
//             if (user) return _setLoggedinUser(user)
//             else return Promise.reject('Invalid login')
//         })
// }

function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    return httpService.post('auth/signup', user)
        .then(_setLoggedinUser)
}


// function signup({ username, password, fullname }) {
//     const user = { username, password, fullname, score: 10000 }
//     return storageService.post(STORAGE_KEY, user)
//         .then(_setLoggedinUser)
// }

function updateScore(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.score
                })
        })
}

function logout() {
    return httpService.post('auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}
async function update({ _id, score }) {
    // const user = await storageService.get('user', _id)
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, { _id, score })
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _setLoggedinUser(user)
    return user
}
// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



