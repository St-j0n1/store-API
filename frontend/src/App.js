import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appRoutes from "./routes/AppRoutes";
import { StyleSheetManager } from "styled-components";

function App() {
  return (
    <div>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "isMainPage"}>
        <RouterProvider router={createBrowserRouter(appRoutes)} />
      </StyleSheetManager>
    </div>
  );
}

export default App;