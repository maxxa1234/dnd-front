import React, { useState } from 'react';
import CharacterFormStep1 from './form/CharacterFormStep1';
import CharacterFormStep2 from './form/CharacterFormStep2';
import CharacterFormStep3 from './form/CharacterFormStep3';
import CharacterFormStep4 from './form/CharacterFormStep4';
import CharacterFormStep5 from './form/CharacterFormStep5';
import { Button, Container, Typography } from "@mui/material";
import './CharacterForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getTranslatedName} from "../util/TranslateUtil";

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
    selectedSkills: [],
    backgroundSkills: [],
    backgroundStory: ''
  });
  const totalPoints = 27;
  const [step, setStep] = useState(1);
  const [remainingPoints, setRemainingPoints] = useState(totalPoints);
  const [classSkills, setClassSkills] = useState([]); // To store the skills fetched from API
  const [skillLimit, setSkillLimit] = useState(0); // Skill limit based on class
  const [remainingSkills, setRemainingSkills] = useState(0); // Remaining skills to select
  const [allSkills, setAllSkills] = useState([]);

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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setCharacter({ ...character, [name]: value });

    if (name === 'characterClass' && value) {
      try {
        // Fetch the class skills and skill count from the API when class is selected
        const response = await axios.get(`/api/characters/skill/${value}`);
        const { classSkills, countOfSkills, allAvailableSkills } = response.data;
        setClassSkills(classSkills);
        setSkillLimit(countOfSkills);
        setRemainingSkills(countOfSkills);
        setCharacter({ ...character, [name]: value, selectedSkills: [] });
        setAllSkills(allAvailableSkills);
      } catch (error) {
        console.error('Error fetching class skills:', error);
      }
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

  const handleSkillSelection = (event, newSelectedSkills) => {
    if (newSelectedSkills.length <= skillLimit) {
      setCharacter({ ...character, selectedSkills: newSelectedSkills });
      setRemainingSkills(skillLimit - newSelectedSkills.length); // Update remaining skills
    }
  };

  const handleBackgroundSkillSelection = (event, newSelectedBackgroundSkills) => {
    console.log(newSelectedBackgroundSkills)
    if (newSelectedBackgroundSkills.length <= 2) {
      setCharacter({ ...character, backgroundSkills: newSelectedBackgroundSkills });
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

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

      <form onSubmit={handleSubmit}>
        {step === 1 && <CharacterFormStep1 character={character} handleChange={handleChange} />}
        {step === 2 && <CharacterFormStep2 character={character} handleChange={handleChange} />}
        {step === 3 && <CharacterFormStep3
          character={character}
          classSkills={classSkills}
          remainingSkills={remainingSkills}
          handleChange={handleChange}
          handleSkillSelection={handleSkillSelection}
          getTranslatedName={getTranslatedName}
        />}
        {step === 4 && <CharacterFormStep4
          character={character}
          remainingPoints={27 - calculateTotalPointsUsed(character)}
          handleStatChange={handleStatChange}
          getTranslatedName={getTranslatedName}
          getPointCost={getPointCost}
        />}
        {step === 5 && <CharacterFormStep5
          character={character}
          allSkills={allSkills}
          handleBackgroundSkillSelection={handleBackgroundSkillSelection}
          handleChange={handleChange}
          getTranslatedName={getTranslatedName}
        />}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {step > 1 && <Button variant="contained" onClick={handleBack}>Назад</Button>}
          {step < 5 && <Button variant="contained" onClick={handleNext}>Далі</Button>}
          {step === 5 && <Button type="submit" variant="contained" color="primary">Зберегти персонажа</Button>}
        </div>
      </form>
    </Container>
  );
}

export default CharacterForm;
