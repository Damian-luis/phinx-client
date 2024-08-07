import React from 'react';
import { Card, CardContent, Typography, CardMedia, LinearProgress, Box } from '@mui/material';

const BattleCard = ({ pokemon, currentHp }) => (
  <Card style={{ maxWidth: 300, margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} elevation={3}>
    <CardMedia
      component="img"
      height="100"
      image={pokemon.imageUrl}
      alt={pokemon.name}
      style={{ objectFit: 'contain', width: '150px', height: '200px', margin: 'auto' }}
    />
    <CardContent>
      <Typography variant="h5" component="div">
        {pokemon.name}
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="text.secondary" style={{ marginRight: 10 }}>
          HP:
        </Typography>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={(currentHp / pokemon.hp) * 100} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {currentHp} / {pokemon.hp}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="text.secondary" style={{ marginRight: 10 }}>
          Attack:
        </Typography>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={(pokemon.attack / 10) * 100} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {pokemon.attack}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="text.secondary" style={{ marginRight: 10 }}>
          Defense:
        </Typography>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={(pokemon.defense / 10) * 100} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {pokemon.defense}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="text.secondary" style={{ marginRight: 10 }}>
          Speed:
        </Typography>
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={(pokemon.speed / 10) * 100} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {pokemon.speed}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default BattleCard;


