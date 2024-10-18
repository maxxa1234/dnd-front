import React from 'react';
import {Container} from "@mui/material";
import '../CharacterForm.css';

const CharacterFormStep1 = ({ character, handleChange }) => {
  return (
    <Container maxWidth="sm" >
      <div>
        <div>
          <label className="form-label" htmlFor="name">Імʼя</label>
          <input
            type="text"
            name="name"
            value={character.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Введіть імʼя персонажа"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="level">Рівень</label>
          <input
            type="number"
            name="level"
            value={character.level}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="20"
          />
        </div>
      </div>
    </Container>
  );
};

export default CharacterFormStep1;
