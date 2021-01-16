const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")

// Item model
const Item = require("../../model/Item")

// @route GET api/item
// desc Get al items
// @access Public
router.get("/", (req, res) => {

    // find all items and sort by date
    Item.find()
    .sort({ date: -1 })
        .then((items) => {
            res.json(items)
        }).catch((err) => {
            console.log(err)
        });
})

// @route POSt api/items
// desc CREATE a post
// @access Private
router.post("/", auth, (req, res) => {

    // find all items and sort by date
    const newIten = new Item({
        name: req.body.name
    })
    newIten.save()
        .then(item => res.json(item))
})

// @route DELETE api/item/:id
// desc DELETE an item
// @access Private
router.delete("/:id", auth, (req, res) => {

    // find the item 
    Item.findById(req.params.id)
        .then(item => {
            item.remove()
            .then(() => res.json({success: true}))
        })
    .catch(err => res.status(404).json({success: false}))

})

module.exports = router