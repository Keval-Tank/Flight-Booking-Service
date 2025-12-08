import { configDotenv } from 'dotenv';

configDotenv()

export default {
    PORT : process.env.PORT,
    FLIGHT_SERVICE_URL : process.env.FLIGHT_SERVICE_URL
}


