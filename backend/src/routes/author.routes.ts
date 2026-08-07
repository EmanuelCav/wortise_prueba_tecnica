import { Hono } from 'hono'

import * as authorController from '../controllers/author.ctrl.js'

const authorRouter = new Hono()

authorRouter.get('/', authorController.getAuthorsList)

export default authorRouter