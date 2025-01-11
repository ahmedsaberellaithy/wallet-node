'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wallets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      currency: {
        type: Sequelize.STRING,
      },
      balance: {
        type: Sequelize.DECIMAL(19, 4),
        defaultValue: 0,
      },
      hold_amount: {
        type: Sequelize.DECIMAL(19, 4),
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      }
    });

    // Add unique constraint for user_id and currency combination
    await queryInterface.addConstraint('wallets', {
      fields: ['user_id', 'currency'],
      type: 'unique',
      name: 'unique_user_currency'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wallets');
  }
}; 