import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import AuthPage from "./middlewares/AuthPage";

const App = () => {
  return (
    <Routes>

      {/* Rotte pubbliche */}
      <Route path="/">

        <Route index element={<Login/>} />

      </Route>

      {/* Rotte private */}
      <Route element={<AuthPage />}>

       <Route path="/dashboard/:id" element={<Dashboard/>} />

      </Route>

    </Routes>
  )
}

export default App;