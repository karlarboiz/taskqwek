
const { encrypt, decrypt } = require('node-encryption');


const encryptValue =async(val)=>{
    let value=""
    try{
        value =await encrypt(Buffer.from(val), process.env.ENCRYPTION_KEY);
    }catch(e){

    }

    return value;
}

const decryptValue =async(val)=>{
    let value=""
    try{
        value = await decrypt(val, process.env.ENCRYPTION_KEY);
    }catch(e){

    }

    return value;
}
module.exports ={
    encryptValue,
    decryptValue
}