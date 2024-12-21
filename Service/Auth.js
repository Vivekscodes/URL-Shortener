const sessionIDToUserMap = new Map();
function SetUser(id, user) {
    sessionIDToUserMap.set(id, user);
}
function GetUser(id) {
    return sessionIDToUserMap.get(id);
}
module.exports = {
    SetUser,
    GetUser
}