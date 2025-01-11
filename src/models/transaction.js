module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wallet_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'wallets',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DECIMAL,
    },
    transaction_date: {
      type: DataTypes.DATE,
    },
    effective_date: {
      type: DataTypes.DATE,
    },
    metadata: {
      type: DataTypes.JSONB,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
  }, {
    tableName: 'transactions',
    timestamps: false,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Wallet, { foreignKey: 'wallet_id' });
  };

  return Transaction;
};
