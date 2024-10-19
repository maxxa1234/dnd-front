import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Container, Typography, Grid, Paper, Button, Chip} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {getTranslatedName} from "../util/TranslateUtil";

function PlayerSheet() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [skills, setSkills] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading state when fetching starts

    // Fetch both character and skills at the same time
    Promise.all([
      axios.get(`/api/characters/${id}`),
      axios.get(`/api/characters/skills/${id}`),
    ])
      .then(([characterResponse, skillsResponse]) => {
        setCharacter(characterResponse.data); // Set character data
        setSkills(skillsResponse.data); // Set skills data
        setLoading(false); // Set loading to false when both are loaded
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Even on error, we want to stop loading
      });
  }, [id]);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }
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

          {/* New Block for Character Skills */}
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Навички персонажа
            </Typography>

            <Grid container spacing={2}>
              {Object.entries(skills).map(([skill, value]) => {
                const isMasterySkill = character.selectedSkills.includes(skill);

                return (
                  <Grid item xs={6} key={skill}>
                    <Paper
                      variant="outlined"
                      sx={{
                        padding: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 1,
                        border: isMasterySkill ? '2px solid' : '1px solid rgba(0, 0, 0, 0.12)', // Stronger border for mastery skills
                      }}
                    >
                      <Typography variant="subtitle1">
                        {getTranslatedName(skill.toLowerCase())}
                      </Typography>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isMasterySkill && (
                          <Chip
                            label="Майстерність"
                            color="secondary"
                            size="small"
                            sx={{ marginRight: 1 }}
                          />
                        )}

                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 'bold',
                            color: value > 0 ? 'green' : value < 0 ? 'red' : 'gray',
                          }}
                        >
                          {value >= 0 ? '+' : ''}{value}
                        </Typography>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
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
