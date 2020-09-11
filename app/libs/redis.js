//redis lib
const check = require("./check");
const redis = require('redis');

let   client = redis.createClient();

client.on('connect', () => {

    console.log("Redis connection successfully opened");

});

//start getAllUsersInHash to set in a common room
let getAllUsersInHash = (hashName, callback) => {

    client.HGETALL(hashName, (err, result) => {
        

        if (err) {

            console.log(err);
            callback(err, null)

        } else if (check.isEmpty(result)) {

            console.log("online user list is empty");
            console.log(result)

            callback(null, {})

        } else {

            console.log(result);
            callback(null, result)

        }
    });


}// end get all users in a hash


// function to set new online user.
let setNewOnlineUserInHash = (hashName, key, value, callback) => {
   
    client.HMSET(hashName, [
        key, value
    ], (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null)
        } else {

            console.log("user has been set in the hash map");
            console.log(result)
            callback(null, result)
        }
    });


}// end set a new online user in hash

//start deleteUserFromHash to delete userName from common room after logout
let deleteUserFromHash = (hashName,key)=>{

    client.HDEL(hashName,key);
    return true;

}// end delete user from hash

module.exports = {
    getAllUsersInHash : getAllUsersInHash,
    setNewOnlineUserInHash : setNewOnlineUserInHash,
    deleteUserFromHash : deleteUserFromHash
}

