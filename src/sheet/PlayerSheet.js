import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Container, Typography, Grid, Paper, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PlayerSheet() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/characters/${id}`)
      .then((response) => setCharacter(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  if (!character) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate('/characters')}
        sx={{ marginBottom: 2 }}
      >
        Back to Character List
      </Button>

      {/* Main Content Grid */}
      <Grid container spacing={2}>
        {/* Left Column: Stats Block */}
        <Grid item xs={12} md={2.2}>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom>
              Stats
            </Typography>
            {[
              { label: 'Strength', value: character.strength },
              { label: 'Dexterity', value: character.dexterity },
              { label: 'Constitution', value: character.constitution },
              { label: 'Intelligence', value: character.intelligence },
              { label: 'Wisdom', value: character.wisdom },
              { label: 'Charisma', value: character.charisma },
            ].map((stat) => {
              const modifier = calculateModifier(stat.value);
              return (
                <Paper
                  key={stat.label}
                  variant="outlined"
                  sx={{ padding: 1, marginBottom: 1 }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: modifier >= 0 ? 'green' : 'red', marginLeft: '40px' }}
                  >
                    {modifier >= 0 ? '+' : ''}{modifier}
                  </Typography>
                  <Typography
                    variant="h6"
                  >
                    {stat.label}: {stat.value}
                  </Typography>
                </Paper>
              );
            })}
          </Paper>
        </Grid>

        {/* Right Column: General Info and Additional Content */}
        <Grid item xs={12} md={8}>
          {/* General Info Block */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h4" gutterBottom>
              {character.name}
            </Typography>
            <Typography variant="h6">
              Level {character.level} {character.race} {character.characterClass}
            </Typography>
          </Paper>

          {/* Additional blocks (Skills, Mastery, Health) can be added here */}
          {/* Example: Skills Block */}
          {/* Add more content as needed */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default PlayerSheet;
