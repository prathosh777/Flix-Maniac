import React from 'react'
import { Link } from 'react-router-dom'

const Authbar = () => {
  return (
    <div><header className="max-w-8xl mx-auto flex items-center justify-between p-4">
    <Link className="flex" to={"/"}>
      <img
        className="w-40 "
        src="/Flix-shadow.png"
        alt="Flix Maniac logo"
      />
    </Link>
    <div className="flex items-center space-x-4">
      <Link
        to={"/login"}
        className="text-white w-[75px] bg-[#3077a3] py-1 px-2 rounded"
      >
        Sign In
      </Link>
      <Link
        to={"/signup"}
        className="text-white w-[75px]  bg-[#3077a3] py-1 px-2 rounded"
      >
        Sign Up
      </Link>{" "}
    </div>
  </header></div>
  )
}

export default Authbar