const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');
const user = require('../models/user');
const Log = require('../db').import('../models/log');


router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(Log => res.status(200).json(Log))
    .catch(err => res.status(500).json({ error: err }))
});


router.get("/", validateSession, (req, res) => {
    let userId = req.user.id
    Log.findAll({
        where: { owner_id: userId }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json ({ error: err }))
});

router.get("/:id", validateSession, (req, res) => {
    let userid = req.params.id;
    Log.findAll({
        where: { id : userid }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json ({ error: err }))
});

router.put('/:id', validateSession, (req, res) => {
    const updateEntry = {
        description: req.body.log.description,
        definition: req.body.log.description,
        result: req.body.log.result
    };
    const query = { 
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }};
    
      Log.update(updateEntry, query)
      .then((logs) => res.status(200).json(logs))
      .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, (req, res) => {
    const query = {where: { id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Entry Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});



module.exports = router;