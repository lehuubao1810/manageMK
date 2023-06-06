import { createContext, useContext, useState, useEffect } from "react";

import { useAuth } from "./AuthContext";

const DataContext = createContext();

export function useData() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = database.ref("images");
                const snapshot = await imagesRef.once("value");
                const data = snapshot.val();
                if (data) {
                    const imageList = Object.entries(data).map(([key, value]) => ({
                        id: key,
                        ...value,
                    }));
                    setImages(imageList);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchImages();
    }, []);

    const value = {
        images,
        loading,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}