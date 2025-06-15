const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';
/**
 * This function checks whether the user details are correct or not.
 @returns true if userName and password matches or returns false if any condition fails
 */
export function login(userName, password) {
    return userName === VALID_USERNAME && password === VALID_PASSWORD;
}
