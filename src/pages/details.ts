import { Todo } from '../models/Todo';
import { removeFromLocalStorage } from '../utils/storage';

let todos: Todo[] = [];
let currentEditId: number | null = null;

/**  renderDetailPage 
 - This function renders the complete details page
 - It includes creation of todo list, displaying todo list and editing todo list
 - Also setup logout functionality
 @param container - The HTML element where the page will be rendered 
*/
export function renderDetailPage(container: HTMLElement) {
  container.innerHTML = `
    <h2>Create Todo</h2>
    <form id="todoForm">
      <input id="title" maxlength="100" placeholder="Title" required /><br/>
      <textarea id="text" maxlength="300" placeholder="Text" required></textarea><br/>
      <small id="charCount">0/300</small><br/>
      <input id="date" type="date" required /><br/>
      <button type="submit">Save</button>
    </form>
    <ul id="todoList"></ul>
    <button id="logoutBtn">Logout</button>
  `;

  const textArea = document.getElementById('text') as HTMLTextAreaElement;

  if (!textArea) return;
  
  textArea.oninput = () => {
    document.getElementById('charCount')!.textContent = `${textArea.value.length}/300`;
  };

  document.getElementById('todoForm')!.onsubmit = (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const textInput = document.getElementById('text') as HTMLTextAreaElement;
    const dateInput = document.getElementById('date') as HTMLInputElement;

    if (!titleInput || !textInput || !dateInput) return;

    const title = titleInput.value.trim();
    const text = textInput.value.trim();
    const date = dateInput.value.trim();

    if (!title || !text || !date) return;

    if (currentEditId !== null) {
      const index = todos.findIndex(t => t.id === currentEditId);
      if (index !== -1) {
        todos[index] = new Todo(currentEditId, title, text, date);
      }
      currentEditId = null;
    } else {
      const newTodo = new Todo(Date.now(), title, text, date);
      todos.push(newTodo);
    }

    (document.getElementById('todoForm') as HTMLFormElement).reset();
    document.getElementById('charCount')!.textContent = `0/300`;
    renderTodoList();
  };

  document.getElementById('logoutBtn')!.onclick = () => {
    removeFromLocalStorage('isLoggedIn');
    location.reload();
  };

  renderTodoList();
}


/** renderTodoList
 - renders the todo list in UI
 - sets up the Edit button for each todo element to load its data back into the form.
 */
function renderTodoList() { 
  const list = document.getElementById('todoList')!;
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.date}
      <button data-id="${todo.id}">Edit</button>
    `;
    li.querySelector('button')!.onclick = () => {
      const t = todos.find(t => t.id === +li.querySelector('button')!.getAttribute('data-id')!)!;
      (document.getElementById('title') as HTMLInputElement).value = t.title;
      (document.getElementById('text') as HTMLTextAreaElement).value = t.text;
      (document.getElementById('date') as HTMLInputElement).value = t.date;
      document.getElementById('charCount')!.textContent = `${t.text.length}/300`;
      currentEditId = t.id;
    };
    list.appendChild(li);
  });
}
