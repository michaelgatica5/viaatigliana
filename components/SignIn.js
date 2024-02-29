import Head from 'next/head';
import styles from '../styles/SignIn.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.replace('/');
      return;
    }
    alert('Credential is not valid');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
    <div className={`${styles.container} mx-auto p-4 bg-gray-100 rounded-lg shadow-md font-indiana`}>
      <Head>
        <title>Via Atigliana - Login</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className={`${styles.input} w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`} />
        <label htmlFor="password" className="mt-4">Contraseña</label>
        <input id="password" name="password" type="password" className={`${styles.input} w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500`} />
        <button type="submit" className={`${styles.button} w-full px-4 py-2 mt-4 bg-sky-400 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:bg-sky-400`}>
          Iniciar Sesión
        </button>
      </form>
    </div>
    </div>
  );
}

export default SignIn;