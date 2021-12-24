'use strict'

const express = require("express");
const router = express.Router();
const {auth} = require('../middlewares/authenticated');
const {
    list,
    create,
    destroy,
    getByUser,
    getOne,
    createComment,
    updateComment
} = require('../controllers/placeController');

router.get("/list_places", auth, list);
router.post("/register_place", auth, create);
router.delete("/delete_places", auth, destroy);
router.get("/getOne_places", auth, getOne);
router.get("/listUserPlace_places", auth, getByUser);
router.post("/create_comment", auth, createComment);
router.put("/edit_comment", auth, updateComment);

module.exports = router;