import { createContext, useEffect, useContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [Loggedin, setLoggedin] = useState(false);
  const [role, setRole] = useState('');
  const [user, setuser] = useState();
  const [Fetched, setFetched] = useState(false);

  useEffect(() => {
    const CheckUser = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_MAIN_URL}users/me`, {
          withCredentials: true,
        });
        if (typeof data === 'object') {
          setuser(data);
          setRole(data?.role);
          setLoggedin(true);
        }
      } finally {
        setFetched(true);
      }
    };

    CheckUser();
  }, []);

 
  
  const login = async (email, password) => {
    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(data);

    localStorage.setItem('userId', data.data._id);
      setuser(data.data);
      setLoggedin(true); 
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setFetched(true);
    }
  };


  // const logout = async () => {
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_MAIN_URL}auth/logout`, {}, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     console.log('API Response:', response.data); 
  //     setUser(null);
  //     localStorage.removeItem('user');
  //     Cookies.remove('token');
  //     toast.success("Logout successful!");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //     toast.error("Logout failed. Please try again.");
  //   }
  // };

  return (
    <Auth.Provider 
     value={{
      setLoggedin,
      Loggedin,
      setRole,
      role,
      user,
      setuser,
      setFetched,
      login
    }}
  >
    {Fetched ? children : null}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
export const authenticated = () => useAuth().user != null;