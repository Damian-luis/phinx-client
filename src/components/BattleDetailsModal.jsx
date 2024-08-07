import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Grid, useMediaQuery } from '@mui/material';
import BattleCard from './BattleCard';
import SwordAnimation from './SwordAnimation';
import { playAttackSound, stopBattleMusic, playBackgroundMusic } from '../utils/soundManager';

const BattleDetailsModal = ({ open, onClose, battleResult, onBattleComplete }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [swordVisible, setSwordVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Definimos turns, pokemon1, pokemon2 fuera del chequeo para evitar el error
  const turns = battleResult ? battleResult.turns : [];
  const pokemon1 = battleResult ? battleResult.pokemon1 : null;
  const pokemon2 = battleResult ? battleResult.pokemon2 : null;
  const winnerName = battleResult ? battleResult.winnerName : '';
  
  useEffect(() => {
    if (open) {
      setCurrentTurn(0);
      setSwordVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (!swordVisible && currentTurn === turns.length - 1 && open) {
      onBattleComplete();
    }
  }, [swordVisible, currentTurn, turns.length, onBattleComplete, open]);

  useEffect(() => {
    if (!open) {
      stopBattleMusic();
      playBackgroundMusic(); // Reanudar la música de fondo cuando se cierre el modal de batalla
    }
  }, [open]);

  if (!battleResult || !pokemon1 || !pokemon2) {
    return null;
  }

  const { attacker, defender, damage, attackerRemainingHp, defenderRemainingHp } = turns[currentTurn];

  const handleNextTurn = () => {
    setSwordVisible(true);
    playAttackSound();
  };

  const handleSwordAnimationComplete = () => {
    setSwordVisible(false);
    if (currentTurn < turns.length - 1) {
      setCurrentTurn(currentTurn + 1);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth={true}
    >
      <SwordAnimation isVisible={swordVisible} onComplete={handleSwordAnimationComplete} />
      <DialogTitle>Battle Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          {attacker ? `${attacker} va a atacar` : 'Estado inicial de la batalla'}
        </Typography>
        <Grid
          container
          spacing={2}
          direction={isMobile ? 'column' : 'row'}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={isMobile ? 12 : 5} style={isMobile ? { textAlign: 'center', width: '100%' } : {}}>
            <BattleCard
              pokemon={pokemon1}
              currentHp={attacker === pokemon1.name ? attackerRemainingHp : defenderRemainingHp}
              style={{ width: isMobile ? '100%' : 'auto' }}
            />
          </Grid>
          <Grid item xs={isMobile ? 12 : 2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6" align="center">VS</Typography>
          </Grid>
          <Grid item xs={isMobile ? 12 : 5} style={isMobile ? { textAlign: 'center', width: '100%' } : {}}>
            <BattleCard
              pokemon={pokemon2}
              currentHp={attacker === pokemon2.name ? attackerRemainingHp : defenderRemainingHp}
              style={{ width: isMobile ? '100%' : 'auto' }}
            />
          </Grid>
        </Grid>
        <div style={{ paddingTop: '20px', textAlign: 'center' }}>
          {currentTurn < turns.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleNextTurn} disabled={swordVisible}>
              Atacar
            </Button>
          ) : (
            <Typography variant="h6">Ganador: {winnerName}</Typography>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BattleDetailsModal;









