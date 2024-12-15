import chai  from 'chai';
import chaiHttp  from 'chai-http';
import { app }  from '../../server.js';
import { orders, Menu_items, order_items }  from '../models';
import { generateToken }  from '../middleware/generateJWT';

chai.use(chaiHttp);

describe('Order Items API Endpoints', () => {
  let staffToken;
  let testOrder;
  let testMenuItem;
  
  before(async () => {
    staffToken = generateToken({ id: 1, role: 'STAFF' });
    
    // Create test data
    testMenuItem = await Menu_items.create({
      name: 'Test Item',
      price: 10.00,
      description: 'Test description',
      category: 'main'
    });
    
    testOrder = await orders.create({
      status: 'pending',
      totalAmount: 0
    });
  });

  describe('POST /api/order-items/:orderId', () => {
    it('should add item to pending order successfully', async () => {
      const orderItem = {
        menuItemId: testMenuItem.id,
        quantity: 2
      };

      const res = await chai.request(app)
        .post(`/api/order-items/${testOrder.id}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send(orderItem);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('quantity', orderItem.quantity);
      expect(res.body).to.have.property('subtotal', testMenuItem.price * orderItem.quantity);
    });

    it('should reject when order is not found', async () => {
      const res = await chai.request(app)
        .post('/api/order-items/999999')
        .set('Authorization', `Bearer ${staffToken}`)
        .send({
          menuItemId: testMenuItem.id,
          quantity: 1
        });

      expect(res).to.have.status(404);
    });

    it('should reject when order is not in pending state', async () => {
      const completedOrder = await orders.create({
        status: 'completed',
        totalAmount: 0
      });

      const res = await chai.request(app)
        .post(`/api/order-items/${completedOrder.id}`)
        .set('Authorization', `Bearer ${staffToken}`)
        .send({
          menuItemId: testMenuItem.id,
          quantity: 1
        });

      expect(res).to.have.status(400);
    });
  });

  after(async () => {
    // Cleanup test data
    await order_items.destroy({ where: {} });
    await orders.destroy({ where: {} });
    await Menu_items.destroy({ where: {} });
  });
});
