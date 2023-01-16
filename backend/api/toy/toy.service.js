const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  try {
    // console.log(filterBy.price, 'price')
    const criteria = _buildCriteria(filterBy)
    console.log('criteria', criteria)
    //   name: { $regex: filterBy.name, $options: 'i' },
    // price: { $lte: filterBy.price }

    const collection = await dbService.getCollection('toy')
    var toys = await collection.find(criteria).toArray()
    return toys
  }
  catch (err) {
    // logger.error('cannot find toys', err)
    throw err
  }
}
function _buildCriteria(filterBy) {
  let criteria = {}
  // console.log(filterBy)
  if (filterBy.name) {
    criteria.name = { $regex: filterBy.name, $options: 'i' }
  }
  if (filterBy.price) {
    criteria.price = { $lte: +filterBy.price || Infinity }
  }
  if (filterBy.inStock === 'true') {
    criteria.inStock = true
  }
  // if (filterBy?.labels?.length) {
  //   criteria.lables = { $all: filterBy.labels }
  // }

  return criteria
}

async function remove(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    await collection.deleteOne({ _id: ObjectId(toyId) })
    return toyId
  } catch (err) {
    logger.error(`cannot remove toy ${toyId}`, err)
    throw err
  }
}
async function add(toy) {
  try {
    const collection = await dbService.getCollection('toy')
    await collection.insertOne(toy)
    return toy
  } catch (err) {
    // logger.error('cannot insert toy', err)
    throw err
  }
}
async function getById(toyId) {
  try {
    const collection = await dbService.getCollection('toy')
    const toy = collection.findOne({ _id: ObjectId(toyId) })
    return toy
  } catch (err) {
    logger.error(`while finding toy ${toyId}`, err)
    throw err
  }
}
async function update(toy) {
  try {
    const toyToSave = {
      name: toy.name,
      price: toy.price
    }
    const collection = await dbService.getCollection('toy')
    await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
    return toy
  } catch (err) {
    // logger.error(`cannot update toy ${toy._id}`, err)
    throw err
  }
}
// async function query(filterBy = { txt: '' }) {
//   try {
//     const criteria = {
//       vendor: { $regex: filterBy.txt, $options: 'i' }
//     }
//     const collection = await dbService.getCollection('toy')
//     var toys = await collection.find(criteria).toArray()
//     return toys
//   } catch (err) {
//     logger.error('cannot find toys', err)
//     throw err
//   }
// }
module.exports = {

  query,
  remove,
  add,
  getById,
  update

}
