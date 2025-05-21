"use client"

import React from "react";



const WelcomePage = () => {
    
  
    return (
      <div className="max-w-3xl mx-auto mt-20 p-8 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome Admin 🎉
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-500">Email</p>
            <p className="font-semibold">admin@email.com</p>
          </div>
          {/* <div>
            <p className="text-sm text-zinc-500">Phone</p>
            <p className="font-semibold">{userInfo?.phone}</p>
          </div> */}
          <div>
            <p className="text-sm text-zinc-500">Role</p>
            <p className="font-semibold capitalize">Admin</p>
          </div>
        
        </div>
      </div>
    );
}

export default WelcomePage
