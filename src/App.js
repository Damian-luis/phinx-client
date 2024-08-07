import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import PokemonCard from './components/PokemonCard';
import BattleCard from './components/BattleCard';
import useFetchPokemons from './hooks/useFetchPokemons';
import useBattlePokemon from './hooks/useBattlePokemon';
import BattleDetailsModal from './components/BattleDetailsModal';
import WinnerModal from './components/WinnerModal';
import { playBackgroundMusic, stopBackgroundMusic, playSelectPokemonSound, playBattleStartSound, stopBattleMusic, playVictorySound } from './utils/soundManager';

const App = () => {
  const { pokemons, loading, error } = useFetchPokemons();
  const { startBattle, battleResult, loading: battleLoading, setBattleResult } = useBattlePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    //playBackgroundMusic();
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
      stopBackgroundMusic();
      playBattleStartSound();
      startBattle(selectedPokemon.id, opponentPokemon.id).then(() => {
        setModalOpen(true);
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    const winnerPokemon = battleResult.winnerId === selectedPokemon.id ? selectedPokemon : opponentPokemon;
    playVictorySound();
    stopBattleMusic()
    setWinner(winnerPokemon);
    setWinnerModalOpen(true);
  };

  const handleWinnerModalClose = () => {
    setWinnerModalOpen(false);
    playBackgroundMusic();
  };

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Battle of Pokemon
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        Select your pokemon
      </Typography>
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <Grid item xs={2} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} onSelect={handleSelectPokemon} />
          </Grid>
        ))}
      </Grid>
      {selectedPokemon && opponentPokemon && (
        <div 
        style={{
          paddingTop:"50px"
        }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <BattleCard pokemon={selectedPokemon} />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="success" onClick={handleStartBattle} disabled={battleLoading}>
                {battleLoading ? 'Battling...' : 'Start Battle'}
              </Button>
            </Grid>
            <Grid item xs={5}>
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
        />
      )}
      {winner && (
        <WinnerModal
          open={winnerModalOpen}
          onClose={handleWinnerModalClose}
          winner={winner}
        />
      )}
    </Container>
  );
};

export default App;
