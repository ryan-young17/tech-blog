const addComment = async (event) => {
    event.preventDefault();
    const comment = document.querySelector("#blog-comment");

    if (event.submitter.hasAttribute('data-id')) {
        const id = event.submitter.getAttribute('data-id');
        const response =  await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({
                post_id: id,
                comment_text: comment.value.trim()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to post comment');
        }
    }
};

document.querySelector('#commentForm').addEventListener('submit', addComment);