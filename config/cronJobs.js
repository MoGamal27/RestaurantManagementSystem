const cron = require("node-cron");
const checkExpiredOrders = require("../utils/orderExpirationJob");

function initializeCronJobs() {
    // check expired orders every hour
    cron.schedule("0 * * * *", checkExpiredOrders);
}

module.exports = initializeCronJobs;