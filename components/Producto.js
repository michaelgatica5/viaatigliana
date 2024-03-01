import Image from "next/image";
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

const Producto = ({ producto }) => {
  // console.log("Productito", producto)
  const { handleSetProducto, handleChangeModal } = useQuiosco();
  const { nombre, precio, activo } = producto.attributes;
  return (
    activo && precio ?
      <div className="border p-3">
        {/* <Image
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen Platillo ${nombre}`}
          width={400}
          height={500}
        /> */}
        <div className="p-5">
          <h3 className="text-2xl font-bold">{nombre}</h3>
          <p className="mt-5 font-black text-4xl text-secondary-gold">
            {/* {formatearDinero(precio)} */}
            {"$" + precio}
          </p>
          <button
            type="button"
            className="bg-primary-blue hover: text-white w-full mt-5 p-3 uppercase font-bold"
            onClick={() => {
              handleChangeModal();
              handleSetProducto(producto);
            }}
          >
            Agregar
          </button>
        </div>
      </div> : <></>
  );
};

export default Producto;
