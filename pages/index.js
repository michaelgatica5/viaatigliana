import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log("pasa por aqui");
      router.replace('/list');
    }
  }, [session, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Via Atigliana - Login</title>
      </Head>
      {!session && (
        <div>
          <h1>Not Authenticated</h1>
          <button onClick={() => router.push('/auth/sign-in')} className='bg-sky-400 px-3 py-2 rounded mt-2'>Sign In</button>
        </div>
      )}
    </div>
  );
}
