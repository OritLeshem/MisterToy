
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'carDB'
const BASE_URL = 'car/'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    getRandomCar,
    getDefaultFilter
}


function query(filterBy = getDefaultFilter()) {
    const queryParams = `?vendor=${filterBy.txt}&maxPrice=${filterBy.maxPrice}`
    return httpService.get(BASE_URL + queryParams)
}

// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STORAGE_KEY)
//         .then(cars => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 cars = cars.filter(car => regex.test(car.vendor))
//             }
//             if (filterBy.maxPrice) {
//                 cars = cars.filter(car => car.price <= filterBy.maxPrice)
//             }
//             return cars
//         })
// }



function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}

function remove(carId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + carId)
}

function save(car) {
    if (car._id) {
        return httpService.put(BASE_URL, car)
    } else {
        // when switching to backend - remove the next line
        car.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, car)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 0 }
}
function getEmptyCar() {
    return {
        vendor: '',
        price: 0,
    }
}

function getRandomCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


