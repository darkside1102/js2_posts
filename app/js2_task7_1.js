function Blog() {
  this.comments = [];
  this.posts = [];
  this.titles = [];
}

Blog.prototype.fetchPosts = function (cb) {
  var self = this;
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'GET'
  })
  .done(function (posts) {
    var titles = [];
    posts.forEach(function (item) {
      titles.push(item.title);
    });

    self.titles = titles;
    self.posts = posts;

    cb();
  });
};

Blog.prototype.fetchComments = function (cb) {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/comments',
    type: 'GET',
    context: this
  })
  .done(function (comments) {
    this.comments = comments;
    cb();
  });
};

Blog.prototype.filterCommentsByPostId = function (id) {
  var matchComments = [];

  this.comments.forEach(function (item) {
    if (item.postId == id) {
      matchComments.push(item);
    }
  });

  return matchComments;
}

Blog.prototype.addPost = function (title, text) {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/comments',
    type: 'POST',
    context: this,
    data: {
      body: text,
      title: title
    }
  })
  .done(function (newPost) {
    this.posts.push(newPost);
    this.titles.push(title);
    this.renderPosts();
  });
}

Blog.prototype.renderPostsByTitle = function (title) {
  var posts = [];
  this.posts.forEach(function (item) {
    if (item.title == title) {
      posts.push(item);
    }
  });

  this.renderPosts(posts);
}

Blog.prototype.renderPosts = function (list) {
  var self = this;
  var posts = list;

  if (!posts) {
    posts = this.posts;
  }

  $('.posts').html('');

  var inner = $('<div/>', {
    class: 'posts-inner'
  });

  inner.appendTo('.posts');
  posts.forEach(function (item) {
    var filteredComments = self.filterCommentsByPostId(item.id);
    var post = new Post(item.id, item.userId, item.title, item.body, filteredComments);
    var element = post.render();
    $('.posts-inner').append(element);
  });

  $('.posts-inner').accordion({
     collapsible: true
  });
  $('.search').autocomplete({
    source: this.titles
  });
}

