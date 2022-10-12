"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const mongoose = require('mongoose');
const IDauthor = require('./user');
const IDpost = require('./post');
const commentSchema = new mongoose_1.Schema({
    enabled: {
        type: Boolean,
        required: true
    },
    IDauthor: [IDauthor],
    IDpost: [IDpost],
    upVotes: {
        type: Array,
        required: false
    },
    content: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('comment', commentSchema);
