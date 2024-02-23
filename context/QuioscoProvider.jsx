import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias2, setCategorias2] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [productos, setProductos] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  // const obtenerCategorias = async () => {
  //   const { data } = await axios("./api/categorias");
  //   setCategorias(data);
  // };

  const obtenerCategorias2 = async () => {
    const { data } = await axios("https://via-atigliana.up.railway.app/api/categorias");
    setCategorias2(data);
    // console.log("data",data)
    // setCategoriaActual(data.data[0])
    // console.log("categoriaActual",categoriaActual)
    // setCategoriaActual([categoriaActual, data]);
  };

  const obtenerCatActual = async () => {
    const { data } = await axios("https://via-atigliana.up.railway.app/api/productos?populate=*")
    setProductos(data)
    const productsActuales = data.data.filter((cat) => cat.attributes.categoria.data.id === 1);
    setCategoriaActual(categorias2?.data?.[0]);
    setCategoriaActual(prevState => ({
      ...prevState,
      productos: productsActuales
    }));
    // console.log("CategoriaActual",categoriaActual)
    // setPedido([...pedido, producto]);

  };

  useEffect(() => {
    // obtenerCategorias();
    obtenerCategorias2()
  }, []);

  useEffect(() => {
    obtenerCatActual()
  }, [categorias2]);


  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.attributes.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    // const categoria = categorias.filter((cat) => cat.id === id);
    const category = categorias2.data.filter((cat) => cat.id === id);

    // Get productos

    const productsActuales = productos.data.filter((cat) => cat.attributes.categoria.data.id === id);
    setCategoriaActual(category?.data?.[0]);
    setCategoriaActual(prevState => ({
      ...category[0],
      productos: productsActuales
    }));
    
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      // Atualizar la cantidad

      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("Guardado Correctamente", { theme: "dark" });
    } else {
      setPedido([...pedido, producto]);
      toast.success("Agregado al Pedido", {
        theme: "dark",
      });
    }
    setModal(false);
  };

  const handleEditarCantidad = (id) => {
    const actualizarProducto = pedido.filter((producto) => producto.id === id);
    setProducto(actualizarProducto[0]);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      // Resetear la App
      console.log("categoriaActual",categoriaActual)
      setPedido([]);
      setNombre("");
      setTotal(0);
      toast.success("Pedido Realizado Correctamente");
      setTimeout(() => {  
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    console.log(pedido);
    console.log(nombre);
    console.log(total);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias2,
        categoriaActual,
        modal,
        producto,
        pedido,
        nombre,
        productos,
        handleClickCategoria,
        handleSetProducto,
        handleChangeModal,
        handleAgregarPedido,
        handleEditarCantidad,
        handleEliminarProducto,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
