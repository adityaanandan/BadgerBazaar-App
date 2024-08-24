import React from 'react'
import Bucky from "../assets/badgerBazaar_logo.png"

import {useState} from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
    }
});



const Login = () => {
const [seePassword, setSeePassword] = useState(false)
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const toggleSeePassword = () => {
    setSeePassword(!seePassword);
    setSeeText(seePassword ? "See Password" : "Hide Password")
}

const handleLogin = (e) => {
    e.preventDefault()
    console.log("login")
}
const [seeText, setSeeText] = useState("see password")
return (
    <section class="bg-white">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold font-poppins">
          <img class="w-16 h-16 mr-2" src={Bucky} alt="logo" />
          BadgerBazaar    
      </a>
      <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gray-100 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-poppins font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium font-poppins ">Username</label>
                      <input onChange={(e) => setUsername(e.target.value)}  type="username" name="username" id="username" class="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="username" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium font-poppins ">Password</label>
                      {seePassword ? <input type="none"  onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required="" /> : <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required="" />}
                      <div className="flex mt-4">
                      <Checkbox className = "" onCheckedChange = {toggleSeePassword} id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 text-gray-400 font-poppins"
                        >
                            {seeText}
                        </label>
                      </div>
                  </div>
                  
                  <button type="submit" class="font-poppins w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-poppins font-light text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-blue-700 font-poppins hover:underline text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
            
)
}

export default Login