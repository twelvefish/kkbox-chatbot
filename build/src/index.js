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
const app = express(); //建立一個Express伺服器
const webhook = require('./webhook');
app.use('/', webhook);
const kkbox = __importStar(require("../service/kkbox"));
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port 3000');
    kkbox.getKKBOXAccessToken();
});
