import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import * as articleCtrl from '../controllers/article.ctrl.js'

import { createArticleSchema, updateArticleSchema } from '../middleware/schemas/article.schema.js'

import { authMiddleware } from '../middleware/auth.js'

const articleRouter = new Hono()

articleRouter.get('/public/search', articleCtrl.searchPublicArticles)
articleRouter.get('/:id', articleCtrl.getArticle)
articleRouter.get('/', authMiddleware, articleCtrl.getMyArticles)
articleRouter.post('/', authMiddleware, zValidator('json', createArticleSchema), articleCtrl.createArticle)
articleRouter.put('/:id', authMiddleware, zValidator('json', updateArticleSchema), articleCtrl.updateArticle)
articleRouter.delete('/:id', authMiddleware, articleCtrl.deleteArticle)

export default articleRouter