import { useEffect } from "react";
import { Home } from "./pages/Home"
import { useCommentsStore } from "./store/store";



function App() {

useEffect(() => {
  // Aseguramos que al renderizar la url no se mantengan abiertos los recuadros de Reply
  useCommentsStore.getState().setOpenComment(false);
  useCommentsStore.getState().setOpenCommentId([]);
}, []);

  return (
    <>
      <Home/>
    </>
  )
}

export default App
