import mongoose from 'mongoose'
import { DBName } from '../../constant.js'

const { MONGO_DB_URI } = process.env
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_DB_URI + DBName)
    return connectionInstance
    // console.log(connectionInstance)
  } catch (error) {
    console.log(`Failed to setup connection with the Database ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
