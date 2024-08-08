import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const useFetchBattleHistory = () => {
  const [battleHistory, setBattleHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBattleHistory = async () => {
      try {
        const response = await axiosInstance.get('/battle');
        setBattleHistory(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBattleHistory();
  }, []);

  return { battleHistory, loading, error };
};

export default useFetchBattleHistory;

