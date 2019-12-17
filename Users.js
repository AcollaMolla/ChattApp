var HashHelper = require('./HashHelper');

var users = [
    {
        id: HashHelper.HashUsername("Anton"),
        name: "Anton"
    },
    {
        id: HashHelper.HashUsername("Test"),
        name: "Test"
    },
    {
        id: HashHelper.HashUsername("Dev"),
        name: "Dev"
    }
];

module.exports = {
    GetUsers: function(){
        return users;
    }
}