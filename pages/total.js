import Layout from "@/layout/Layout";
import { useEffect, useCallback } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";
import { useSession } from "next-auth/react";

export default function Total() {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();
  console.log("pedido",pedido)
  const { data: session } = useSession();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina={"Total y Confirmar Pedido"}>
      <h1 className="text-4xl font-black">Datos y Total</h1>
      <p className="text-2xl my-10">Confirma tu Pedido a continuacion</p>
      <form onSubmit={colocarOrden}>
        <div>
          {session &&(
            <>
            <label
              htmlFor="nombre"
              className="block text-slate-800 uppercase font-bold  text-3xl"
            >
              Nombre
            </label>
            <span className="">{session.user.email}</span>
            </>
          )}
        </div>
        <div>
          <>
            <label
              htmlFor="nombre"
              className="block text-slate-800 uppercase font-bold  text-3xl">
              Mesa
            </label>
            <select>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
            </select>
          </>
        </div>
        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar {""}{" "}
            <span className="font-bold">${total}</span>
          </p>
        </div>
        <div>
          <input
            className={`${
              comprobarPedido()
                ? "bg-indigo-300 hover:cursor-not-allowed"
                : "bg-indigo-600 hover:cursor-pointer hover:bg-indigo-800"
            } mt-5 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold   text-white text-center  outline-none`}
            type="submit"
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
