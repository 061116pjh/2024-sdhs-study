import crypto from 'crypto';

export const encryptPassword = (password: string): string => {
    return crypto
        .createHash('sha256')
        .update(password + 'sdhs')
        .digest('base64');
}