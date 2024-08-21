const express = require("express");

const Responsible = require("../models/responsible");
const router = express.Router();

router.get("/", async (req, res) => {
    const responsibles = await Responsible.find();
    return res.send(responsibles);
});

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        const newResponsible = new Responsible(data);
        const addedResponsible = await Responsible.create(newResponsible);
        return res.send(addedResponsible);

    } catch (err) {
        return res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const result = await Responsible.deleteOne({
            _id
        });

        if (!result.deletedCount) {
            return res.send(`Verantwoordelijke met id ${_id} werd niet teruggevonden in de database!`);
        }

        return res.send(`Verantwoordelijke met id ${_id} werd succesvol verwijderd uit de database!`);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) =>{
    const _id = req.params.id;

    try {
        const foundResponsible = await Responsible.findOneAndUpdate(
            {
                _id
            }
            ,
            req.body,
            {
                new: true
            }
        );
        if(!foundResponsible) {
            return res.send(`Verantwoordelijke met id ${_id} werd niet teruggevonden in de database!`);
        }
        return res.send(foundResponsible);

    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;