const mongoose = require('mongoose')

const Queue = require('../models/queue.model')
const { getRandomOperation } = require('../utils/controller.utils')

class QueueController {

    constructor() {
    }

    async randomOperation(req, res) {
        let queue = new Queue({ operationType: getRandomOperation() })
        queue.save()
        res.status(200).json({ "result": queue })
    }

    async getQueue(req, res){
        let data = await Queue.find({})
        console.log(typeof(req.body.status))
        res.status(200).json(data)
    }

    async add(operationType) {
        let queue = new Queue({ operationType: operationType })
        await queue.save()
        return queue._id
    }

    async update(id, result) {
        console.log(id)
        Queue.findByIdAndUpdate(id, { status: result } ).exec()
    }

    
}

module.exports = QueueController
