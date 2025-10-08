import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProfileContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);

const initial = { nombre: "", email: "", telefono: "", direccion: "" };

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage("ds_profile", initial);

  const updateProfile = (patch) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  const value = { profile, updateProfile };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}