import { useTranslation } from 'react-i18next';
import './Disclaimer.css';
import { useLanguage } from '../../contexts/LanguageContext';

const Disclaimer = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  return (
    <div className='disclaimer-modal-content'>
      <div
        className={`disclaimer-text ${
          !currentLanguage || currentLanguage === 'he' ? 'rtl' : ''
        }`}
      >
        {t('disclaimer.text')}
      </div>
      <div className='disclaimer-important'>
        {t('disclaimer.importantNotice')}
      </div>
      <ul
        className={`disclaimer-list ${
          !currentLanguage || currentLanguage === 'he' ? 'rtl' : ''
        }`}
      >
        <li>{t('disclaimer.note1')}</li>
        <li>{t('disclaimer.note2')}</li>
        <li>{t('disclaimer.note3')}</li>
        <li>{t('disclaimer.note4')}</li>
        <li>{t('disclaimer.note5')}</li>
        <li>{t('disclaimer.note6')}</li>
        <li>{t('disclaimer.note7')}</li>
      </ul>
      <div className='disclaimer-final'>{t('disclaimer.finalNote')}</div>
    </div>
  );
};

export default Disclaimer;
