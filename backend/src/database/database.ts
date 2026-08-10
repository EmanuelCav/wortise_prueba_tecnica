import { MongoClient, Db } from 'mongodb'
import { config } from '../config/config.js'

let db: Db
let client: MongoClient

export const connectDB = async (): Promise<Db> => {
    if (!db) {
        client = new MongoClient(config.mongoUri)
        await client.connect()
        db = client.db()
        console.log('Se ha conectado MongoDB correctamente')
    }

    return db
}

export const getDB = (): Db => {
    if (!db) {
        throw new Error('Error al obtener la base de datos: Debe conectarse antes con connectDB()')
    }
    return db
}