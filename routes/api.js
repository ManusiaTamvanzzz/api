__path = process.cwd()
let express = require('express');

let creator = "Vanzzz"
let axios = require('axios')
let fs = require('fs')
let fetch = require('node-fetch');
let router  = express.Router();
let nhentai = require('nhentai-js');
let { tiktok, pinterest, doujindesu, pinterestdl, gpt} = require('../lib/index') 
let { igstalk } = require('../lib/scraper/igstalk');
let options = require(__path + '/lib/options.js');
let { color, bgcolor } = require(__path + '/lib/color.js');
let { getBuffer, fetchJson } = require(__path + '/lib/fetcher.js');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

loghandler = {
    noturl: {
        status: false,
        creator: `${creator}`,
        message: 'Masukan URL'
    },
    notquery: {
        status: false,
        creator: `${creator}`,
        message: 'Masukkan Query'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'Error Kak, Lapor Via WhatsApp wa.me/6285760451683'
    }
}

    router.get('/tiktok', async(req, res) => {
	      let url = req.query.url
	      if (!url) return res.json(loghandler.noturl)
	      let result = await tiktok(url)
	      try {
		  res.json({
			  status: true,
			  creator: `${creator}`,
              data: result,
          })
	   } catch(err) {
		    console.log(err)
		    res.json(loghandler.error)
	     }
    })
    router.get('/igstalk', async(req, res) => {
	     let query = req.query.query 
	     if (!query) return res.json(loghandler.notquery)
	     let result = await igstalk(query)
	     try {
	     res.json({
			  status: true,
			  creator: `${creator}`,
              result: result,
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
     })
     router.get('/xynz-gpt', async(req, res) => {
	     let query = req.query.query
	     if (!query) return res.json(loghandler.notquery)
	     let result = await gpt(query)
	     try {
	     res.json({
			  status: true,
			  creator: `${creator}`,
              data: result,
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
     router.get('/pindl', async(req, res) => {
	     let url = req.query.url
	     if (!url) return res.json(loghandler.noturl)
	     let result = await pinterestdl(url)
	     try {
	     res.json({
			  status: true,
			  creator: `${creator}`,
              data: result,
          })
	    } catch(err) {
		      console.log(err)
		      res.json(loghandler.error)
	       }
      })
      
      // Searching
      router.get('/pinterest', async(req, res) => {
	      let query = req.query.query
	      if (!query) return res.json(loghandler.notquery)
	      let result = await pinterest(query)
	      res.json({ 
		      status: true,
			  creator: `${creator}`,
              data: result,
           })
      })
      router.get('/google', async (req, res, next) => {
	      let query = req.query.query
	      if (!query) return res.json(loghandler.notquery)
	      let google = require('google-it')
	      let result = google({'query': query}).then(result => {
	      res.json({ 
		      status: true,
			  creator: `${creator}`,
              data: result,
           })
        .catch(e => {
         	 res.json(loghandler.error)
           })
       })
   })
         // Animanga
         router.get('/nhentai', async (req, res, next) => {
             code = req.query.code
             if(!code) return res.json({ message: 'masukan parameter Code' })
             result = await nhentai.getDoujin(code)
             res.json({
                  status: 200,
                  creator: `${creator}`,
                  note: 'Jangan Di Tembak Bang',
                  result
             })
            .catch(e => {
            	res.json(loghandler.error)
           })
      })
         // Random Image
          router.get('/randomimage/waifu', async (req, res, next) => {
              fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
             .then(response => response.json())
             .then(async data => {
                  let result = data;
                  let buffer = await fetch(data.url)
                  res.type('png')
                  res.send(await buffer.buffer())
              })
           .catch(e => {
            	res.json(loghandler.error)
            })
        })
        router.get('/randomimage/neko', async (req, res, next) => {
            fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
           .then(response => response.json())
           .then(async data => {
                let result = data;
                let buffer = await fetch(data.url)
                res.type('png')
                res.send(await buffer.buffer())
            })
           .catch(e => {
           	res.json(loghandler.error)
            })
        })
        router.get('/randomimage/husbu', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/loli', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/milf', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	        let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
        router.get('/randomimage/cosplay', async (req, res, next) => {
	        let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
            let result = waif[Math.floor(Math.random() * (waif.length))]
	        let data = await getBuffer(result)
            await fs.writeFileSync(__path +'/database/waifu.png', data)
            await res.sendFile(__path +'/database/waifu.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/database/waifu.png')
        })
     
 router.use(function (req, res) {
     res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router
