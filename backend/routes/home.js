"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get('/', (request, response) => {
    response.send('niceRoute');
});
module.exports = router;
