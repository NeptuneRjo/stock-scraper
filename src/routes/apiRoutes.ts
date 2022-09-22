import { Router } from 'express'
import {
	get_top_fifty_coins,
	get_all_coins,
} from '../controllers/apiControllers'

const router = Router()

router.route('/all-coins').get(get_all_coins)
router.route('/top-50').get(get_top_fifty_coins)
router.route('/coin/:id').get((req, res) => res.send('get url'))

export default router
