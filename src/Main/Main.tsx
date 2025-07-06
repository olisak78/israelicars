import { useState } from 'react';
import CarInfo from '../CarInfo/CarInfo';
import SearchBox from '../SearchBox/SearchBox';
import './Main.css';
import Title from '../Title/Title';
import Changelog from '../Changelog/Changelog';
import { CarRecord } from '../utils/types';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Main = () => {
  const [display, setDisplay] = useState('search');
  const [carRecord, setCarRecord] = useState<CarRecord | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleCarFound = (record: CarRecord) => {
    setCarRecord(record);
    setSearchError(null);
    setDisplay('result');
  };

  const handleSearchError = (error: string) => {
    setSearchError(error);
    setCarRecord(null);
    // Stay on search display to show the error
  };

  const handleBackToSearch = () => {
    setDisplay('search');
    setSearchError(null);
  };

  const getTitle = () => {
    switch (display) {
      case 'search':
        return 'Find Car By License Number';
      case 'result':
        return carRecord
          ? `${carRecord.shnat_yitzur} ${carRecord.kinuy_mishari}`
          : 'Vehicle Information';
      case 'changelog':
        return "What's New";
      default:
        return '';
    }
  };

  const getSubtitle = () => {
    switch (display) {
      case 'search':
        return 'Vehicle Information Lookup';
      case 'result':
        return 'Vehicle Information';
      case 'changelog':
        return 'Versions list';
      default:
        return '';
    }
  };

  const handleChangelog = () => {
    setDisplay('changelog');
  };

  console.log(searchError);

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
