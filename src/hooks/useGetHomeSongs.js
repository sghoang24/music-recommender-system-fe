import { useState, useEffect, useMemo, useContext } from "react";
import api from "api";
import { UserContext } from "context/UserContext";

const useGetHomeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    //console.log(state);
    const fetchSongs = async () => {
      try {
        if (state.token) {
          const response = await api.get('/api/track/recommendation-by-user/',{
            params: {
              'user_id': state.user.id
        }}
        );

          // const response = await api.get("/api/track/get-random");

          if (response.status === 200) {
            setSongs(response.data);
            setIsLoading(false);
          }
        } else {
          const response = await api.get("/api/track/get-random");

          if (response.status === 200) {
            setSongs(response.data);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
