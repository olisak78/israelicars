import { useState } from 'react';
import CarInfo from '../CarInfo/CarInfo';
import SearchBox from '../SearchBox/SearchBox';
import './Main.css';
import Title from '../Title/Title';
import Changelog from '../Changelog/Changelog';
import { CarRecord } from '../../utils/types';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const [display, setDisplay] = useState('search');
  const [carRecord, setCarRecord] = useState<CarRecord | null>(null);
  const { t } = useTranslation();

  const handleCarFound = (record: CarRecord) => {
    setCarRecord(record);
    setDisplay('result');
  };

  const handleSearchError = (error: string) => {
    setCarRecord(null);
    // Stay on search display to show the error
  };

  const handleBackToSearch = () => {
    setDisplay('search');
  };

  const getTitle = () => {
    switch (display) {
      case 'search':
        return t('search.title');
      case 'result':
        return carRecord
          ? `${carRecord.shnat_yitzur} ${carRecord.kinuy_mishari}`
          : t('carInfo.title');
      case 'changelog':
        return t('changelog.title');
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (display) {
      case 'search':
        return t('search.subtitle');
      case 'result':
        return t('carInfo.subtitle');
      case 'changelog':
        return t('changelog.subtitle');
      default:
        return '';
    }
  };

  const handleChangelog = () => {
    setDisplay('changelog');
  };

  return (
    <>
      <Header handleLogoClick={handleBackToSearch} />
      <div className='main-container'>
        <div className='car-box'>
          <Title title={getTitle()} subtitle={getSubtitle()} />
          <div className='car-box-input'>
            {display === 'search' && (
              <SearchBox
                onCarFound={handleCarFound}
                onError={handleSearchError}
              />
            )}
            {display === 'result' && carRecord && (
              <>
                <CarInfo
                  carRecord={carRecord}
                  handleBack={handleBackToSearch}
                />
              </>
            )}
            {display === 'changelog' && <Changelog />}
          </div>
        </div>
      </div>
      <Footer handleClick={handleChangelog} />
    </>
  );
};

export default Main;
