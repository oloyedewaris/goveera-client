import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom'

function ScrollToTop(props) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>{props.children}</>
  )
}

export default ScrollToTop
