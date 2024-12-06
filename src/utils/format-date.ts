export const formatDate = (date: string | Date, withDash: boolean = false) => {
  const dateObj = new Date(date)
  if (!isNaN(dateObj.getTime())) {
    const day = dateObj.getDate().toString().padStart(2, "0")
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0")
    const year = dateObj.getFullYear()

    if (withDash) return `${day}-${month}-${year}`

    return `${day}${month}${year}`
  }
  return ""
}

export const convertDate = (date: string) => {
  const day = date[0] + date[1]
  const month = date[2] + date[3]
  const year = date[4] + date[5] + date[6] + date[7]

  return `${day}-${month}-${year}`
}
