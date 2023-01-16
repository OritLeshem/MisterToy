const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
// const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)

        const collection = await dbService.getCollection('review')

        // const reviews = await collection.find().toArray()
        var reviews = await collection.aggregate([

            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',// byUserId in short review
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'// create new filed in the big review
                }
            },
            {
                $unwind: '$byUser'
            },
            // {
            //     // $lookup:
            //     // {
            //     //     localField: 'toyId',
            //     //     from: 'toy',
            //     //     foreignField: '_id',
            //     //     as: 'aboutToy'
            //     // }
            // },
            // {
            //     $unwind: '$aboutToy'
            // }
        ]).toArray()
        console.log('REVIEWSsssss============', reviews)
        reviews = reviews.map(review => {
            review.byUserId = { _id: review.byUserId._id, fullname: review.byUserId.fullname }
            // review.aboutToy = { _id: review.aboutToy._id, name: review.aboutToy.name }
            delete review.byUserId
            // delete review.aboutToy
            return review
        })

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        review.toyId = ObjectId(review.toyId)
        review.byUserId = ObjectId(review.byUserId)
        const collection = await dbService.getCollection('review')
        await collection.insertOne(review)
        return review

    }

    catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


