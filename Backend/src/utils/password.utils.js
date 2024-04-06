import bcrypt from "bcrypt";

const passwordHashing = async (plainTextPassword) => {
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    return hashedPassword;
}

const verifyPassword = async (plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export { passwordHashing, verifyPassword }