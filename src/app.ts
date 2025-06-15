import { renderLoginPage } from './pages/login';
import { renderDetailPage } from './pages/details';
import { getFromLocalStorage } from './utils/storage';

const app = document.getElementById('app')!;

const isLoggedIn = getFromLocalStorage('isLoggedIn') === 'true';

// if the user is valid user the page redirects to details page or else it redirects to login page.
if (isLoggedIn) {
  renderDetailPage(app);
} else {
  renderLoginPage(app);
}
