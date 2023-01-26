const addComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#blog-comment");

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response =  await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({
                post_id: id,
                comment: comment.value.trim()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to post comment');
        }
    }
};

document.querySelector('#commentForm').addEventListener('submit', addComment);