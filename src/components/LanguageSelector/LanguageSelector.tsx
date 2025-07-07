import { useState, useRef, useEffect, ReactElement } from 'react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import { ReactComponent as IsraelFlag } from '../../icons/svg/il.svg';
import { ReactComponent as AmericanFlag } from '../../icons/svg/us.svg';
import { ReactComponent as RussianFlag } from '../../icons/svg/ru.svg';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    {
      code: 'he' as Language,
      name: 'עברית',
      flag: <IsraelFlag className='flag' />,
    },
    {
      code: 'en' as Language,
      name: 'English',
      flag: <AmericanFlag className='flag' />,
    },
    {
      code: 'ru' as Language,
      name: 'Русский',
      flag: <RussianFlag className='flag' />,
    },
  ];

  const currentLangData = languages.find(
    (lang) => lang.code === currentLanguage
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = async (lang: Language) => {
    if (lang !== currentLanguage && !isLoading) {
      await changeLanguage(lang);
      setIsOpen(false);
    }
  };

  return (
    <div className='language-selector' ref={dropdownRef}>
      <button
        className='language-selector-button'
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        aria-label='Select language'
      >
        <span className='language-flag'>
          {currentLangData?.flag as ReactElement}
        </span>
        <span className='language-code'>{currentLanguage.toUpperCase()}</span>
        <span className={`language-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className='language-dropdown'>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                lang.code === currentLanguage ? 'active' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isLoading}
            >
              <span className='language-flag'>{lang.flag}</span>
              <span className='language-name'>{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {isLoading && <div className='language-loading'>Loading...</div>}
    </div>
  );
};

export default LanguageSelector;
