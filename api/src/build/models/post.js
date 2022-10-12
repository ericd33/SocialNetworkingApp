"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("./user"));
const postSchema = new mongoose_1.Schema({
    enabled: {
        type: Boolean,
        required: true,
    },
    author: user_1.default,
    likes: {
        type: Number,
        required: false,
    },
    postType: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    comments: {
        Array,
        required: false,
    },
});
exports.default = (0, mongoose_1.model)('post', postSchema);
