import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import { connectDB } from './database/database.js'

import userRouter from './routes/user.routes.js'
import articleRouter from './routes/articles.routes.js'
import authorRouter from './routes/author.routes.js'

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.route('/api/auth', userRouter)
app.route('/api/authors', authorRouter)
app.route('/api/articles', articleRouter)

connectDB()
  .then(() => {
    serve({ fetch: app.fetch, port: 3000 }, (info) => {
      console.log(`Servidor funcionando en http://localhost:${info.port}`)
    })
  })
  .catch((err) => {
    console.error('Error al conectar MongoDB:', err)
  })
