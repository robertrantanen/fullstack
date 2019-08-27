
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLikes = (blogs) => {
  const mostLiked = blogs.reduce((a, b) => a.likes > b.likes ? a : b, 0)
  return mostLiked.title
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}