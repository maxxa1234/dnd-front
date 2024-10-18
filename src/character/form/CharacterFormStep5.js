import React from 'react';
import { Grid, ToggleButton, Typography, TextField } from '@mui/material';

const CharacterFormStep5 = ({ character, allSkills, handleBackgroundSkillSelection, handleChange, getTranslatedName }) => {
  return (
    <div>
      {/* Background Story */}
      <div>
        <label className="form-label" htmlFor="backgroundStory">Історія персонажа</label>
        <TextField
          name="backgroundStory"
          value={character.backgroundStory}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          placeholder="Введіть історію персонажа"
        />
      </div>

      {/* Background Skills Selection */}
      <div>
        <label className="form-label">Навички для бекграунду</label>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          {allSkills
            .filter(skill => !character.selectedSkills.includes(skill)) // Exclude already selected class skills
            .map((skill) => (
              <Grid item xs={4} key={skill}>
                <ToggleButton
                  value={skill}
                  selected={character.backgroundSkills.includes(skill)}
                  onChange={() => handleBackgroundSkillSelection(null, character.backgroundSkills.includes(skill)
                    ? character.backgroundSkills.filter((s) => s !== skill)
                    : [...character.backgroundSkills, skill]
                  )}
                  sx={{
                    borderRadius: '10px',
                    width: '100%',
                    padding: '10px',
                    backgroundColor: character.selectedSkills.includes(skill) ? '#4caf50' : '', // Green background when selected
                    color: character.selectedSkills.includes(skill) ? '#fff' : '#000', // White text when selected
                    '&:hover': {
                      backgroundColor: character.selectedSkills.includes(skill) ? '#45a049' : '#ddd', // Slightly darker green on hover when selected
                      color: character.selectedSkills.includes(skill) ? '#fff' : '#000',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#4caf50', // Green when selected
                      color: '#fff', // White text when selected
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#45a049', // Darker green when selected and hovered
                      color: '#fff',
                    }
                  }}
                >
                  {getTranslatedName(skill.toLowerCase())}
                </ToggleButton>
              </Grid>
            ))}
        </Grid>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Виберіть 2 навички для бекграунду
        </Typography>
      </div>
    </div>
  );
};

export default CharacterFormStep5;
