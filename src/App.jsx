import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";

const App = () => {
return (
  <Routes>

    <Route path="/">

      <Route index element={<Login/>} />

    </Route>

    <Route path="/dashboard/:id" element={<Dashboard/>} />

  </Routes>
)
}

export default App;