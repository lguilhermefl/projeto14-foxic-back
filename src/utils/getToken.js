export default function(headers){

    const authorization = headers['authorization'];

    if(authorization){
        const splitted = authorization.split(' ');
        if(splitted.length > 0) return splitted[1].trim();
    }
    
    return null;

};