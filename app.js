const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('search');
const filtersElement = document.getElementById('filters');
const countElement = document.getElementById('product-count');
const emptyElement = document.getElementById('empty-state');
let products = [];
let activeCategory = 'Todos';

function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function renderFilters() {
  const categories = ['Todos', ...new Set(products.map(product => product.category).filter(Boolean))];
  filtersElement.innerHTML = categories.map(category => `<button class="filter-button ${category === activeCategory ? 'active' : ''}" type="button" data-category="${safeText(category)}">${safeText(category)}</button>`).join('');
  filtersElement.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    renderFilters(); renderProducts();
  }));
}
function renderProducts() {
  const term = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const visible = products.filter(product => {
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const searchable = [product.title, product.subtitle, product.description, product.category, ...(product.specs || [])].join(' ').toLocaleLowerCase('pt-BR');
    return matchesCategory && searchable.includes(term);
  });
  countElement.textContent = `${visible.length} ${visible.length === 1 ? 'PRODUTO' : 'PRODUTOS'}`;
  emptyElement.hidden = visible.length !== 0;
  grid.innerHTML = visible.map(product => {
    const image = product.images?.[0] || '';
    const specs = (product.specs || []).map(spec => `<span class="spec">${safeText(spec)}</span>`).join('');
    return `<article class="product-card">
      <div class="product-image"><span class="category-tag">${safeText(product.category)}</span><img src="${safeText(image)}" alt="${safeText(product.title)}" loading="lazy"></div>
      <div class="product-info"><h3>${safeText(product.title)}</h3><p>${safeText(product.description)}</p><div class="specs">${specs}</div>
      <a class="offer-button" href="${safeText(product.affiliateUrl)}" target="_blank" rel="nofollow sponsored noopener">VER OFERTA NA AMAZON <span>↗</span></a>
      <div class="price-note">Preço e estoque sujeitos a alteração. Consulte a Amazon.</div></div>
    </article>`;
  }).join('');
}
async function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  try {
    const response = await fetch('products.json', {cache: 'no-store'});
    if (!response.ok) throw new Error('Não foi possível carregar o catálogo.');
    products = await response.json();
    renderFilters(); renderProducts();
  } catch (error) {
    grid.innerHTML = '<p class="empty-state">Não foi possível carregar os produtos. Verifique se o arquivo products.json está publicado junto com o site.</p>';
    console.error(error);
  }
}
searchInput.addEventListener('input', renderProducts);
init();
