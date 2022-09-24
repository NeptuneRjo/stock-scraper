import { Router } from 'express'
import {
	get_top_fifty_coins,
	get_all_coins,
	get_single_coin,
} from '../controllers/apiControllers'

const router = Router()

router.route('/all-coins').get(get_all_coins)
router.route('/half-coins').get(get_top_fifty_coins)
router.route('/:id').get(get_single_coin)

export default router
