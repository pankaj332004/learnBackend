const crypto = require("crypto");

const algorithm = "aes-256-gcm";

function getKey(){
    const key = Buffer.from(
        process.env.ENCRYPTION_KEY,
        "hex"
    );

    if(key.length !== 32){
        throw new Error(
            "ENCRYPTION_KEY must be 32 bytes (64 hex characters)"
        );
    }

    return key;
}

function encrypt(text){
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(
        algorithm,
        getKey(),
        iv
    );

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final()
    ]);

    const tag = cipher.getAuthTag();

    return [
        iv.toString("hex"),
        tag.toString("hex"),
        encrypted.toString("hex")
    ].join(":");
}

function decrypt(payload) {
    if (typeof payload !== "string") {
        throw new Error("Encrypted payload must be a string");
    }

    const parts = payload.split(":");

    if (parts.length !== 3) {
        throw new Error("Invalid encrypted payload format");
    }

    const [ivHex, tagHex, encryptedHex] = parts;

    if (
        !/^[0-9a-f]{24}$/i.test(ivHex) ||
        !/^[0-9a-f]{32}$/i.test(tagHex) ||
        !/^(?:[0-9a-f]{2})+$/i.test(encryptedHex)
    ) {
        throw new Error("Invalid encrypted payload components");
    }

    const decipher = crypto.createDecipheriv(
        algorithm,
        getKey(),
        Buffer.from(ivHex, "hex")
    );

    decipher.setAuthTag(Buffer.from(tagHex, "hex"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedHex, "hex")),
        decipher.final()
    ]);

    return decrypted.toString("utf8");
}

module.exports = {encrypt,decrypt}