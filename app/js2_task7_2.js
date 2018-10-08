// Post
function Post(id, userId, title, body, comments) {
  this.id = id;
  this.userId = userId;
  this.title = title;
  this.body = body;
  this.comments = comments;
}

Post.prototype.render = function() {
  var commentsHtml = '';
  this.comments.forEach(function (item) {
    commentsHtml += '<p class="comment-item">' + item.body + '</p>';
  });

  return '<h3 class="post-title">' + this.title +'</h3>\
    <div class="post-content">\
      <p class="post-text">' + this.body + '</p>\
      <div class="comments-box">' + commentsHtml +'</div>\
    </div>';
}

var blog = new Blog();

blog.fetchPosts(function () {
  blog.fetchComments(function () {
    blog.renderPosts();
  });  
});

$('.add-post').on('click', function () {
  const title = $('.new-post-title').val();
  const text = $('.new-post-text').val();
  blog.addPost(title, text);
});

$('.search-button').on('click', function () {
  const title = $('.search').val();

  if (title) {
    blog.renderPostsByTitle(title);
  } else {
    blog.renderPosts();
  }
})