import LayoutMainEmployerAdmin from "../layouts/employersAdmin";
import AddInfo from "../pages/addInfo";
import AddSheet from "../pages/addSheet";
import Home from "../pages/home";
import ManageInfo from "../pages/manageInfo";
import ManageSheet from "../pages/manageSheet";
import NotFound from "../pages/notFound";
import PrintSheet from "../pages/printSheet";


export const routes = [
  //client
  {
    path: "/",
    element: <LayoutMainEmployerAdmin />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "add-info",
        element: <AddInfo />
      },
      {
        path: "manage-info",
        element: <ManageInfo />
      },
      {
        path:"add-sheet",
        element: <AddSheet />
      },
      {
        path: "manage-sheet",
        element: <ManageSheet />
      },
      {
        path: "print-sheet",
        element: <PrintSheet />
      },
      {
        path:"*",
        element: <NotFound />
      }
    ]
  },
  
];
