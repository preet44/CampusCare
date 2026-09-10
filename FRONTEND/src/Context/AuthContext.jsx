import { createContext, useEffect, useRef, useState } from "react";
import API from "../Services/Api";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    // Keeps track of the latest logged-in user
    // and prevents an old /profile request from
    // clearing the newly logged-in user.
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

            /*
             * If there is no logged-in user, then
             * clearing the user is correct.
             *
             * But if the user has just logged in,
             * don't let an older /profile request
             * remove that user.
             */

            if (!userRef.current) {
                setUser(null);
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

            console.log(
                error.response?.data
            );

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