const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true
    },
);

const Category = sequelize.define(
    'Category',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        use_in_menu: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        timestamps: true
    },
);

sequelize.sync({alter: true})
.then (() => {
    console.log('Connection has been established successfully.');
})  
   .catch (error => {
  console.error('Unable to connect to the database:', error);
});

module.exports ={
    User,
    Category
}