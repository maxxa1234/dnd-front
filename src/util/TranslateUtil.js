
export const getTranslatedName = (statValue) => {
  switch (statValue) {
    case 'strength': return 'сила';
    case 'dexterity': return 'спринтість';
    case 'constitution': return 'витривалість';
    case 'intelligence': return 'інтелект';
    case 'wisdom': return 'мудрість';
    case 'charisma': return 'харизма';

    // Skill translations
    case 'athletics': return 'атлетика';
    case 'acrobatics': return 'акробатика';
    case 'sleight_of_hand': return 'спритність рук';
    case 'stealth': return 'скритність';
    case 'arcana': return 'таємниці';
    case 'history': return 'історія';
    case 'investigation': return 'розслідування';
    case 'nature': return 'природа';
    case 'religion': return 'релігія';
    case 'animal_handling': return 'догляд за тваринами';
    case 'insight': return 'проникливість';
    case 'medicine': return 'медицина';
    case 'perception': return 'сприйняття';
    case 'survival': return 'виживання';
    case 'deception': return 'обман';
    case 'intimidation': return 'залякування';
    case 'performance': return 'виступ';
    case 'persuasion': return 'переконання';


    default: return 'нема';
  }
};
