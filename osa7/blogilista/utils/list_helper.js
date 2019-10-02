
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLikes = (blogs) => {
  const mostLiked = blogs.reduce((a, b) => a.likes > b.likes ? a : b, 0)
  const blogObject = {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
  return blogObject
}

const mostBlogs = (blogs) => {
  var counts = {}
  var compare = 0
  var mostFrequent

  for(var i = 0; i < blogs.length; i++){
    var author = blogs[i].author;
 
    if(counts[author] === undefined){
       counts[author] = 1; 
    }else{    
       counts[author] += 1; 
    }
    if(counts[author] > compare){ 
       compare = counts[author]; 
       mostFrequent = author; 
    }
  }
  const blogObject = {
    author: mostFrequent,
    blogs: compare
  }

  return blogObject
}

const mostTotalLikes = (blogs) => {
  var counts = {}
  var compare = 0
  var mostFrequent

  for(var i = 0; i < blogs.length; i++){
    var author = blogs[i].author;
    var likes = blogs[i].likes;
 
    if(counts[author] === undefined){
       counts[author] = likes; 
    }else{    
       counts[author] += likes; 
    }
    if(counts[author] > compare){ 
       compare = counts[author]; 
       mostFrequent = author; 
    }
  }
  const blogObject = {
    author: mostFrequent,
    likes: compare
  }

  return blogObject
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  mostTotalLikes
}