'use strict'

const Place = require('../models/Place');

const list = (req, res) => {
    Place.find({})
        .populate("user", ["name"])
        .populate("comments.user", ["name"])
        .then(async (places) => {
            const total = await Place.estimatedDocumentCount();
            res.status(200).json({
                total,
                data: places,
            });
        });
};

const create = (req, res) => {
    const { name, type, lon, lat } = req.body;
    const { _id } = req.user;
    const place = {
        name,
        type,
        lon,
        lat,
        user: _id,
    };
    const newPlace = new Place(place);
    newPlace.save().then((placeCreated) => {
        res.status(200).json(placeCreated);
    });
};

const destroy = (req, res) => {
    const { placeId } = req.body;
    const { _id } = req.user;
    Place.findOneAndDelete(
        {
            $and: [{ _id: { $eq: placeId } }, { user: { $eq: _id } }],
        },
        (err, docs) => {
            if (err) {
                res.status(500).json({
                    message: "errors.place.onDelete",
                });
            } else if (docs) {
                res.status(200).json({
                    message: "success.place.onDelete",
                    data: docs,
                });
            } else {
                res.status(404).json({
                    message: "errors.place.placeNotExists",
                });
            }
        }
    );
};

const getOne = (req, res) => {
    const { placeId } = req.query
    Place.findById({ "_id": placeId })
        .populate("user", ["name"])
        .populate("comments.user", ["name"])
        .then((place) => {
            res.status(200).json({
                data: place,
            });
        })
        .catch(() => {
            res.status(404).json({
                message: "Not found"
            })
        });
};

const getByUser = (req, res) => {
    const { _id } = req.user;
    Place.find({ "user": _id })
        .populate("user", ["name"])
        .populate("comments.user", ["name"])
        .sort({ createdAt: -1 })
        .then((places) => {
            const total = places.length
            res.status(200).json({
                total,
                data: places,
            });
        });
};

const createComment = (req, res) => {
    const { placeId, rating, content } = req.body;
    const { _id } = req.user;
    const comments = {
        placeId,
        rating,
        content,
        user: _id,
    };
    Place.updateOne({ _id: placeId }, { $addToSet: { comments } })
        .then(() => {
            res.status(200).json({ message: "ok", comments });
        })
        .catch((error) => {
            res.status(500).json({ message: "not updated" });
        });
};

const updateComment = (req, res) => {
    const { commentId, rating, content } = req.body;
    const { _id } = req.user;
    Place.findOneAndUpdate(
        {
            $and: [{ 'comments._id': { $eq: commentId } }, { user: { $eq: _id } }],
        },
        {
            "$set": {
                "comments.$.rating": rating,
                "comments.$.content": content
            }
        },
        { new: true },
        (err, docs) => {
            if (err) {
                res.status(500).json({
                    message: "errors.place.onUpdate",
                });
            } else if (docs) {
                res.status(200).json({
                    message: "success.place.onUpdate",
                    data: docs,
                });
            } else {
                res.status(404).json({
                    message: "errors.comment.commentNotExists",
                });
            }
        }
    );
};

module.exports = {
    list,
    create,
    destroy,
    getOne,
    getByUser,
    createComment,
    updateComment,
};