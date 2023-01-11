import { httpService } from './http.service'

// import { userService } from './user.service.js'
import { utilService } from './util.service.js'
// import { localStorageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'

const TOY_KEY = 'toyDB'
_createToys()
export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort
}

function getEmptyToy(name = '', price = '', labels = [], createdAt = Date.now(), inStock = true) {
  return { name, price, labels, createdAt, inStock }
}

function getDefaultFilter() {
  return { name: '', price: '', inStock: '' }
}

function query(filterBy, sortBy) {
  // return axios.get(BASE_URL).then(res => res.data)
  return storageService.query(TOY_KEY)
    .then(toys => {

      // if (sortBy.category === 'createdAt') {


      //   toys.sort((t1, t2) => (t1.createdAt - t2.createdAt))
      // }

      // if (sortBy.category === 'name') {
      //   console.log(filterBy, sortBy)
      //   toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
      // }
      // if (sortBy.category === 'price') {
      //   toys.sort((t1, t2) => (t1.price - t2.price))
      // }
      if (filterBy.name) {

        const regex = new RegExp(filterBy.name, 'i')
        toys = toys.filter(toy => regex.test(toy.name))
      }
      if (filterBy.price) {
        toys = toys.filter(toy => toy.price <= filterBy.price)
      }
      if (filterBy.inStock) {
        toys = toys.filter(toy => toy.inStock)
      }


      return toys
    })
}
function getById(toyId) {
  return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOY_KEY, toy)
  } else {
    return storageService.post(TOY_KEY, toy)
  }
}

function _createToys() {
  let toys = storageService.loadFromStorage(TOY_KEY) || []
  if (!toys || !toys.length) {
    toys = []
    toys.push(_createToy('doll', 30, ["On wheels", "Box game", "Art"], Date.now(), true))
    toys.push(_createToy('lego', 40, ["On wheels", "Box game", "Art"], Date.now(), false))
    toys.push(_createToy('teddy', 50, ["On wheels", "Box game", "Baby"], Date.now(), true))

    storageService.saveToStorage(TOY_KEY, toys)
  }
}

function _createToy(name, price, labels, createdAt, inStock) {
  const toy = getEmptyToy(name, price, labels, createdAt, inStock)
  toy._id = utilService.makeId()
  return toy
}

// function getDefaultSort() {
//   return { name: 1, createdAt: 1, price: 1 }
// }
// function getDefaultSort() {
//   return { name: null, createdAt: null, price: null }
// }
// function getDefaultSort() {
//   return { name: null, createdAt: null, price: null }
// }
function getDefaultSort() {
  return { category: 'price', desc: true }
}