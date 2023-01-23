const router = require('express').Router();
const UserController = require('../../app/controllers/user.controller');
const QueueController = require('../../app/controllers/queue.controller');




router.get('/heartbeat', (req, res, next) => {
    res.status(200).json({"result" : "true"})
})

router.post('/queue', (req, res) => {
    let queue = new QueueController()
    queue.getQueue(req, res)
})

router.post('/new', (req, res) => {
    let user = new UserController(req.body.name, req.body.email, req.body.isActive)
    user.add(req, res)
})

router.post('/view', (req, res) => {
    let user = new UserController()
    user.view(req, res)
})

router.delete('/delete', (req, res) => {
    let user = new UserController()
    user.delete(req, res)
})

router.put('/update', (req, res) => {
    let user = new UserController()
    user.update(req, res)
})

module.exports = router