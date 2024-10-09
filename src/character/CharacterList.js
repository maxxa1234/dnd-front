import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/characters')
      .then((response) => setCharacters(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateCharacter = () => {
    navigate('/characters/new');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        My Characters
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateCharacter}
        sx={{ marginBottom: 2 }}
      >
        Create New Character
      </Button>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Container>
  );
}

export default CharacterList;
