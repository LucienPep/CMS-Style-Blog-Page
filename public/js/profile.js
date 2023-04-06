//Get values from handlebars file and send a POST method with data to create a new post in the database
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

//Take input data from handlebars and send it with POST method to create a new comment attached to the comment ID
const commentHandler = async (event) => {
  event.preventDefault();
  

  const id = event.submitter.form[1].id;
  const content = document.querySelector('#post-comment').value.trim();

  if (content) {
    const response = await fetch(`/api/post/comment/${id}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/comment/' + `${id}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

//find data id in event.target that is the post id and send DELETE method with this id
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    
    const id = event.target.getAttribute('data-id');
    console.log(id)

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

//find post by id and send PUT method to replace the data with the new data inputted via handlebars
const updateHandler = async (event) => {
 event.preventDefault();

 const id = event.submitter.form[2].id;
 const title = document.querySelector('#post-title').value.trim();
 const content = document.querySelector('#post-content').value.trim();

 if (title && content) {
   const response = await fetch(`/api/post/update/${id}`, {
     method: 'PUT',
     body: JSON.stringify({ title, content }),
     headers: {
       'Content-Type': 'application/json',
     },
   });

   if (response.ok) {
     document.location.replace('/profile');
   } else {
     alert('Failed to create post');
   }
 }
};

//Event listeners from handlebars files for each function and method
const newPostForm = document
  .querySelector('.new-post-form');
if(newPostForm){ 
  newPostForm.addEventListener('submit', newFormHandler);
}

const updatePostForm = document
  .querySelector('.update-post-form');
if(updatePostForm){
  updatePostForm.addEventListener('submit', updateHandler);
}

const commentPostForm = document
  .querySelector('.comment-post-form');
if(commentPostForm){
  commentPostForm.addEventListener('submit', commentHandler);
}

const delPostHandler = document
  .querySelector('.btn-danger');
if(delPostHandler){
  delPostHandler.addEventListener('click', delButtonHandler);
}