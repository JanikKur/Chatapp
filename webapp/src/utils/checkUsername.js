export default function checkUsername(username){
    if(username.trim().length < 3){
        return false;
    }
    return true;
}