import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Grid } from '@mui/material';
import BattleCard from './BattleCard';
import SwordAnimation from './SwordAnimation';
import { playAttackSound } from '../utils/soundManager';
const BattleDetailsModal = ({ open, onClose, battleResult }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [swordVisible, setSwordVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setCurrentTurn(0);
      setSwordVisible(false);
    }
  }, [open]);

  if (!battleResult) return null;

  const { turns, winnerName, pokemon1, pokemon2 } = battleResult;

  if (!pokemon1 || !pokemon2) return null;

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
    <Dialog open={open} onClose={onClose}>
      <SwordAnimation isVisible={swordVisible} onComplete={handleSwordAnimationComplete} />
      <DialogTitle>Battle Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          {attacker ? `${attacker} va a atacar` : 'Estado inicial de la batalla'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <BattleCard
              pokemon={pokemon1}
              currentHp={attacker === pokemon1.name ? attackerRemainingHp : defenderRemainingHp}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" align="center">VS</Typography>
          </Grid>
          <Grid item xs={5}>
            <BattleCard
              pokemon={pokemon2}
              currentHp={attacker === pokemon2.name ? attackerRemainingHp : defenderRemainingHp}
            />
          </Grid>
        </Grid>
        {attacker && (
          <Typography variant="body1">
            Turno {currentTurn + 1}: {attacker} atacó a {defender} causando {damage} daño. {defender} tiene {defenderRemainingHp} HP restantes.
          </Typography>
        )}
        {currentTurn < turns.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNextTurn}>
            Atacar
          </Button>
        ) : (
          <Typography variant="h6">Ganador: {winnerName}</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BattleDetailsModal;

