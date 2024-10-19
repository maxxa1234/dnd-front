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
        <option value="HUMAN">Людина</option>
        <option value="ELF">Ельф</option>
        <option value="DWARF">Дварф</option>
        <option value="HALFLING">Напіврослик</option>
        <option value="GNOME">Гном</option>
        <option value="HALF-ELF">Напівельф</option>
        <option value="HALF-ORC">Напіворк</option>
        <option value="TIEFLING">Тіфлінг</option>
        <option value="DRAGONBORN">Драконороджений</option>
      </select>
    </div>
  );
};

export default CharacterFormStep2;
