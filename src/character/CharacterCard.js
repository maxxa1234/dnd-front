import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography color="text.secondary">
            Level {character.level} {character.race} {character.characterClass}
          </Typography>
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={6}>
              <Typography variant="body2">Strength: {character.strength}</Typography>
              <Typography variant="body2">Dexterity: {character.dexterity}</Typography>
              <Typography variant="body2">Constitution: {character.constitution}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Intelligence: {character.intelligence}</Typography>
              <Typography variant="body2">Wisdom: {character.wisdom}</Typography>
              <Typography variant="body2">Charisma: {character.charisma}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CharacterCard;
