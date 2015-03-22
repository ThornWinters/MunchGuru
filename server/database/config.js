var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    // Change for production
    host: '127.0.0.1',
    // user: 'fearless_soup',
    // password: 'password',
    // database: 'snackreactordb',
    charset: 'utf8',
    filename: path.join(__dirname, './snackreactordb.sqlite')
  }
});

db.knex.schema.hasTable('restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('restaurants', function (restaurant) {
      restaurant.increments('id').primary();
      restaurant.string('name');
      restaurant.integer('price', 1);
      restaurant.integer('health', 1);
      restaurant.string('hours');
      restaurant.string('address');
      restaurant.float('location_lat');
      restaurant.float('location_long');
      restaurant.string('phone_number');
      restaurant.string('place_id');
      restaurant.string('photo_url');
      restaurant.text('description');
      restaurant.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.integer('organization_id').references('id').inTable('organizations');
      user.string('email').unique();
      user.string('username').unique();
      user.string('password');
      user.integer('is_admin', 1);
      user.string('access_token');
      user.string('refresh_token');
      user.string('auth_type');
      user.string('auth_id');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('ratings').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('ratings', function (rating) {
      rating.increments('id').primary();
      rating.integer('rating', 1);
      rating.integer('user_id').references('id').inTable('users');
      rating.integer('restaurant_id').references('id').inTable('restaurants');
      rating.integer('has_visited', 1);
      rating.text('comments');
      rating.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('organizations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations', function (organization) {
      organization.increments('id').primary();
      organization.string('name');
      organization.string('address');
      organization.string('place_id');
      organization.string('github_id');
      organization.json('github_profile');
      organization.float('location_lat');
      organization.float('location_long');
      organization.string('domain');
      organization.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('organizations_restaurants').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('organizations_restaurants', function (org) {
      org.integer('avg_rating');
      // added cumulativeRating + totalRating -- in correct table?
      org.integer('cumulativeRating');
      org.integer('totalRatings');
      org.integer('organization_id').references('id').inTable('organizations');
      org.integer('place_id').references('place_id').inTable('restaurants');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('hours').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('hours', function (hour) {
      hour.increments('id').primary();
      hour.integer('restaurant_id').references('id').inTable('restaurants');
      hour.string('day_of_week');
      hour.string('time_open');
      hour.string('time_close');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function (session) {
      session.integer('id').primary();
      session.string('sid').unique();
      session.string('data');
      session.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;



