import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias2 } = useQuiosco();
  // console.log("test2",categorias2.data)
  return (
    <>
      <Image
        width={300}
        height={100}
        src="/assets/img/logo_via.png"
        alt="Imagen Logotipo"
        className="mx-auto pt-12"
      />
          <nav className="mt-10 options">
            {/* {categorias.map((categoria) => (
              <Categoria key={categoria.id} categoria={categoria} />
            ))} */}
            
            {categorias2.data ?
              categorias2.data.map((categoria) => (
                <Categoria key={categoria.id} categoria={categoria} />
              )) : <></>
            }
          </nav>
    </>
  );
};

export default Sidebar;
