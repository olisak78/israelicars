import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './Main.css';
import Changelog from '../Changelog/Changelog';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
import Disclaimer from '../Disclaimer/Disclaimer';

const Main = () => {
  const [category, setCategory] = useState('car');
  const [changelogModalOpen, setChangelogModalOpen] = useState(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleBackToSearch = () => {
    // This function can be used for future navigation if needed
  };

  const handleChangelogOpen = () => {
    setChangelogModalOpen(true);
  };

  const handleDisclaimerOpen = () => {
    setDisclaimerModalOpen(true);
  };

  const handleChangelogClose = () => {
    setChangelogModalOpen(false);
  };

  const handleDisclaimerClose = () => {
    setDisclaimerModalOpen(false);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
  };

  return (
    <>
      <Header handleLogoClick={handleBackToSearch} />
      <div className='main-container'>
        <div className='car-box'>
          <SearchBox
            onCategorySelect={handleCategorySelect}
            selectedCategory={category}
          />
        </div>
      </div>
      <Footer
        handleChangelogClick={handleChangelogOpen}
        handleDisclaimerClick={handleDisclaimerOpen}
      />

      <Modal
        isOpen={changelogModalOpen}
        onClose={handleChangelogClose}
        title={t('changelog.title')}
      >
        <Changelog />
      </Modal>

      <Modal
        isOpen={disclaimerModalOpen}
        onClose={handleDisclaimerClose}
        title={t('disclaimer.title')}
      >
        <Disclaimer />
      </Modal>
    </>
  );
};

export default Main;
