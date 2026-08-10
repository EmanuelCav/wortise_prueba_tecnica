import type { Context } from "hono"
import { ObjectId } from 'mongodb'

import { getDB } from '../database/database.js'

import { getAuthUser } from "../middleware/auth.js"

export const createArticle = async (c: Context) => {

    try {

        const db = getDB()
        const user = getAuthUser(c)
        const body = await c.req.json()

        const newArticle = {
            title: body.title,
            content: body.content,
            coverImageUrl: body.coverImageUrl || null,
            userId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const result = await db.collection('articles')
            .insertOne(newArticle)

        return c.json({
            id: result.insertedId.toString(),
            ...newArticle,
        }, 201)

    } catch (error) {
        return c.json({ error: 'Error al crear el artículo' }, 500)
    }
}

export const getMyArticles = async (c: Context) => {

    try {

        const db = getDB()
        const user = getAuthUser(c)

        const page = Math.max(1, parseInt(c.req.query('page') || '1', 10))
        const limit = Math.max(1, parseInt(c.req.query('limit') || '10', 10))
        const skip = (page - 1) * limit

        const filter = { userId: user.id }

        const [articles, total] = await Promise.all([
            db.collection('articles')
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray(),
            db.collection('articles')
                .countDocuments(filter),
        ])

        return c.json({
            data: articles.map((art) => ({ ...art, id: art._id.toString() })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        })

    } catch (error) {
        return c.json({ error: 'Error al obtener los artículos' }, 500)
    }
}

export const getArticle = async (c: Context) => {

    try {

        const db = getDB();
        const id = c.req.param("id");

        if (!ObjectId.isValid(id as string)) {
            return c.json(
                { error: "ID de artículo inválido" },
                400
            );
        }

        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },

            {
                $lookup: {
                    from: "user",
                    let: {
                        articleUserId: "$userId",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        {
                                            $toString: "$_id",
                                        },
                                        "$$articleUserId",
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                email: 1,
                            },
                        },
                    ],
                    as: "author",
                },
            },

            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: false,
                },
            },

            {
                $project: {
                    _id: 0,
                    id: {
                        $toString: "$_id",
                    },
                    title: 1,
                    content: 1,
                    coverImageUrl: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    authorName: "$author.name",
                    authorEmail: "$author.email",
                    authorId: "$userId",
                },
            },
        ];

        const [article] = await db
            .collection("articles")
            .aggregate(pipeline)
            .toArray();

        if (!article) {
            return c.json(
                { error: "Artículo no encontrado" },
                404
            );
        }

        return c.json(article);
    } catch (error) {
        console.error(error);

        return c.json(
            {
                error: "Error al obtener el detalle del artículo",
            },
            500
        );
    }
};

export const updateArticle = async (c: Context) => {

    try {

        const db = getDB()
        const user = getAuthUser(c)
        const id = c.req.param('id')

        if (!ObjectId.isValid(id as string)) {
            return c.json({ error: 'ID inválido' }, 400)
        }

        const article = await db.collection('articles')
            .findOne({ _id: new ObjectId(id) })

        if (!article) {
            return c.json({ error: 'Artículo no encontrado' }, 404)
        }

        if (article.userId !== user.id) {
            return c.json({ error: 'No tienes permiso para editar este artículo' }, 403)
        }

        const body = await c.req.json()

        const updateData = {
            ...body,
            updatedAt: new Date(),
        }

        await db.collection('articles').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        )

        return c.json({ message: 'Artículo actualizado con éxito' })

    } catch (error) {
        return c.json({ error: 'Error al actualizar el artículo' }, 500)
    }
}

export const deleteArticle = async (c: Context) => {

    try {

        const db = getDB()
        const user = getAuthUser(c)
        const id = c.req.param('id')

        if (!ObjectId.isValid(id as string)) {
            return c.json({ error: 'ID inválido' }, 400)
        }

        const article = await db.collection('articles')
            .findOne({ _id: new ObjectId(id) })

        if (!article) {
            return c.json({ error: 'Artículo no encontrado' }, 404)
        }

        if (article.userId !== user.id) {
            return c.json({ error: 'No tienes permiso para eliminar este artículo' }, 403)
        }

        await db.collection('articles')
            .deleteOne({ _id: new ObjectId(id) })

        return c.json({ message: 'Artículo eliminado con éxito' })

    } catch (error) {
        return c.json({ error: 'Error al eliminar el artículo' }, 500)
    }
}

export const searchPublicArticles = async (c: Context) => {
    try {
        const db = getDB()

        const query =
            c.req.query("q")?.trim() || ""

        const page = Math.max(
            1,
            parseInt(
                c.req.query("page") || "1",
                10
            )
        )

        const limit = Math.max(
            1,
            parseInt(
                c.req.query("limit") || "10",
                10
            )
        )

        const skip = (page - 1) * limit

        const escapeRegex = (value: string) => {
            return value.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            )
        }

        const searchRegex = new RegExp(
            escapeRegex(query),
            "i"
        )

        const pipeline: any[] = [
            {
                $lookup: {
                    from: "user",

                    let: {
                        articleUserId: "$userId",
                    },

                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        {
                                            $eq: [
                                                "$id",
                                                "$$articleUserId",
                                            ],
                                        },
                                        {
                                            $eq: [
                                                {
                                                    $toString:
                                                        "$_id",
                                                },
                                                "$$articleUserId",
                                            ],
                                        },
                                    ],
                                },
                            },
                        },

                        {
                            $project: {
                                _id: 0,
                                name: 1,
                                email: 1,
                            },
                        },
                    ],

                    as: "author",
                },
            },

            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]

        if (query) {
            pipeline.push({
                $match: {
                    $or: [
                        {
                            title: searchRegex,
                        },
                        {
                            content: searchRegex,
                        },
                        {
                            "author.name":
                                searchRegex,
                        },
                    ],
                },
            })
        }

        pipeline.push({
            $facet: {
                metadata: [
                    {
                        $count: "total",
                    },
                ],

                data: [
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },

                    {
                        $skip: skip,
                    },

                    {
                        $limit: limit,
                    },

                    {
                        $project: {
                            _id: 0,

                            id: {
                                $toString: "$_id",
                            },

                            title: 1,

                            content: 1,

                            coverImageUrl: 1,

                            createdAt: 1,

                            authorName: {
                                $ifNull: [
                                    "$author.name",
                                    "Autor desconocido",
                                ],
                            },
                        },
                    },
                ],
            },
        })

        const [result] = await db
            .collection("articles")
            .aggregate(pipeline)
            .toArray()

        const data = result?.data ?? []

        const total =
            result?.metadata?.[0]?.total ?? 0

        return c.json({
            data,

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(
                    total / limit
                ),
            },
        })
    } catch (error) {
        console.error(
            "Error en searchPublicArticles:",
            error
        )

        return c.json(
            {
                error:
                    "Error en la búsqueda de artículos",
            },
            500
        )
    }
}