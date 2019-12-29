import { kkboxConfig } from '../src/config'
import axios from 'axios'
import cors from 'cors'

export const getKKBOXAccessToken = function () {

    axios.post("https://account.kkbox.com/oauth2/token", {
        grant_type: "client_credentials",
        client_id: kkboxConfig.client_id,
        client_secret: kkboxConfig.client_secret
    }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded",
         }
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.error(error)
    })
}

export const getKKBOXAuthorize = (): String => {
    return 'https://account.kkbox.com/oauth2/authorize?' +
        "redirect_uri=" + kkboxConfig.redirect_uri +
        "&client_id=" + kkboxConfig.client_id +
        "&response_type=" + "code" +
        "&state=" + 123
}

export const getKKBOXSearch = () => {
    axios.get("https://api.kkbox.com/v1.1/search?q=may&territory=TW&limit=50&type=track", {
        headers: {
            Authorization: "Bearer duJcwrfwNoNcSXdKzSM9pQ=="
        }
    }).then(success => {
        console.log(success);
    }).catch(err => {
        console.log(err.response);
    })
}


