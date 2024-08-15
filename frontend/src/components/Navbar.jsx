
const Navbar = (isActive = False) => {
    return (
      <nav className="bg-zinc-800">
        <div className="mx-auhref max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div
              className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
            >
              
              <div className="md:ml-auhref">
                <div className="flex space-x-2">
                  <a
                    href="/"
                    className= "font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >Home</a
                  >
                  <a
                    href="/stats"
                    className="font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >Items</a
                  >
                  <a
                    href="/picks"
                    className="font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >People</a
                  >
  
                  <a
                    href="/about"
                    className="font-poppins text-white text-xl hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >About</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      )
}

export default Navbar