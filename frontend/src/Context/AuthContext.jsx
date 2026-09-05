import {
    createContext,
    useEffect,
    useRef,
    useState,
} from "react";

import API from "../Services/Api";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    const userRef = useRef(null);

    const setUser = (userData) => {
        userRef.current = userData;
        setUserState(userData);
    };

    const checkAuth = async () => {
        try {

            const response = await API.get("/profile");

            const loggedInUser = response.data.user;

            if (loggedInUser) {
                setUser(loggedInUser);
            }

        } catch (error) {

            // Don't remove an already logged-in user
            // because /profile returned 401.
            if (!userRef.current) {
                setUserState(null);
            }

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await API.post("/auth/logout");
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;