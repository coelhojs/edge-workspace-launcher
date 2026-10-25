const STORAGE_KEY = 'edge_workspaces';

const form = document.getElementById('workspace-form');
const nameInput = document.getElementById('ws-name');
const urlInput = document.getElementById('ws-url');
const grid = document.getElementById('workspaces-grid');
const emptyState = document.getElementById('empty-state');

function getWorkspaces() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve(Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : []);
    });
  });
}

function saveWorkspaces(workspaces) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: workspaces }, resolve);
  });
}

function launchWorkspace(url) {
  chrome.windows.create({ url, focused: true }, () => {
    chrome.tabs.getCurrent((tab) => {
      if (tab && tab.id) {
        chrome.tabs.remove(tab.id);
      } else {
        window.close();
      }
    });
  });
}

async function removeWorkspace(id) {
  const workspaces = await getWorkspaces();
  const updated = workspaces.filter((ws) => ws.id !== id);
  await saveWorkspaces(updated);
  renderWorkspaces(updated);
}

function renderWorkspaces(workspaces) {
  grid.innerHTML = '';

  if (workspaces.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  workspaces.forEach((ws) => {
    const card = document.createElement('article');
    card.className = 'workspace-card';
    card.title = `Abrir ${ws.name}`;

    const header = document.createElement('div');
    header.className = 'card-header';

    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = ws.name;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-remove';
    removeBtn.title = 'Remover Workspace';
    removeBtn.setAttribute('aria-label', `Remover ${ws.name}`);
    removeBtn.innerHTML = '&#10005;';

    removeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      removeWorkspace(ws.id);
    });

    header.appendChild(title);
    header.appendChild(removeBtn);

    const urlText = document.createElement('p');
    urlText.className = 'card-url';
    urlText.textContent = ws.url;

    card.appendChild(header);
    card.appendChild(urlText);

    card.addEventListener('click', () => {
      launchWorkspace(ws.url);
    });

    grid.appendChild(card);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (!name || !url) return;

  const workspaces = await getWorkspaces();
  const newWorkspace = {
    id: crypto.randomUUID(),
    name,
    url,
    createdAt: Date.now()
  };

  const updated = [...workspaces, newWorkspace];
  await saveWorkspaces(updated);

  form.reset();
  nameInput.focus();
  renderWorkspaces(updated);
});

document.addEventListener('DOMContentLoaded', async () => {
  const workspaces = await getWorkspaces();
  renderWorkspaces(workspaces);
});
