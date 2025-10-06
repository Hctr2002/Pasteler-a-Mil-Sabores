/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

const initial = {nombre: "", email: "", telefono: "", direccion: ""};

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useLocalStorage("ds_profile", initial);

    const updateProfile = (patch) => useLocalStorage(p => ({...p, ...patch}));

    const value = {profile, updateProfile};

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};