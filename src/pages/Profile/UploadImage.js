import React, { useState, useEffect } from "react";
import { Input, Alert, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { changeSettings } from "../../redux/actions/authActions"

const { Search } = Input

const UploadImage = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const serverError = useSelector(state => state.error)
  const [imageUrl, setImageUrl] = useState(user.image)
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (serverError.id === 'CHANGE_SETTINGS_FAILED') {
      setError(serverError.msg)
    }
  }, [serverError])

  const handleChange = file => {
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

  const submit = () => {
    setError(null)
    if (!password || !imageUrl) {
      setError('Enter your password')
    } else {
      const data = {
        userId: user._id,
        type: 'dataChange',
        profilePic: imageUrl,
        password
      }
      dispatch(changeSettings(data))
      setTimeout(() => {
        onClose()
      }, 2500);
    }
  }

  const onPassword = (e) => {
    setError(null)
    setPassword(e.target.value)
  }

  return (
    <div className='upload_image_con'>
      {error && <Alert className="alert" message={error} type="error" closable onClose={() => setError(null)} />}
      {imageUrl && <img src={imageUrl} alt='avatar' className='upload_image' />}
      {imageLoading ? <LoadingOutlined /> : <input accept='image/*' type="file" onChange={(e) => handleChange(e.target.files)} />}
      <Space direction="vertical">
        <Search
          value={password}
          type='password'
          placeholder='Enter your password'
          onChange={onPassword}
          enterButton="Upload picture"
          onSearch={submit}
        />
      </Space>
    </div>
  );
}

export default UploadImage;