
var Q = require('q');
var service = {};
var User = require("../model/User");
service.readActiveUser=readActiveUser;
module.exports = service;



function readActiveUser
{

User.find().toArray(function (err, User) {
        if (err) deferred.reject(err);

        // return users (without hashed passwords)
        User = _.map(User, function (User) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}
