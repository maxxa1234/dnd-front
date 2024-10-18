import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const CharacterFormStep4 = ({ character, remainingPoints, handleStatChange, getTranslatedName, getPointCost }) => {
  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Не використані токени: {remainingPoints}
      </Typography>

      <Grid container spacing={2} marginTop={2}>
        {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => {
          const statValue = character[stat];
          const statCost = getPointCost(statValue);
          const canIncrease = statValue < 15 && (remainingPoints >= getPointCost(statValue + 1) - statCost);
          const canDecrease = statValue > 8;
          return (
            <Grid item xs={6} key={stat}>
              <Typography variant="subtitle1" gutterBottom>
                {getTranslatedName(stat).charAt(0).toUpperCase() + getTranslatedName(stat).slice(1)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ціна: {statCost} токен{statCost !== 1 ? 'ів' : ''}
              </Typography>
              <Grid container alignItems="center">
                <IconButton
                  onClick={() => handleStatChange(stat, -1)}
                  disabled={!canDecrease}
                >
                  <Remove />
                </IconButton>
                <Typography variant="h6" style={{ margin: '0 10px' }}>
                  {statValue}
                </Typography>
                <IconButton
                  onClick={() => handleStatChange(stat, 1)}
                  disabled={!canIncrease}
                >
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CharacterFormStep4;
