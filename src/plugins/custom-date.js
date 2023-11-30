const formatDate = date => {
  if (!date) return null
  date=new Date(date)
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}



export default formatDate
