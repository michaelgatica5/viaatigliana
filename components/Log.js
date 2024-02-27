import React, { useState } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link'

function Log() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const closeUserInfo = () => {
    setShowUserInfo(false);
  };

  const handleSignOut = async () => {
    await signOut();
    console.log("Signed out");
    router.push('auth/sign-in');
  };

  return (
    <nav className='fixed bottom-10 right-10'>
      <div className='relative'>
        <button
          onClick={toggleUserInfo}
          className='bg-slate-500 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none'
        >
        </button>
        <Link href="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg></Link>
        {showUserInfo && session && (
          <div className='absolute bottom-0 right-0 bg-white rounded shadow p-4'>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <button
              onClick={handleSignOut}
              className='bg-sky-400 px-3 py-2 rounded mt-2'
            >
              Sign Out
            </button>
            <button
              onClick={closeUserInfo} 
              className='text-gray-400 hover:text-gray-600 absolute top-0 right-0 mt-1 mr-1'
            >
              X
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Log;
