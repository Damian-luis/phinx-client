import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, useMediaQuery } from '@mui/material';
import PokemonCard from './components/PokemonCard';
import BattleCard from './components/BattleCard';
import useFetchPokemons from './hooks/useFetchPokemons';
import useBattlePokemon from './hooks/useBattlePokemon';
import BattleDetailsModal from './components/BattleDetailsModal';
import WinnerModal from './components/WinnerModal';
import PokemonCarousel from './components/PokemonCarousel';
import { playBackgroundMusic, stopBackgroundMusic, playSelectPokemonSound, playBattleStartSound, stopBattleMusic, playVictorySound } from './utils/soundManager';

const App = () => {
  const { pokemons, loading, error } = useFetchPokemons();
  const { startBattle, battleResult, loading: battleLoading, setBattleResult } = useBattlePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    playBackgroundMusic();
    return () => stopBackgroundMusic();
  }, []);

  const handleSelectPokemon = (pokemon) => {
    playSelectPokemonSound();
    setSelectedPokemon(pokemon);
    const randomOpponent = pokemons[Math.floor(Math.random() * pokemons.length)];
    setOpponentPokemon(randomOpponent);
    setBattleResult(null); // Reset battle result when a new Pokemon is selected
  };

  const handleStartBattle = () => {
    if (selectedPokemon && opponentPokemon) {
      setBattleResult(null); // Reset battle result
      setWinner(null); // Reset winner state
      setWinnerModalOpen(false); // Reset winner modal state
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
    playBackgroundMusic(); // Reanudar la música de fondo
  };

  const handleBattleComplete = () => {
    if (!winnerModalOpen) { // Verificamos que el modal de ganador no esté ya abierto
      const winnerPokemon = battleResult.winnerId === selectedPokemon.id ? selectedPokemon : opponentPokemon;
      playVictorySound();
      stopBattleMusic();
      setWinner(winnerPokemon);
      setWinnerModalOpen(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Battle of Pokemon
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Select your pokemon
      </Typography>
      
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
    </Container>
  );
};

export default App;





