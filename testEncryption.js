require("dotenv").config();

const { encrypt, decrypt } =
    require("./utils/encryption");

const original = "sample-sensitive-data";

const encrypted = encrypt(original);

console.log("Encrypted payload:", encrypted);
console.log("Payload type:", typeof encrypted);
console.log("Parts:", encrypted.split(":").length);

const decrypted = decrypt(encrypted);

console.log("Decrypted:", decrypted);
console.log("Matches:", decrypted === original);