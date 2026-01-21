let currentCategory = 'all';
let currentSearch = '';

function displayPosts(postsToDisplay) {
    const postsContainer = document.getElementById('postsContainer');
    const noResults = document.getElementById('noResults');

    if (postsToDisplay.length === 0) {
        postsContainer.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    postsContainer.innerHTML = postsToDisplay.map(post => `
        <div class="post-card" data-category="${post.category}">
            <span class="category">${formatCategory(post.category)}</span>
            <h3>${post.title}</h3>
            <p class="excerpt">${post.excerpt}</p>
            <div class="meta">
                <span class="date">${post.date}</span>
                <span class="read-more">${post.readTime}</span>
            </div>
        </div>
    `).join('');
}

function formatCategory(category) {
    return category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function filterPosts() {
    let filteredPosts = posts;

    if (currentCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
    }

    if (currentSearch) {
        filteredPosts = filteredPosts.filter(post => {
            const searchLower = currentSearch.toLowerCase();
            return post.title.toLowerCase().includes(searchLower) ||
                   post.excerpt.toLowerCase().includes(searchLower) ||
                   post.category.toLowerCase().includes(searchLower);
        });
    }

    displayPosts(filteredPosts);
}

document.addEventListener('DOMContentLoaded', function() {
    displayPosts(posts);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            filterPosts();
        });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        currentSearch = e.target.value;
        filterPosts();
    });
});
