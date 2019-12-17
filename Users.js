var users = [
    {
        id: "12345",
        name: "Anton"
    },
    {
        id: "67890",
        name: "Test"
    },
    {
        id: "00000",
        name: "Dev"
    }
];

module.exports = {
    GetUsers: function(){
        return users;
    }
}