const createPostFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector("#blog-title");
    const content = document.querySelector("#blog-content");
    
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            content: content.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create new post');
    }
};

document.querySelector('#create').addEventListener('submit', createPostFormHandler);