var HashHelper = require('./HashHelper');

var users = [
    {
        id: HashHelper.HashUsername("Anton"),
        name: "Anton",
        socketID: null,
        active: false
    },
    {
        id: HashHelper.HashUsername("Test"),
        name: "Test",
        socketID: null,
        active: false
    },
    {
        id: HashHelper.HashUsername("Dev"),
        name: "Dev",
        socketID: null,
        active: false
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