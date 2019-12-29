"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Line = __importStar(require("@line/bot-sdk"));
const config_1 = require("./config");
const config = __importStar(require("./config"));
const lineClient = new Line.Client(config.LineConfig);
const fs = __importStar(require("fs"));
const kkbox = __importStar(require("../service/kkbox"));
var router = express.Router();
router.use(function (req, res, next) {
    console.log("輸出記錄訊息至終端機", req.method, req.url);
    next();
});
router.post('/webhook', Line.middleware(config_1.LineConfig), (req, res) => {
    const events = req.body.events;
    let responseArray = [];
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
                            let buffers = [];
                            stream.on('data', (data) => buffers.push(data));
                            stream.on('end', () => {
                                fs.writeFileSync('./test2.mp3', Buffer.concat(buffers));
                            });
                        });
                        break;
                }
                break;
        }
    });
    Promise
        .all(responseArray)
        .then((result) => {
        res.json(result);
        res.status(200).end();
    })
        .catch((err) => {
        console.error("err", err);
        res.status(500).end();
    });
});
router.post('/kkbox', (req, res) => {
    kkbox.getKKBOXAuthorize();
});
module.exports = router;
