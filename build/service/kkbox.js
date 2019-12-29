"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/config");
const axios_1 = __importDefault(require("axios"));
exports.getKKBOXAccessToken = function () {
    axios_1.default.post("https://account.kkbox.com/oauth2/token", {
        grant_type: "client_credentials",
        client_id: config_1.kkboxConfig.client_id,
        client_secret: config_1.kkboxConfig.client_secret
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.error(error);
    });
};
exports.getKKBOXAuthorize = () => {
    return 'https://account.kkbox.com/oauth2/authorize?' +
        "redirect_uri=" + config_1.kkboxConfig.redirect_uri +
        "&client_id=" + config_1.kkboxConfig.client_id +
        "&response_type=" + "code" +
        "&state=" + 1234;
};
exports.getKKBOXSearch = () => {
    axios_1.default.get("https://api.kkbox.com/v1.1/search?q=may&territory=TW&limit=50&type=track", {
        headers: {
            Authorization: "Bearer duJcwrfwNoNcSXdKzSM9pQ=="
        }
    }).then(success => {
        console.log(success);
    }).catch(err => {
        console.log(err.response);
    });
};
