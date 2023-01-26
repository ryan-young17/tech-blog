const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-title");
    const content = document.querySelector("#blog-content");

    if(event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response =  await fetch(`/api/posts/${id}`, {
            method: 'PUT',
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
            alert('Failed to update post');
        }
    }
}

document.querySelector('#editPostForm').addEventListener('submit', updatePost);