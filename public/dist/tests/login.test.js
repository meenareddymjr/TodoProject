/**
 * @jest-environment jsdom
 */
import { renderLoginPage } from '../pages/login';
import * as auth from '../auth';
import * as storage from '../utils/storage';
describe('renderLoginPage', () => {
    let reloadMock;
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should log in with correct credentials and call saveToLocalStorage', () => {
        const mockLogin = jest.spyOn(auth, 'login').mockReturnValue(true);
        const mockSave = jest.spyOn(storage, 'saveToLocalStorage').mockImplementation(() => { });
        const container = document.createElement('div');
        document.body.appendChild(container);
        renderLoginPage(container);
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = 'password';
        document.getElementById('loginBtn').click();
        expect(mockLogin).toHaveBeenCalledWith('admin', 'password');
        expect(mockSave).toHaveBeenCalledWith('isLoggedIn', 'true');
    });
});
