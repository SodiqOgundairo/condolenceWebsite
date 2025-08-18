import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './App.tsx'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Main = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }, [])

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Main />)
