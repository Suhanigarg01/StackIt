import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Ask from './pages/Ask'
import Question from './pages/Question'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/ask-question' element={<Ask/>} />
        <Route path='/question/:id' element={<Question/>} />
      </Routes>
      <Footer />
      
    </>
  )
}

export default App
