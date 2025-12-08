import cron from 'node-cron';
import services from '../../services';

async function scheduleCronJob(){
    cron.schedule('*/30 * * * *', async() => {
      await services.BookingServices.cancelOldBookings();
    });
}

export default scheduleCronJob;