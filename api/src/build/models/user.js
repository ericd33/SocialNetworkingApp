"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        required: false,
    },
    posts: {
        type: Array,
        required: false
    },
    like: {
        type: Array,
        required: false
    }
});
//ESTO ES UN CAMBIO
exports.default = (0, mongoose_1.model)('user', userSchema);
