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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../src/config");
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
exports.getKKBOXAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            axios_1.default.post("https://account.kkbox.com/oauth2/token", qs_1.default.stringify({
                grant_type: "client_credentials",
                client_id: config_1.kkboxConfig.client_id,
                client_secret: config_1.kkboxConfig.client_secret
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject('err');
            });
        });
    });
};
exports.getKKBOXAuthorize = () => {
    return 'https://account.kkbox.com/oauth2/authorize?' +
        "redirect_uri=" + config_1.kkboxConfig.redirect_uri +
        "&client_id=" + config_1.kkboxConfig.client_id +
        "&response_type=" + "code" +
        "&state=" + 125615;
};
exports.getKKBOXSearch = () => {
    axios_1.default.get("https://api.kkbox.com/v1.1/search?q=lemon&territory=TW&limit=50&type=", {
        headers: {
            Authorization: "Bearer duJcwrfwNoNcSXdKzSM9pQ=="
        }
    }).then(success => {
        console.log(success);
    }).catch(err => {
        console.log(err);
    });
};
