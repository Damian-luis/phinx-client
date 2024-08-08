import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useMediaQuery } from '@mui/material';
import useFetchBattleHistory from '../hooks/useFetchBattles';

const BattleHistory = () => {
  const { battleHistory, loading, error } = useFetchBattleHistory();
  const isMobile = useMediaQuery('(max-width:600px)'); 

  return (
    <Container style={{ marginTop: '20px',maxWidth: isMobile ? '90%' : '60%' }}>
      <Typography variant="h4" component="div" gutterBottom>
        Historial de Peleas
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Aquí podrás visualizar el historial completo de las batallas.
      </Typography>
      {loading && <Typography>Cargando...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}
      {!loading && !error && (
        <TableContainer component={Paper} style={{marginTop:"50px"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Pokémon 1</TableCell>
                <TableCell>Pokémon 2</TableCell>
                <TableCell>Ganador</TableCell>
                <TableCell>Perdedor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {battleHistory.map((battle) => (
                <TableRow key={battle.id}>
                  <TableCell>{battle.id}</TableCell>
                  <TableCell>{battle.winnerName}</TableCell>
                  <TableCell>{battle.loserName}</TableCell>
                  <TableCell>{battle.winnerName}</TableCell>
                  <TableCell>{battle.loserName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default BattleHistory;



