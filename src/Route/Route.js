import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Chats from "../Components/Chats/Chats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/chat",
    element: <Chats></Chats>,
  },
]);

export default router;
