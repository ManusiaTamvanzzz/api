__path = process.cwd()

let express = require('express');
let router = express.Router();

router.get('/dashboard', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/dashboard/hengker-bjorka', (req, res) => {
    res.sendFile(__path + '/views/hengker.html')
})

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/utama.html')
})

router.get('/about', (req, res) => {
    res.sendFile(__path + '/views/about.html')
})
router.get('/dashboard/thanks-to', async(req, res) => {
        let lah  
        lah.thanksto = ['Vanz', 'Penyedia Sc Rest APIs']
	    res.json({
			  status: true,
			  creator: "Vanzzz",
              data: lah,
          })
      })

module.exports = router 
