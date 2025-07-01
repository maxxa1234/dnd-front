import React from 'react';
import { Grid, ToggleButton, Typography } from '@mui/material';

const CharacterFormStep3 = ({
                              character,
                              classSkills,
                              remainingSkills,
                              handleChange,
                              handleSkillSelection,
                              getTranslatedName
                            }) => {
  return (
    <div>
      {/* Class Selection */}
      <div>
        <label className="form-label" htmlFor="class">Клас</label>
        <select
          name="characterClass"
          value={character.characterClass}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Оберіть клас</option>
          <option value="BARBARIAN">Варвар</option>
          <option value="BARD">Бард</option>
          <option value="CLERIC">Клірик</option>
          <option value="DRUID">Друїд</option>
          <option value="FIGHTER">Боєць</option>
          <option value="MONK">Монах</option>
          <option value="PALADIN">Паладин</option>
          <option value="RANGER">Рейнджер</option>
          <option value="ROGUE">Шахрай</option>
          <option value="SORCERER">Чаклун</option>
          <option value="WARLOCK">Чародій</option>
          <option value="WIZARD">Маг</option>
        </select>
      </div>

      {/* Skill Selection */}
      {classSkills.length > 0 && (
        <div>
          <label className="form-label">Виберіть навички</label>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {classSkills.map((skill, index) => (
              <Grid item xs={4} key={skill}>
                <ToggleButton
                  value={skill}
                  selected={character.selectedSkills.includes(skill)}
                  onChange={() => handleSkillSelection(
                    null,
                    character.selectedSkills.includes(skill)
                      ? character.selectedSkills.filter((s) => s !== skill)
                      : [...character.selectedSkills, skill]
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
            Залишилось вибрати навичок: {remainingSkills}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CharacterFormStep3;
