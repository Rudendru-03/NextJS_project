import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8 bg-[#252525]">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <div className="space-y-4 flex flex-col items-center">
        <Link href="/signup">
          <div className="bg-blue-500 text-white text-center py-2 px-4 w-80 rounded-full hover:bg-blue-600 transition duration-200 cursor-pointer">
            New User
          </div>
        </Link>
        <Link href="/signin">
          <div className="bg-green-500 text-white text-center py-2 px-4 w-80 rounded-full hover:bg-green-600 transition duration-200 cursor-pointer">
            Existing User
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
