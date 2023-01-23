const User = require('../models/user.model')
const { isActiveGenerator, nameGenerator, emailGenerator, bodyParser } = require('../utils/controller.utils')
const QueueController = require('./queue.controller')



class UserController {
    constructor(name = nameGenerator(), email = emailGenerator(name), isActive = isActiveGenerator()) {
        this.name = name,
            this.email = email
        this.isActive = isActive
    }

    async add(req, res) {
        let model = new User({ name: `${this.name}`, email: `${this.email}`, isActive: this.isActive })
        let queue = new QueueController()
        let queueId = await queue.add("add")
        console.log(`qid: ${queueId}`)
        model.save().then(() => {
            queue.update(queueId, "Finished")
            res.status(200).json({ "result": model })
        })
        .catch(err => {
            queue.update(queueId, "Failed")
            res.status(500).json(err)
        })
    }

    async view(req, res) {
        let parsedBody = bodyParser(req.body)
        const data = await User.find(parsedBody[0])
        res.status(200).json(data)
    }

    async update(req, res) {
        let parsedBody = bodyParser(req.body)
        const data = await User.find(parsedBody[0])
        if(Object.keys(parsedBody[0]).length == 0){
            return res.status(400).json("cannot use empty query")
        }
        User.updateMany(parsedBody[0], { $set: parsedBody[1] })
        .exec()
        .then(() => {
            res.status(200).json({ "updated": data })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    async delete(req, res) {
        let parsedBody = bodyParser(req.body)
        const data = await User.find(parsedBody[0])
        if(Object.keys(parsedBody[0]).length == 0){
            return res.status(400).json("cannot use empty query")
        }
        User.remove(parsedBody[0])
        .exec()
        .then(() => {
            res.status(200).json({ "deleted": data })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    async runTransaction (params, ...fns) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const results = await Promise.all(fns.map(fn => fn(params)));
            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
    }
}

module.exports = UserController