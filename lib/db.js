import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'mongodb+srv://u6610308:cnuqAKP75DzWhqDq@cluster0.lobqt.mongodb.net/',
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then(mongoose => {
            console.log('DB connected')
            // console.debug(mongoose)
            // return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect