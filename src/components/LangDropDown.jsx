import i18n from  'i18next';
import { useState } from 'react';


const LangDropDown = () => {
  const langs = [
    { code: 'en-US', nativeName: 'English' },
    { code: 'pt-BR', nativeName: 'Português (Brasil)' },
  ];

  const [ currentLang, setCurrentLang ] = useState({ code: 'pt-BR', nativeName: 'Português (Brasil)' });

  const handleLanguageChange = (selectedLang) => {
    i18n.changeLanguage(selectedLang.code);
    setCurrentLang(() => selectedLang);
  }
 

  return (
    <div class="btn-group btn-group-sm">
      <button type="button" class="btn btn-dark">
        { currentLang.nativeName }
      </button>
      <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">

      {langs.map((lang) => 
        (<li>
          <button
            class="dropdown-item"
            key={lang.code}
            type="button"
            onClick={() => handleLanguageChange(lang)}
          >
            {lang.nativeName}
          </button>
        </li>)
      )}

 
      </ul>

      
    </div>

    
  );
}

export default LangDropDown;