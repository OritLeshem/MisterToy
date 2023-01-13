
// const fs = require('fs')
// const toys = require('../data/toy.json')

// module.exports = {
//     query,
//     getById,
//     save,
//     remove
// }

// function query(filterBy, sortBy) {
//     if (sortBy.asc) sortBy.asc = JSON.parse(sortBy.asc)
//     const dir = (sortBy.asc) ? 1 : -1
//     if (!filterBy) return Promise.resolve(toys)
//     let filteredToys = toys
//     if (filterBy.name) {
//         const regex = new RegExp(filterBy.name, 'i')
//         filteredToys = toys.filter(toy => regex.test(toy.name))
//     }
//     if (filterBy.price) {
//         filteredToys = toys.filter(toy => toy.price <= filterBy.price)
//     }
//     if (filterBy.inStock !== undefined) {
//         if (filterBy.inStock) filteredToys = toys.filter(toy => toy.inStock)
//     }
//     if (sortBy.category === 'createdAt') {

//         filteredToys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * dir)
//     }

//     if (sortBy.category === 'name') {
//         console.log('cccccccccccccccc', filterBy, sortBy, dir)
//         filteredToys.sort((t1, t2) => t1.name.localeCompare(t2.name) * dir)
//     }
//     if (sortBy.category === 'price') {
//         console.log('cccccccccccccccc', filterBy, sortBy, dir)
//         filteredToys.sort((t1, t2) => (t1.price - t2.price) * dir)
//     }
//     return Promise.resolve(filteredToys)
// }



// function getById(_id) {
//     const toy = toys.find(toy => toy._id === _id)
//     return Promise.resolve(toy);
// }

// function remove(_id) {
//     const idx = toys.findIndex(toy => toy._id === _id)
//     toys.splice(idx, 1);
//     _saveToysToFile()
//     return Promise.resolve();
// }

// function save(toy) {
//     if (toy._id) {
//         const idx = toys.findIndex(currToy => currToy._id === toy._id)
//         toys[idx] = { ...toys[idx], ...toy }
//     } else {
//         toy.createdAt = new Date(Date.now());
//         toy._id = _makeId();
//         toys.unshift(toy);
//     }
//     _saveToysToFile();
//     return Promise.resolve(toy);
// }



// function _makeId(length = 5) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }

// function _saveToysToFile() {
//     fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2));
// }
