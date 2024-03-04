import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias2 } = useQuiosco();
  // console.log("test2",categorias2.data)
  function activateCategories() {
    let navbar = document.querySelector(".dropdownCategories");
    const classes = navbar.classList;
    const result = classes.replace("hidden", "block");
  }
  return (
    <>
      <Image
        width={300}
        height={100}
        src="/assets/img/logo_via.png"
        alt="Imagen Logotipo"
        className="mx-auto pt-12 px-2"
      />
      
      <button className="md:hidden font-bold border mt-10 w-full uppercase inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold  ring-gray-300 hover:bg-gray-50"
        onClick={() => {
          activateCategories()
        }}
      >opciones
      <svg class="-mr-1 h-5 w-5" viewBox="0 0 20 20" fill="primary-blue" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
      </button>
          <nav className="mt-10 block options dropdownCategories">
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
