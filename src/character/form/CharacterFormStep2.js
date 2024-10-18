import React from 'react';

const CharacterFormStep2 = ({ character, handleChange }) => {
  return (
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
  );
};

export default CharacterFormStep2;
