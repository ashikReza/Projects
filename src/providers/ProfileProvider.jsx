/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";
import { ProfileContext } from "../context";
import { initialState, profileReducer } from "../reducers/ProfileReducer";

const ProfileProvider = ({ children }) => {
    // Retrieve profile state from local storage or use initial state if not available
    const [state, dispatch] = useReducer(profileReducer, initialState, () => {
        const storedProfile = localStorage.getItem("profile");
        return storedProfile ? JSON.parse(storedProfile) : initialState;
    });

    // Store profile state in local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("profile", JSON.stringify(state));
    }, [state]);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
