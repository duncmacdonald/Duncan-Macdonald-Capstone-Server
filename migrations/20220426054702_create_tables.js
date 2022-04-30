/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("phone", 10).notNullable();
      table.decimal("credit", 5, 2).unsigned();
    })
    .createTable("cuisine", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
    })
    .createTable("restaurants", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.decimal("latitude", 8, 5);
      table.decimal("longitude", 8, 5);
      table.string("hours");
      table.text("logo", 'longtext');
      table.text("hero", 'longtext');
      // Foreign key to cuisine table
      table
        .integer("cuisine_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cuisine")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      // Foreign key to user table
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    })
    .createTable("orders", (table) => {
      table.increments("id").primary();
      // Foreign key to user table
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      // Foreign key to restaurants table
      table
        .integer("restaurant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("restaurants");
      table.string("order_time").notNullable();
      table.string("status").notNullable();
      table.decimal("total", 5, 2).notNullable();
    })
    .createTable("container", (table) => {
      table.increments("id").primary();
      table.string("type").notNullable();
    })
    .createTable("menu", (table) => {
      table.increments("id").primary();
      // Foreign key to restaurants table
      table
        .integer("restaurant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("restaurants");
      table.string("menu_section").notNullable();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.decimal("price", 5, 2).notNullable();
      table
        .integer("container_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("container");
    })
    .createTable("order_items", (table) => {
      table.increments("id").primary();
      table.integer("quantity").notNullable();
      table
        .integer("item_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("menu");
      table
        .integer("order_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("orders");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("order_items")
    .dropTable("menu")
    .dropTable("container")
    .dropTable("orders")
    .dropTable("restaurants")
    .dropTable("cuisine")
    .dropTable("users");
};
