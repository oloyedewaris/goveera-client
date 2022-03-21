let BACKEND_URL;

if (process.env.NODE_ENV === 'development')
  BACKEND_URL = "http://localhost:5000"
else BACKEND_URL = "https://goveera-server.herokuapp.com"

export { BACKEND_URL }
