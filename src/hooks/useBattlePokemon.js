// src/hooks/useBattlePokemon.js
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useBattlePokemon = () => {
  const [battleResult, setBattleResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startBattle = async (pokemon1Id, pokemon2Id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/battle', {
        pokemon1Id,
        pokemon2Id,
      });
      console.log(response)
      setBattleResult(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { battleResult, startBattle, loading, error , setBattleResult};
};

export default useBattlePokemon;
