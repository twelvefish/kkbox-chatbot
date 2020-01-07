import { kkboxConfig } from '../src/config'
import axios from 'axios'
import qs from 'qs';

export const getKKBOXAccessToken = async function () {
    return new Promise((resolve, reject) => {
        axios.post("https://account.kkbox.com/oauth2/token", qs.stringify({
            grant_type: "client_credentials",
            client_id: kkboxConfig.client_id,
            client_secret: kkboxConfig.client_secret
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((error) => {
            reject('err') 
        })
    })
}

export const getKKBOXAuthorize = (): String => {
    return 'https://account.kkbox.com/oauth2/authorize?' +
        "redirect_uri=" + kkboxConfig.redirect_uri +
        "&client_id=" + kkboxConfig.client_id +
        "&response_type=" + "code" +
        "&state=" + 125615
}

export const getKKBOXSearch = () => {
    axios.get("https://api.kkbox.com/v1.1/search?q=lemon&territory=TW&limit=50&type=", {
        headers: {
            Authorization: "Bearer duJcwrfwNoNcSXdKzSM9pQ=="
        }
    }).then(success => {
        console.log(success);
    }).catch(err => {
        console.log(err);
    })
}


