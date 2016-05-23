import Router from 'koa-router';
import db from './db';

// Data Models
let User = db.Model.extend({
  tableName: 'users',
  projects: () => {
    return this.belongsToMany(Project);
  }
});

let Project = db.Model.extend({
  tableName: 'projects',
  users: () => {
    return this.belongsToMany(User);
  }
});

// Routing
let router = Router();

router.get('/', (ctx, next) => {
  ctx.body = { api: 'v1.0' };
  return next();
});

router.get('/users', (ctx, next) => {
  return User.fetchAll().then((collection) => {
    ctx.body = collection.toJSON();
    return next();
  });
});

router.post('/users', (ctx, next) => {
  // Test bodyparser
  // TODO: proper logic
  ctx.body = ctx.request.body;
  return next();
});

export default router;