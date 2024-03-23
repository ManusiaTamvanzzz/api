const axios = require('axios')

function gpt(txt) {
                 return new Promise((resolve, reject) => {
                  const url = "https://www.freechatgptonline.com/wp-json/mwai-ui/v1/chats/submit";
                 const body = {
                   botId: "default",
                   [
                       {
                         role: "assistant",
                         content: "nama kamu Xynz, kamu dibuat oleh Vanz, kamu adalah bot yang tahu tentang Coding Bahasa Pemograman, tahu tentang teknologi gunakan bahasa indonesia"
                       },
                       {
                         role: "user",
                         content: txt
                        }
                    ],
                  newMessage: txt,
                  stream: false
               };
             axios.post(url, body)
            .then(response => {
                resolve(response.data.reply);
            })
            .catch(error => {
                resolve(error.data.message);
            });
    });
}


module.exports = gpt
