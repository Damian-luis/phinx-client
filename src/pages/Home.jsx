import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, useMediaQuery } from '@mui/material';
import PokemonCard from '../components/PokemonCard';
import BattleCard from '../components/BattleCard';
import useFetchPokemons from '../hooks/useFetchPokemons';
import useBattlePokemon from '../hooks/useBattlePokemon';
import BattleDetailsModal from '../components/BattleDetailsModal';
import WinnerModal from '../components/WinnerModal';
import PokemonCarousel from '../components/PokemonCarousel';
import { playBackgroundMusic, stopBackgroundMusic, playSelectPokemonSound, playBattleStartSound, stopBattleMusic, playVictorySound } from '../utils/soundManager';
import FloatingButtonWithDialog from '../components/Fab';
import combat from "../assets/combat.webp"
const Home = () => {
  const { pokemons, loading, error } = useFetchPokemons();
  const { startBattle, battleResult, loading: battleLoading, setBattleResult } = useBattlePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  /*useEffect(() => {
    playBackgroundMusic();
    return () => stopBackgroundMusic();
  }, []);*/

  const handleSelectPokemon = (pokemon) => {
    playSelectPokemonSound();
    setSelectedPokemon(pokemon);
    const randomOpponent = pokemons[Math.floor(Math.random() * pokemons.length)];
    setOpponentPokemon(randomOpponent);
    setBattleResult(null); 
  };

  const handleStartBattle = () => {
    if (selectedPokemon && opponentPokemon) {
      setBattleResult(null); 
      setWinner(null); 
      setWinnerModalOpen(false);
      stopBackgroundMusic();
      playBattleStartSound();
      startBattle(selectedPokemon.id, opponentPokemon.id).then(() => {
        setModalOpen(true);
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setWinnerModalOpen(false);
    setWinner(null);
    stopBattleMusic()
    //playBackgroundMusic(); 
  };

  const handleBattleComplete = () => {
    if (!winnerModalOpen) { 
      const winnerPokemon = battleResult.winnerId === selectedPokemon.id ? selectedPokemon : opponentPokemon;
      playVictorySound();
      stopBattleMusic();
      setWinner(winnerPokemon);
      setWinnerModalOpen(true);
    }
  };

  return (
    <div
    style={{
      backgroundImage: `url(${combat})`,
      backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        justifyContent: "center", 
        padding: "16px", 
       
    }}>
      <div style={{ marginBottom: '16px' }}>
  <Typography
    variant="h4"
    component="div"
    gutterBottom
    style={{
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '8px',
      borderRadius: '8px',
      display: 'inline-block',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    }}
  >
    Battle of Pokemon
  </Typography>
</div>
<div>
  <Typography
    variant="h6"
    component="div"
    gutterBottom
    style={{
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '8px',
      borderRadius: '8px',
      display: 'inline-block',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    }}
  >
    Select your pokemon
  </Typography>
</div>

      
      <PokemonCarousel pokemons={pokemons} onSelect={handleSelectPokemon} />
    
      {selectedPokemon && opponentPokemon && (
        <div
          style={{
            paddingTop: "50px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom:"50px"
          }}
        >
          <Grid container spacing={2} direction={isMobile ? "column" : "row"} alignItems="center" style={{ gap: isMobile ? "10px" : "0px" }}>
            <Grid item xs={5} style={{ width: isMobile ? "80%" : "auto" }}>
              <BattleCard pokemon={selectedPokemon} />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="success" onClick={handleStartBattle} disabled={battleLoading}>
                {battleLoading ? 'Battling...' : 'Start Battle'}
              </Button>
            </Grid>
            <Grid item xs={5} style={{ width: isMobile ? "80%" : "auto" }}>
              <BattleCard pokemon={opponentPokemon} />
            </Grid>
          </Grid>
        </div>
      )}
      {battleResult && (
        <BattleDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          battleResult={{ ...battleResult, pokemon1: selectedPokemon, pokemon2: opponentPokemon }}
          onBattleComplete={handleBattleComplete}
        />
      )}
      {winner && (
        <WinnerModal
          open={winnerModalOpen}
          onClose={handleCloseModal}
          winner={winner}
        />
      )}
      <FloatingButtonWithDialog />
    </div>
  );
};

export default Home;
