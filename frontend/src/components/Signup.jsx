import React from 'react'
import Bucky from "../assets/badgerBazaar_logo.png"

const Signup = () => {
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
                  Sign Up 
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium font-poppins ">Username</label>
                      <input type="username" name="username" id="username" class="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="username" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium font-poppins ">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required="" />
                  </div>

                  <div>
                        <label for="confirm" class="block mb-2 text-sm font-medium font-poppins ">Confirm Password</label>
                        <input type="confirm" name="confirm" id="confirm" placeholder="••••••••" class="rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"  required="" />
                  </div>
                  
                  <button type="submit" class="font-poppins w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign up</button>
                  <p class="text-sm font-poppins font-light text-gray-400">
                      Have an account? <a href="#" class="font-medium text-blue-700 font-poppins hover:underline text-primary-500"> Sign in</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Signup