const elPostList = document.querySelector('.post-list');

let postUsers = [];

async function fetchPosts() {
    elPostList.innerHTML = '';
    try {
        const [reqPosts, reqUsers] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        const posts = await reqPosts.json();
        const users = await reqUsers.json();

        postUsers = posts.map(post => {
            const user = users.find(u => u.id === post.userId);
            return { ...post, user }; 
        });

        postUsers.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.body}</p>
                <small>Author: ${item.user?.name || "Unknown"}</small>
            `;
            elPostList.appendChild(li);
        });

    } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
        elPostList.innerHTML = '<p style="color:red;">Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.</p>';
    }
}

fetchPosts();
