import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

const Categoria = ({ categoria}) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  const { nombre } = categoria.attributes;
  const { id } = categoria;
  console.log(categoriaActual)
  console.log("categoria",categoria)
  
  function resolutionViewer() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < 768) {
        hideCategories();
    }
  };
  function hideCategories() {
    let navbar = document.querySelector(".options");
    const classes = navbar.classList;
    const result = classes.replace("block", "hidden");
  }
  return (
    
    <div
      className={`${
        categoriaActual?.id === id ? "border-secondary-gold border-4" : ""
      } flex items-center gap-4 w-full border p-5 hover:`}
    >
      {/* <Image
        width={70}
        height={70}
        // src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen Icono"
      /> */}
      
      <button
        type="button"
        className="font-2xl font-extrabold tracking-wider hover:cursor-pointer"
        onClick={() => {
          handleClickCategoria(id)
          resolutionViewer()
        }}
      >
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
