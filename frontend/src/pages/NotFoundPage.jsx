import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className="text-center h-screen flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className = "text-yellow-400 text-6xl mb-4" />
      <h1 className="font-poppins  text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="font-poppins text-xl mb-5">This page does not exist</p>
      <Link
        to="/"
        className="font-poppins text-white bg-red-600 hover:bg-red-900 rounded-md px-3 py-2 mt-4"
        >Go Back</Link
      >
    </section>
  )
}

export default NotFoundPage