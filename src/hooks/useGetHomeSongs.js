import { useState, useEffect, useMemo, useContext } from "react";
import api from "api";
import { UserContext } from "context/UserContext";

const useGetHomeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        if (state.token && state.token !== "null") {
          const response = await api.get("/api/track/recommendation-by-user/", {
            params: {
              user_id: state.user.id,
            },
          });
  
          if (response.status === 200  && response.data.list_tracks.length > 0) {
            setSongs(response.data.list_tracks);
            setIsLoading(false);
          } else {
            const response = await api.get("/api/track/get-random");
            if (response.status === 200) {
              setSongs(response.data.list_tracks);
              setIsLoading(false);
            }
          }
        } else {
          const response = await api.get("/api/track/get-random");
          if (response.status === 200) {
            setSongs(response.data.list_tracks);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSongs();
  }, [state.token, state.preferences]);

  return useMemo(
    () => ({
      isLoading,
      songs,
    }),
    [isLoading, songs]
  );
};

export default useGetHomeSongs;