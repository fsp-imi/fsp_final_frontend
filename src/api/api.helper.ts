export const getContentType = () => ({
  "Content-Type": "application/json",
})

export const errorCatch = (error: any): string => {
  const message = error?.message?.data?.message

  return message
    ? typeof error.response.data.messsage === "object"
      ? message[0]
      : message
    : error.message
}
