var HashHelper = require('./HashHelper');

var users = [
    {
        id: HashHelper.HashUsername("Anton"),
        name: "Anton",
        socketID: null
    },
    {
        id: HashHelper.HashUsername("Test"),
        name: "Test",
        socketID: null
    },
    {
        id: HashHelper.HashUsername("Dev"),
        name: "Dev",
        socketID: null
    }
];

module.exports = {
    GetUsers: function(){
        return users;
    },

    SetUserSocketID: function(id, socketID){
        var user = users.find(val => val.id === id);
        user.socketID = socketID;
    }
}