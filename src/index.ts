import express from 'express'
import Config from './config/index'
import apiRoutes from './routes'
import scheduleCronJob from './utils/common/cron-job';

const app = express();
const PORT = Config.ServerConfig.PORT

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    Config.Logger.info('SuccessFully started Server')
    scheduleCronJob()
})