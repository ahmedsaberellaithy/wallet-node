'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'wallets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DECIMAL(19, 4),
      },
      transaction_date: {
        type: Sequelize.DATE,
      },
      effective_date: {
        type: Sequelize.DATE,
      },
      metadata: {
        type: Sequelize.JSONB,
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

    // Add indexes for common queries
    await queryInterface.addIndex('transactions', ['wallet_id', 'transaction_date']);
    await queryInterface.addIndex('transactions', ['wallet_id', 'type']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
}; 