__path = process.cwd()

let express = require('express');
let router = express.Router();

router.get('/dashboard', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/utama.html')
})

router.get('/about', (req, res) => {
    res.sendFile(__path + '/views/about.html')
})


module.exports = router
