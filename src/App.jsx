import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from "react-router-dom"
import { 
  QueryClient,
  QueryClientProvider, 
} from "react-query"
import Layout from "./components/layout"
import Home from "./pages/home";
import Cryptos from "./pages/Cryptos";
import CryptoNews from "./pages/CryptoNews";
import CryptoDetails from "./components/CryptoDetails";

const queryClient = new QueryClient()

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="cryptocurrencies" element={<Cryptos />} />
    <Route path="cryptocurrencies/:uuid" element={<CryptoDetails />} />
    <Route path="news" element={<CryptoNews />} />
  </Route>
));


function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;
