import './App.css';
import {HelmetProvider} from "react-helmet-async";
import Routers from "./routes/Router";
import {Provider} from "react-redux";
import {store} from "./pages/Products/ProductsStore/Store";


function App() {
  return (
      <HelmetProvider>
          <Provider store={store}>
              <Routers/>
          </Provider>


      </HelmetProvider>

  );
}

export default App;
