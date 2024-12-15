import chai  from 'chai';
import chaiHttp  from 'chai-http';
import { app }  from '../../server.js';
import { expect } from 'chai';
import { Menu_items } from '../models';
import { generateToken }  from '../middleware/generateJWT';

chai.use(chaiHttp);

describe('Menu Items API Endpoints', () => {
  let adminToken;
  
  before(async () => {
    adminToken = generateToken({ id: 1, role: 'ADMIN' });
  });

  describe('POST /api/menu-items', () => {
    it('should create a new menu item when admin is authenticated', async () => {
      const menuItem = {
        name: 'Test Item',
        price: 9.99,
        description: 'Test description',
        category: 'main'
      };

      const res = await chai.request(app)
        .post('/api/menu-items')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(menuItem);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('name', menuItem.name);
      expect(res.body).to.have.property('price', menuItem.price);
    });

    it('should reject creation when token is missing', async () => {
      const res = await chai.request(app)
        .post('/api/menu-items')
        .send({});

      expect(res).to.have.status(401);
    });
  });
});

after(async () => {
 // Clear the database after all tests
  await Menu_items.destroy({ where: {} });
});

