const scriptUrl = document.currentScript?.src || '';
const pathParts = new URL(scriptUrl).pathname.split('/').filter(Boolean);

async function loadPosts(limit = null) {
  try {
    const res = await fetch(`/blog/posts.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load posts.json');
    const posts = await res.json();

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return limit ? posts.slice(0, limit) : posts;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function renderList(posts, olEl) {
  if (!olEl) return;
  if (!posts.length) {
    olEl.outerHTML = '<p>Posts coming soon.</p>';
    return;
  }
  olEl.innerHTML = posts
    .map(p => `<li><a href="${p.url}">${p.tag} - ${p.title.replace(/^.*?(?:—|-)\s*/, '')}</a></li>`)
    .join('');
}

async function mountLatest(selector = '#latest-posts', count = 6) {
  const el = document.querySelector(selector);
  if (!el) return;
  const posts = await loadPosts(count);
  renderList(posts, el);
}

async function mountAll(selector = '#all-posts') {
  const el = document.querySelector(selector);
  if (!el) return;
  const posts = await loadPosts();
  renderList(posts, el);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#latest-posts')) mountLatest('#latest-posts', 6);
  if (document.querySelector('#all-posts')) mountAll('#all-posts');
});