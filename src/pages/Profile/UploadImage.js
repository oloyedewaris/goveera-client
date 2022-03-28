import React, { useState, useEffect } from "react";
import { Input, Alert, Space, Progress } from 'antd';
import { LinkOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from "../../util/firebase"
import { changeSettings } from "../../redux/actions/authActions"
import toastInstance from "../../util/toastInstance";
import ToastComponent from "../../components/ToastComponent/ToastComponent";

const { Search } = Input

const UploadImage = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const serverError = useSelector(state => state.error)
  const [imageUrl, setImageUrl] = useState(user.image)
  const [imageLoading, setImageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (serverError.id === 'CHANGE_SETTINGS_FAILED') {
      setError(serverError.msg)
    }
  }, [serverError])

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageLoading(true)
    console.log(image)
    if (!image) {
      setImageLoading(false)
      return
    }
    const storageRef = ref(storage, `/files/${Date.now()}/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(prog)
      },
      err => {
        setError('An error occurred while uploading image, try again')
        setImageLoading(false)
        console.log('err', err)
      },
      () => {
        setImageLoading(false)
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => setImageUrl(url))
          .catch(err => setError("Can't get image link try again"))
      })
  }

  const submit = () => {
    setError(null)
    if (!password || !imageUrl)
      return setError('Upload an image and enter password')
    const data = {
      userId: user._id,
      type: 'dataChange',
      profilePic: imageUrl,
      password
    }
    dispatch(changeSettings(data)(() => {
      setImageUrl(null)
      toastInstance('Image Uploaded')
      onClose()
    }))
  }

  const onPassword = (e) => {
    setError(null)
    setPassword(e.target.value)
  }

  return (
    <div className='upload_image_con'>
      {error && <Alert className="alert" message={error} type="error" closable onClose={() => setError(null)} />}
      {imageUrl && <img src={imageUrl} alt='avatar' className='upload_image' />}
      {imageLoading && <Progress type='circle' percent={progress} width={80} />}
      {imageUrl &&
        <Alert className="alert" message='Image uploaded, enter password to continue' type="success" closable />}
      <Space direction="vertical">
        <Search
          value={password}
          type='password'
          placeholder='Enter your password'
          onChange={onPassword}
          enterButton={
            imageUrl ? 'Upload' :
              <label>
                <input style={{ display: 'none' }} accept='image/*' type="file" onChange={handleImageAsFile} />
                <LinkOutlined size={20} />
              </label>
          }
          onSearch={imageUrl && submit}
        />
      </Space>
      <ToastComponent />
    </div>
  );
}

export default UploadImage;