const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const sequelize = new Sequelize('postgresql://postgres.hspsjnkdtvcaiuxplsov:chuchu-diego-araujo@aws-0-us-west-1.pooler.supabase.com:6543/postgres')
// const sequelize = new Sequelize('postgresql://postgres.yhogvuqcegpuxhumgkyn:chuchu-banco-vai-dar-bom@aws-0-us-west-1.pooler.supabase.com:6543/postgres');

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

const Product = sequelize.define(
    'Product',
    {
        enabled: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

    },
);

const ProductOption = sequelize.define('ProductOption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products', // Nome da tabela de produtos
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text'
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
},);

Product.hasMany(ProductImage, { foreignKey: 'product_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(ProductOption, { foreignKey: 'product_id' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id' });

Category.belongsToMany(Product, { through: 'ProdutoCategoria', foreignKey: 'category_id' });
Product.belongsToMany(Category, { through: 'ProdutoCategoria', foreignKey: 'product_id' });

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = {
    User,
    Category,
    Product
}