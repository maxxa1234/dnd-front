import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './character/CharacterList';
import CharacterForm from './character/CharacterForm';
import PlayerSheet from "./sheet/PlayerSheet";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/characters/new" element={<CharacterForm />} />
        <Route path="/characters" element={<CharacterList/>} />
        <Route path="/characters/:id" element={<PlayerSheet />} />
        <Route path="/" element={<CharacterList/>} />
      </Routes>
    </Router>
  );
}

export default App;
