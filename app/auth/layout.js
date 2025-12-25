import React from "react";

function Layout({ children }) {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full h-full bg-white rounded-none shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image / Testimonial */}
        <div className="hidden md:block relative -translate-x-8"> {/* Shift div left */}
          <img
            src="https://unitar.org/sites/default/files/media/image/african-american-woman-with-laptop-outdoors-2023-03-22-15-30-04-utc.jpg"
            alt="African trainee learning digital skills"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
            <p className="text-xl font-semibold leading-snug px-3">
              “KilimoHakika makes managing our farm data effortless and precise.”
            </p>
            <div className="mt-4 px-3">
              <p className="font-semibold">Daniel Albert</p>
              <p className="text-sm opacity-80">
                Director of Digital Marketing Technology
              </p>
            </div>
          </div>
        </div>

        {/* Right content / children */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;