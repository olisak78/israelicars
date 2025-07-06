import './Header.css';
import { ReactComponent as Logo } from '../icons/svg/wacara.svg';

interface HeaderProps {
  handleLogoClick: () => void;
}

const Header = ({ handleLogoClick }: HeaderProps) => {
  return (
    <div className='header-container'>
      <Logo className='header-logo' onClick={handleLogoClick} />
    </div>
  );
};
export default Header;
