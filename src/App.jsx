import { RouteProvider } from "./contexts/RouteContext";
import PackageRoutes from "./routes/PackageRoutes";


const App = () => {
  return (
    <RouteProvider>

      <PackageRoutes />
      
    </RouteProvider>
  )
}

export default App;