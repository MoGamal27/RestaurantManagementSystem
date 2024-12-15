const { Op } = require("sequelize");
const { orders } = require("../models");

async function checkExpiredOrders() {
    try{
        // calc time for 4 hours ago
        const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

        // update pending orders older than 4 hours to expired
        await orders.update(
            { status: "expired" },
            {
                where: {
                    status: "pending",
                    createdAt: {
                        [Op.lte]: fourHoursAgo 
                    }
                }
            }
        )
    } catch (error) {
        throw error;
    }
}

module.exports = checkExpiredOrders;