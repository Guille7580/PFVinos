const { Router } = require('express');
const {Review} = require('../db')
const router = Router();

router.get('/review/:ProductId', async (req, res) => {
	const {id} = req.params
	try{
		const productReview = await Review.findAll({where: {ProductId: id}, attributes: {exclude: ["id"]}})
		if(productReview.length > 0){
			res.send(productReview)
		}else{
			res.send(`El producto no tiene reviews`)
		}
	}
	catch(e){
		res.status(500).send(`${e}`)
	}
})
router.get('/:id/review/:email/', async (req, res) => {
	const {id, email} = req.params
	try{
		const [created, productReview] = await Review.findOne({where: {ProductId: id, email: email}, attributes: {exclude: ["id"]}})
		if(created){
			res.send(productReview)
		}else{
			res.send(`El producto no tiene reviews`)
		}
	}
	catch(e){
		res.status(500).send(`${e}`)
	}
})



router.post('/:id/:email/review', async (req, res) =>{
		var { title, rate, content } = req.body
		var { id, email } = req.params
		try{
			const [review, created] = await Review.findOrCreate({
				where: {
					title,
					rate,
					content,
					ProductId: id,
					email: email,
				},
			})
			if(!created){
				res.send('Review already exists')
			}
			else{
				res.send(review)
			}
		}
		catch(e){
			res.status(500).send(`${e}`)
		}
})


router.put('/:productId/review/:idReview/:email', async (req, res) =>{
		var { title, rate, content } = req.body
		var { id, idReview, email } = req.params
		try{
			const review = await Review.findOne({
				where: {
					id: idReview,
					ProductId: id,
					email: email,
				},
			})
			if(review){
				await review.update({
					title,
					rate,
					content,
				})
				res.send(review)
			}
			else{
				res.send('Review not found')
			}
		}
		catch(e){
			res.status(500).send(`${e}`)
		}
})


router.delete('/:idReview/product/:productId', async (req, res) =>{
		var { idReview, id } = req.params
		try{
			const review = await Review.findOne({
				where: {
					id: idReview,
					ProductId: id,
				},
			})
			if(review){
				await review.destroy()
				res.send('Review deleted')
			}
			else{
				res.send('Review not found')
			}
		}
		catch(e){
			res.status(500).send(`${e}`)
		}
})


module.exports = router;