import { Request, Response } from 'express';


const express = require('express');
const router = express.Router();

router.get('/', (request :Request, response :Response) =>{
    response.send('niceRoute');
});

module.exports = router;