export default handleChange = file => {
  setError(null)
  if (file[0].size > 5500000)
    return setError('file too large, supports maximum of 5MB')
  setImageLoading(true)
  const form = new FormData();
  form.append("file", file[0])
  form.append("upload_preset", "p3fwqgyn")
  fetch("https://api.cloudinary.com/v1_1/govtech/image/upload", {
    method: "post",
    mode: "cors",
    body: form
  }).then(res => res.json())
    .then(data => {
      const link = (`https://res.cloudinary.com/govtech/image/upload/v${data.version}/${data.public_id}.png`)
      setImageUrl(link)
      setImageLoading(false)
    })
    .catch(err => {
      setImageUrl(null)
      setError('An error occured while uploading image, try again')
      setImageLoading(false)
    })
};