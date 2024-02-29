import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
import Producto from "@/components/Producto";
import SignIn from "@/components/SignIn";
import Log from "@/components/Log";
import Image from "next/image";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */

export default function Home() {
  const { data: session } = useSession();
  const { categoriaActual } = useQuiosco();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);
  }, [session]);

  useEffect(() => {
    // Espera 3 segundos antes de mostrar el mensaje
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timer);
  }, []); 

  return (
    <>
    {
      session ?
        <Layout pagina={`Menu ${categoriaActual?.attributes?.nombre}`}>
          <Log/>
          <h1 className="text-4xl font-black">{categoriaActual?.attributes?.nombre}</h1>
          <p className="text-2xl my-10">
            Elige y personaliza tu pedido a continuación
          </p>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {categoriaActual?.productos?.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </div>
        </Layout>
        :
        <>
          {/* <Head>
            <title>Via Atigliana - Login</title>
            <meta name="description"/>
          </Head> */}
          {
            showLoading ?
            <div className='h-screen flex justify-center items-center'>
             {/* <Image
                className='h-min'
                src="/circle-loading-gif.webp"
                width={50}
                height={50}
                alt="Loading"
              /> */}
              <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#6c6c77" stroke-width="4"></circle>
                <path class="opacity-75" fill="blue" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
              
            : <SignIn></SignIn>
          }
        </>
    }
    </>
  );
}