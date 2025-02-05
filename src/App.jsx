import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboard";
import AuthPage from "./middlewares/AuthPage";
import DefaultLayout from "./layouts/DefaultLayout";

const App = () => {
  return (
    <Routes>

      <Route element={<DefaultLayout />}>

        {/* Rotte pubbliche */}
        <Route path="/">

          <Route index element={<Login />} />

        </Route>

        {/* Rotte private */}
        <Route element={<AuthPage />}>

          <Route path="/dashboard/:id" element={<Dashboard/>} />

        </Route>
        
      </Route>

    </Routes>
  )
}

export default App;