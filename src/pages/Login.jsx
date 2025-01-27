import { useState } from "react"
import { useAuth } from "../contexts/AuthContext";

const Login = () => {

  const { login } = useAuth();

  const initialData = {
    email: '',
    password: ''
  }

  const [formData, setFormData] = useState(initialData);

  const changeData = (key, value) => {
    setFormData(curr => ({...curr, [key]:value}))
  }


  return (
    <section>
      <div className="container mx-auto flex items-center justify-center h-screen">

        <form onSubmit={e => {login(e,formData)}} className="w-[800px] rounded-lg shadow-lg bg-slate-50">
          <h1 className="text-4xl text-center my-12">Login</h1>

          {/* Email */}
          <div className="flex justify-center flex-col gap-1 my-4 w-1/2 mx-auto">
          <label htmlFor="user_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input 
            type="email" 
            id="user_email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="email@email.it" 
            required 
            value={formData.email}
            onChange={e => {changeData('email', e.target.value)}}
          />
          </div>

          {/* Password */}
          <div className="flex justify-center flex-col gap-1 my-4 w-1/2 mx-auto">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input 
            type="password" 
            id="password" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Password" 
            required 
            value={formData.password}
            onChange={e => {changeData('password', e.target.value)}}
          />
          </div>

          <div className="flex justify-center items-center mx-auto my-12">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Login
            </button>
          </div>

        </form>

      </div>
    </section>
  )
}

export default Login;