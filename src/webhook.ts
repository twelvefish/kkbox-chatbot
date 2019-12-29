import express = require('express')

import * as Line from '@line/bot-sdk'
import { LineConfig } from './config'
import { WebhookEvent } from '@line/bot-sdk'

import * as config from './config'
const lineClient = new Line.Client(config.LineConfig)
import * as fs from 'fs'

import * as kkbox from '../service/kkbox'
var router = express.Router()

router.use(function (req, res, next) {
    console.log("輸出記錄訊息至終端機", req.method, req.url);
    next()
})

router.post('/webhook', Line.middleware(LineConfig), (req, res) => {
    const events: WebhookEvent[] = req.body.events
    let responseArray: Promise<any>[] = []
    events.forEach(event => {
        console.log(JSON.stringify(event, null, 4));
        switch (event.type) {
            case 'message':
                switch (event.message.type) {
                    case 'text':
                        console.log("text", event.message.text);
                        break;
                    case 'audio':
                        console.log("audio", event.message.id);
                        lineClient.getMessageContent(event.message.id).then(stream => {
                            let buffers: Buffer[] = [];
                            stream.on('data', (data: Buffer) => buffers.push(data));
                            stream.on('end', () => {
                                fs.writeFileSync('./test2.mp3', Buffer.concat(buffers));
                            })
                        })
                        break;
                }
                break;

        }
    })

    Promise
        .all(responseArray)
        .then((result) => {
            res.json(result)
            res.status(200).end()
        })
        .catch((err) => {
            console.error("err", err)
            res.status(500).end()
        })
})

router.post('/kkbox', (req, res) => {
    kkbox.getKKBOXAuthorize()
})

module.exports = router