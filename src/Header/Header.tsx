import './Header.css';
import { ReactComponent as Home } from '../icons/whouse.svg';

interface HeaderProps {
  handleLogoClick: () => void;
}

const Header = ({ handleLogoClick }: HeaderProps) => {
  return (
    <div className='header-container'>
      <Home className='header-logo' onClick={handleLogoClick} />
    </div>
  );
};
export default Header;
