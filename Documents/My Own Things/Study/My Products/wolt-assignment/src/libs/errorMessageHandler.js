export const errorMessageHandler = message => {
    let output;
    if (message.includes('have length greater than or equal to 6')) {
        return output = 'Password must be greater or equal to 6';
    } else if (message.includes('Password must have uppercase characters')) {
        return output = 'Password must have uppercase characters';
    } else if (message.includes('Password must have symbol characters')) {
        return output = 'Password must have symbol characters';
    }

    return output;
}