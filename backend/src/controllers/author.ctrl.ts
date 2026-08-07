import type { Context } from 'hono'

import { getDB } from '../database/database.js'

export const getAuthorsList = async (c: Context) => {

    try {

        const db = getDB()

        const pipeline = [
            {
                $lookup: {
                    from: 'articles',
                    localField: 'id',
                    foreignField: 'userId',
                    as: 'userArticles',
                },
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    name: 1,
                    email: 1,
                    articlesCount: { $size: '$userArticles' },
                },
            },
            { $sort: { articlesCount: -1 } },
        ]

        const authors = await db.collection('user')
            .aggregate(pipeline)
            .toArray()

        return c.json(authors)

    } catch (error) {
        return c.json({ error: 'Error al obtener los autores' }, 500)
    }
}