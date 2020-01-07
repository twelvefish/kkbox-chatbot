import express = require('express')

import * as Line from '@line/bot-sdk'
import * as config from './config'
import * as fs from 'fs'
import * as kkbox from '../service/kkbox'

import { WebhookEvent } from '@line/bot-sdk'

const lineClient = new Line.Client(config.LineConfig)

const router = express.Router()

router.use(function (req, res, next) {
    console.log("輸出記錄訊息至終端機", req.method, req.url);
    next()
})

router.post('/webhook', Line.middleware(config.LineConfig), (req, res) => {
    const events: WebhookEvent[] = req.body.events
    events.forEach(async event => {
        console.log(JSON.stringify(event, null, 4));
        switch (event.type) {
            case 'message':
                switch (event.message.type) {
                    case 'text':
                        console.log("text", event.message.text);
                        const token = await kkbox.getKKBOXAccessToken();
                        console.log("token", token);
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
})

module.exports = router