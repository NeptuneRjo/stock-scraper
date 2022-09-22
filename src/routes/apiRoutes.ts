import { Router } from 'express'

const router = Router()

router.route('/coins').get((req, res) => res.send('Get coins'))
router.route('/coin/:id').get((req, res) => res.send('get url'))

export default router
