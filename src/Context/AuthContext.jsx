import { createContext, useEffect, useContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from "../api/axios";
import { retryApiCall } from "../api/apiHelpers";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [Loggedin, setLoggedin] = useState(false);
  const [role, setRole] = useState('');
  const [user, setuser] = useState();
  const [Fetched, setFetched] = useState(false);

  useEffect(() => {
    const CheckUser = async () => {
      try {
        console.log('🔐 Checking user authentication...');
        
        const { data } = await retryApiCall(
          () => axios.get('users/me', { withCredentials: true }),
          2, // Only 2 retries for auth check
          500 // Shorter delay for auth
        );
        
        if (typeof data === 'object' && data) {
          console.log('✅ User authenticated:', data.role);
          setuser(data);
          setRole(data?.role);
          setLoggedin(true);
        } else {
          console.log('⚠️ No user data received');
          setLoggedin(false);
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error.message);
        console.error('Error details:', {
          status: error.response?.status,
          message: error.response?.data?.message,
          url: error.config?.url
        });
        
        // Don't show error toast for 401 (user not logged in)
        if (error.response?.status !== 401) {
          console.error('Unexpected authentication error');
        }
        
        setLoggedin(false);
        setuser(null);
        setRole('');
      } finally {
        setFetched(true);
      }
    };

    CheckUser();
  }, []);

 
  
  const login = async (email, password) => {
    try {
      console.log('🔑 Attempting login...');
      
      const {data} = await axios.post(
        'auth/login',
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
      
      console.log('✅ Login successful:', data);

      localStorage.setItem('userId', data.data._id);
      setuser(data.data);
      setRole(data.data.role);
      setLoggedin(true); 
      
      return { success: true, data: data.data };
    } catch (err) {
      console.error('❌ Login failed:', err);
      const errorMessage = err?.response?.data?.message || 'فشل تسجيل الدخول';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
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
    {Fetched ? children : (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p style={{ marginTop: '1rem' }}>جاري التحميل...</p>
      </div>
    )}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);
export const authenticated = () => useAuth().user != null;