
const bcrypt = require("bcrypt");

async function main() {
    const password = "MyPassword@123";

    const hashedPassword1 = await bcrypt.hash(password, 10);
    const hashedPassword2 = await bcrypt.hash(password, 10);

    console.log(hashedPassword1 == hashedPassword2);
}

main();
