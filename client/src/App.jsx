import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';
import Ask from './pages/Ask'
import Question from './pages/Question'
import { Routes, Route } from 'react-router-dom'
import QuestionDetail from './pages/QuestionDetail'
import AdminPage from './pages/AdminPage'
import Landing from './pages/Landing'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/questions' element={<Question />}/>
        <Route path='/ask-question' element={<Ask/>} />
        <Route path='/questions/:id' element={<QuestionDetail/>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
      
      
    </>
  )
}

export default App
