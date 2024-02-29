import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
import Producto from "@/components/Producto";
import SignIn from "@/components/SignIn";
import Log from "@/components/Log";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */

export default function Home() {
  const { data: session } = useSession();
  const { categoriaActual } = useQuiosco();

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);
  }, [session]);

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
          <SignIn></SignIn>
        </>
    }
    </>
  );
}