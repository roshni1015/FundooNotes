import bcrypt from 'bcrypt';

export const PasswordHash = async (Password) => {
    const saltRounds = 10;
    const Hash = await bcrypt.hash(Password, saltRounds)
    return Hash;
}