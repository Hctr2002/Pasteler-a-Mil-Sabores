import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);

const initial = { nombre: "", email: "", telefono: "", direccion: "", admin: false };

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useLocalStorage("ds_profile", initial);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Cargar perfil del backend si hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !profile.email && !initialized) {
      loadProfile();
    }
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await authService.getProfile();
      const profileData = {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || "",
        direccion: data.direccion || "",
        admin: data.admin || false
      };
      setProfile(profileData);
      return profileData;
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      // Si falla, limpiar el token inválido
      if (error.response?.status === 401) {
        authService.logout();
        setProfile(initial);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (patch, showToast = true) => {
    const token = localStorage.getItem("token");
    
    // Actualizar el estado local inmediatamente
    setProfile((prev) => ({ ...prev, ...patch }));
    
    // Si hay token y el patch incluye campos que se deben actualizar en el backend
    if (token && (patch.nombre || patch.telefono !== undefined || patch.direccion !== undefined || patch.password)) {
      try {
        setLoading(true);
        await authService.updateProfile(patch);
        if (showToast) {
          toast.success('Perfil actualizado exitosamente');
        }
      } catch (error) {
        console.error('Error al actualizar perfil:', error);
        toast.error(error.response?.data?.message || 'Error al actualizar perfil');
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const logout = () => {
    authService.logout();
    setProfile(initial);
  };

  const value = { profile, updateProfile, logout, loading, loadProfile };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}