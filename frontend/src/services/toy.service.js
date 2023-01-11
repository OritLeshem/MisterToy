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

function getEmptyToy(
  name = '',
  price = '',
  labels = ["On wheels", "Doll", "Art"],
  img = 'https://cdn.pixabay.com/photo/2013/07/13/13/53/rocking-horse-161736_960_720.png',
  createdAt = Date.now(),
  inStock = true) {
  return { name, price, labels, img, createdAt, inStock }
}

function getDefaultFilter() {
  return { name: '', price: '', inStock: '' }
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {

  return httpService.get('toy', { params: { filterBy, sortBy } })
}

function getById(toyId) {
  return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(`toy/${toy._id}`, toy)
  } else {
    return httpService.post('toy', toy)
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
  return { category: 'price', asc: true }
}