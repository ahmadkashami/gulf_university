const formatDate = date => {
  if (!date) return null

  date=new Date();

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}



export default formatDate
