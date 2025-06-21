import crypto from "crypto"

const randomValue=crypto.randomBytes(8).toString("hex");

console.log(randomValue);

const hashValue1=crypto.createHash("sha256").update("anuragKumar").digest("hex")
console.log(hashValue1);

const hashValue2=crypto.createHash("sha256").update("abhinav").digest("hex")
console.log(hashValue2);

