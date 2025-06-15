import { login } from '../auth';
import { saveToLocalStorage } from '../utils/storage';
/** renderLoginPage
 - This function renders the complete login page.
 - If the user enters the correct login credentails it redirects to details page or else it stays in login page.
 - @param container - The HTML element where the page will be rendered
 */
export function renderLoginPage(container) {
    container.innerHTML = `
    <h2>Login</h2>
    <input id="username" placeholder="Username" />
    <input id="password" type="password" placeholder="Password" />
    <button id="loginBtn">Login</button>
    <p id="errorMsg" style="color:red;"></p>
  `;
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) {
        return;
    }
    loginBtn.onclick = () => {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const errorMsgInput = document.getElementById('errorMsg');
        if (!usernameInput || !passwordInput || !errorMsgInput)
            return;
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (login(username, password)) {
            saveToLocalStorage('isLoggedIn', 'true');
            location.reload();
        }
        else {
            errorMsgInput.innerText = 'Invalid credentials';
        }
    };
}
