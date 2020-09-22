const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
	res.send('this is my app')
})

module.exports = router
