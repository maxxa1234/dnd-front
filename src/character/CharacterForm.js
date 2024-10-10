import React, { useState } from 'react';
import axios from 'axios';
import './CharacterForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { Grid, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import {getTranslatedName} from '../util/TranslateUtil'


function CharacterForm() {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    characterClass: '',
    level: 1,
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
    selectedSkills: []
  });
  const totalPoints = 27;
  const [remainingPoints, setRemainingPoints] = useState(totalPoints);
  const [classSkills, setClassSkills] = useState([]); // To store the skills fetched from API
  const [skillLimit, setSkillLimit] = useState(0);
  const [remainingSkills, setRemainingSkills] = useState(0);

  const navigate = useNavigate();
  const getPointCost = (statValue) => {
    switch (statValue) {
      case 8: return 0;
      case 9: return 1;
      case 10: return 2;
      case 11: return 3;
      case 12: return 4;
      case 13: return 5;
      case 14: return 7;
      case 15: return 9;
      default: return Infinity; // For values outside 8-15
    }
  };


  const calculateTotalPointsUsed = (updatedCharacter) => {
    const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    let totalPointsUsed = 0;
    stats.forEach((stat) => {
      totalPointsUsed += getPointCost(updatedCharacter[stat]);
    });
    return totalPointsUsed;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name + ' ' + value)
    setCharacter({ ...character, [name]: value });

    if (name === 'characterClass' && value) {
      try {
        // Fetch the class skills and skill count from the API when class is selected
        const response = await axios.get(`/api/characters/skill/${value}`);
        const { classSkills, countOfSkills } = response.data;
        setClassSkills(classSkills);
        setSkillLimit(countOfSkills);
        setRemainingSkills(countOfSkills);
        setCharacter({ ...character,  [name]: value, selectedSkills: [] });
      } catch (error) {
        console.error('Error fetching class skills:', error);
      }
    }
  };

  const handleStatChange = (stat, increment) => {
    const currentStatValue = character[stat];
    const newStatValue = currentStatValue + increment;

    // Ensure stat is between 8 and 15
    if (newStatValue < 8 || newStatValue > 15) return;

    const currentStatCost = getPointCost(currentStatValue);
    const newStatCost = getPointCost(newStatValue);
    const pointDifference = newStatCost - currentStatCost;

    const newCharacter = { ...character, [stat]: newStatValue };
    const newTotalPointsUsed = calculateTotalPointsUsed(newCharacter);

    // Ensure total points used does not exceed 27
    if (newTotalPointsUsed > totalPoints) return;

    setCharacter(newCharacter);
    setRemainingPoints(totalPoints - newTotalPointsUsed);
  };

  const handleSkillSelection = (event, newSelectedSkills) => {
    if (newSelectedSkills.length <= skillLimit) {
      setCharacter({ ...character, selectedSkills: newSelectedSkills });
      setRemainingSkills(skillLimit - newSelectedSkills.length); // Update remaining skills
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure user has selected all required skills
    if (character.selectedSkills.length !== skillLimit) {
      alert(`Будь ласка, оберіть ${skillLimit} навичок.`);
      return;
    }

    axios.post('/api/characters', character)
      .then(response => {
        console.log(response.data);
        navigate('/characters');
      })
      .catch(error => console.error(error));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Створення персонажа
      </Typography>

      {/* Back to Character List Button */}
      <Button
        variant="outlined"
        onClick={() => navigate('/characters')}
        sx={{ marginBottom: 2 }}
      >
        Назад до списку персонажів
      </Button>

      <form onSubmit={handleSubmit} className="form-container">
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
        <label className="form-label" htmlFor="race">Раса</label>
        <select
          name="race"
          value={character.race}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Оберіть расу</option>
          <option value="Human">Людина</option>
          <option value="Elf">Ельф</option>
          <option value="Dwarf">Дварф</option>
          <option value="Halfling">Напіврослик</option>
          <option value="Gnome">Гном</option>
          <option value="Half-Elf">Напівельф</option>
          <option value="Half-Orc">Напіворк</option>
          <option value="Tiefling">Тіфлінг</option>
          <option value="Dragonborn">Драконороджений</option>
        </select>
      </div>

        <div>
          <label className="form-label" htmlFor="class">Клас</label>
          <select
            name="characterClass"
            value={character.characterClass}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Оберіть клас</option>
            <option value="Barbarian">Варвар</option>
            <option value="Bard">Бард</option>
            <option value="Cleric">Клірик</option>
            <option value="Druid">Друїд</option>
            <option value="Fighter">Боєць</option>
            <option value="Monk">Монах</option>
            <option value="Paladin">Паладин</option>
            <option value="Ranger">Рейнджер</option>
            <option value="Rogue">Шахрай</option>
            <option value="Sorcerer">Чаклун</option>
            <option value="Warlock">Чародій</option>
            <option value="Wizard">Маг</option>
          </select>
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

        {/* ToggleButtonGroup for Skills (Visible only when class is selected) */}
        {classSkills.length > 0 && (
          <div>
            <label className="form-label">Виберіть навички</label>
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              {classSkills.map((skill, index) => (
                <Grid item xs={4} key={skill}>
                  <ToggleButton
                    value={skill}
                    selected={character.selectedSkills.includes(skill)}
                    onChange={() => handleSkillSelection(null, character.selectedSkills.includes(skill)
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

        {/* Input fields for stats */}
        <div>
          {/* Display Remaining Points */}
          <Typography variant="h6" align="center" gutterBottom>
          Не використані токени: {remainingPoints}
        </Typography>

        {/* Stats Counters */}
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          disabled={remainingPoints !== 0 && remainingSkills !== 0}
        >
          Зберегти персонажа
        </Button>

        {remainingPoints !== 0 && (
          <Typography variant="body2" color="error" align="center">
            Будь ласка, використайте всі токени.
          </Typography>
        )}
      </form>
    </Container>
  );
}

export default CharacterForm;
