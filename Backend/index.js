import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './src/DB/index.js'

dotenv.config({
  path: '/.env',
})
const port = process.env.PORT_ORIGIN_URI || 8000
connectDB().then(() => {
  try {
    app.on(
      'error',
      (error) =>
        console.log(
          `Error occured during the connection with DB ${error.message}`,
        ),
      app.listen(port, () => {
        console.log(`Connection done with the Database at ${port}`)
      }),
    )
  } catch (error) {
    console.log('Error occured during the DB connection ')
  }
})
