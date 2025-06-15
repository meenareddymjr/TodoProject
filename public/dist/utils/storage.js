/**
 *  It saves as key value pair in local storage
 */
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};
/**
 * It checks whether the key is present in local storage or not.
 * @returns value of key if the key is present or returns null
 */
export const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
};
/**
 * It removes the key, value pair from the local storage
 */
export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};
