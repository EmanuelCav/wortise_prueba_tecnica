import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import { config } from './config/config.js'

import userRouter from './routes/user.routes.js'
import articleRouter from './routes/articles.routes.js'
import authorRouter from './routes/author.routes.js'

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: config.frontend_url,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.route('/api/auth', userRouter)
app.route('/api/authors', authorRouter)
app.route('/api/articles', articleRouter)

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`Servidor funcionando en el puerto ${info.port}`)
})