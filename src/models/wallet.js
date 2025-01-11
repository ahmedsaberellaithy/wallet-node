module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    currency: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    hold_amount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
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
    tableName: 'wallets',
    timestamps: false,
    uniqueKeys: {
      unique_user_currency: {
        fields: ['user_id', 'currency'],
      },
    },
  });

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, { foreignKey: 'user_id' });
    Wallet.hasMany(models.Transaction, { foreignKey: 'wallet_id' });
  };

  return Wallet;
};