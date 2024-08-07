import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const PokemonCard = ({ pokemon, onSelect }) => {
  return (
    <Card onClick={() => onSelect(pokemon)} style={{ maxWidth: 200, margin: 'auto' }} elevation={4}>
      <CardMedia
        component="img"
        height="100"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ objectFit: 'contain', width: '100px', height: '100px', margin: 'auto' }}
      />
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {pokemon.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;

