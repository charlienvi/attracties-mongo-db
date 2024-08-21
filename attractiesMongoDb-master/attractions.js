const express = require("express");

// Models importeren
const Attraction = require("../models/attraction");

const router = express.Router();

// async toevoegen aan functie om await te kunnen gebruiken
router.get("/", async (req, res) => {
    const attractions = await Attraction.find();
    return res.send(attractions);
});

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        const newAttraction = new Attraction(data);
        const addedAttraction = await Attraction.create(newAttraction);
        return res.send(addedAttraction);

    } catch (err) {
        return res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const result = await Attraction.deleteOne({
            _id
        });

        if (!result.deletedCount) {
            return res.send(`Attractie met id ${_id} werd niet teruggevonden in de database!`);
        }

        return res.send(`Attractie met id ${_id} werd succesvol verwijderd uit de database!`);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) =>{
    const _id = req.params.id;

    try {
        const foundAttraction = await Attraction.findByIdAndUpdate(
            /*
            * Ik kies ervoor om dezelfde namen tegen te houden, deze benadering gaat ervan uit dat vanuit
            * de frontend ENKEL waarden die veranderen in de body van het put request gestoken worden
            */
            req.params.id,
            {
                $set: req.body
            },
            {
                runValidators: true
            },
            function(err){
                if(err){
                    return res.send(`Attractie met id ${_id} bestaat maar de naam is reeds in gebruik en moet uniek zijn!`);
                }
            }

        );
        if(!foundAttraction) {
            return res.send(`Attractie met id ${_id} werd niet teruggevonden in de database!`);
        }

        return res.send(foundAttraction);

    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;