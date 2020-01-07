"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const config = __importStar(require("./config"));
const fs = __importStar(require("fs"));
const kkbox = __importStar(require("../service/kkbox"));
const lineClient = new Line.Client(config.LineConfig);
const router = express.Router();
router.use(function (req, res, next) {
    console.log("輸出記錄訊息至終端機", req.method, req.url);
    next();
});
router.post('/webhook', Line.middleware(config.LineConfig), (req, res) => {
    const events = req.body.events;
    events.forEach((event) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(JSON.stringify(event, null, 4));
        switch (event.type) {
            case 'message':
                switch (event.message.type) {
                    case 'text':
                        console.log("text", event.message.text);
                        const token = yield kkbox.getKKBOXAccessToken();
                        console.log("token", token);
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
    }));
});
module.exports = router;
