const truncString = (string, max) => {
  const introMessage = string
  const truncMessage = string.substring(0, Number(max)).concat('...')
  return introMessage.length < Number(max) + 2 ? introMessage : truncMessage
}

export default truncString