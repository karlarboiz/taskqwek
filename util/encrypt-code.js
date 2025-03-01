
const { encrypt, decrypt } = require('node-encryption');


const encryptValue =async(val)=>{
    try{
        return await encrypt(Buffer.from(val), process.env.ENCRYPTION_KEY);
    }catch(e){

    }

}

const decryptValue =async(val)=>{
    
    try{
        return await decrypt(val, process.env.ENCRYPTION_KEY);
    }catch(e){

    }
}
module.exports ={
    encryptValue,
    decryptValue
}