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
    /*Purpose: Updates the logged-in user's data in two places.

userData → new user information.
userRef.current = userData → stores user data in useRef, which stays available without causing a re-render.
setUserState(userData) → updates React state, so the UI re-renders with the new user information.*/


    const checkAuth = async () => {

        try {

            const response = await API.get("/profile");

            const loggedInUser = response.data.user;

            if (loggedInUser) {
                setUser(loggedInUser);
            }

        } catch (error) {

            if (!userRef.current) {
                setUser(null);
            }

        } finally {

            setLoading(false);

        }
    };
/*checkAuth()
Checks whether the user is already logged in.
API.get("/profile") → asks backend for the logged-in user's details.
response.data.user → gets user information.
If user exists → setUser(loggedInUser).
If request fails and no user is stored → setUser(null).
finally → setLoading(false) after the check is complete.*/

    useEffect(() => {
        checkAuth();
    }, []);
/*Runs checkAuth() once when the component loads because dependency array [] is empty.*/

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

/*logout()
Sends POST /auth/logout to the backend.
Backend removes/clears the authentication cookie.
finally → setUser(null) to clear the user from React state.*/

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