import * as crypto from 'crypto';

// allowSyntheticDefaultImports: true

const encryptPassword = (password: string): string => {
    return crypto
        .createHash('sha256')
        .update(password + 'sdhs')
        .digest('base64');
}

export default encryptPassword;