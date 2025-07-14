import './Header.css';
import { ReactComponent as Home } from '../../icons/house.svg';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

interface HeaderProps {
  handleLogoClick: () => void;
}

const Header = ({ handleLogoClick }: HeaderProps) => {
  return (
    <div className='header-container'>
      <Home className='header-logo' onClick={handleLogoClick} />
      <LanguageSelector />
    </div>
  );
};

export default Header;
