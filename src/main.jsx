import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header.jsx'
import HomePage from './HomePage.jsx'
import Footer from './Footer.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <HomePage />
    <Footer />
  </React.StrictMode>,
)
