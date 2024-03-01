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
      <div className={`mx-auto p-4 border-2 border-primary-blue rounded-lg shadow-md font-indiana`}>
        <Head>
          <title>Via Atigliana - Login</title>
        </Head>
        <h1 className="text-2xl font-bold mb-4 text-primary-blue">Iniciar Sesión</h1>
        <form className={`${styles.form}`} onSubmit={onSubmit}>
          <label htmlFor="email" className='text-primary-blue'>Email</label>
          <input id="email" name="email" type="email" className={`${styles.input} w-full px-4 py-2 mt-2 border border-primary-blue rounded-md focus:outline-none focus:border-blue-500`} />
          <label htmlFor="password" className="mt-4 text-primary-blue">Contraseña</label>
          <input id="password" name="password" type="password" className={`${styles.input} w-full px-4 py-2 mt-2 border border-primary-blue rounded-md focus:outline-none focus:border-blue-500`} />
          <button type="submit" className={`${styles.button} w-full px-4 py-2 mt-4 bg-secondary-gold text-white font-bold rounded-md focus:outline-none focus:bg-sky-400`}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;