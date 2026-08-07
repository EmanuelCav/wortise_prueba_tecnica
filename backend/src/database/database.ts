import { MongoClient, Db } from 'mongodb'

const uri = `${process.env.MONGODB_URI}`

let db: Db

export const connectDB = async (): Promise<Db> => {

    const client = new MongoClient(uri)

    if (!db) {
        await client.connect()
        db = client.db()
        console.log('Se ha conectado MongoDB correctamente')
    }

    return db
}

export const getDB = (): Db => {

    if (!db) {
        throw new Error('Error al obtener la base de datos')
    }

    return db
}