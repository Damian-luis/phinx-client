// src/hooks/useFetchPokemons.js
import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useFetchPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/pokemon');
        setPokemons(response.data);
      } catch (err) {
        console.log(err)
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pokemons, loading, error };
};

export default useFetchPokemons;
