var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('dbfull', 'root', 'localhost',{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
    defaultScope:{
    attributes:{
    exclude: ['createdAt','updatedAt']
    }
    }
  }
});

// setup User model and its fields.
var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
/*/instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
/*/
});

// Instance Method

User.prototype.validPassword = function (password){
  console.log('Im helping');
  return bcrypt.compareSync(password, this.password);

}


User.myname = function (){
  console.log("i'm returning my name");
  return this.username;

}

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;
