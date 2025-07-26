import React from 'react'
import Spline from '@splinetool/react-spline'

const Landing = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Spline
        scene="https://prod.spline.design/NIKCFlnKYF6OwKkY/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}

export default Landing

