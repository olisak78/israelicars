import './Changelog.css';
import { ReactComponent as Logo } from '../icons/svg/bacara.svg';

const Changelog = () => {
  return (
    <>
      <div className='changelog-version'>
        <Logo className='logo' />
        6/7/2025 - v 1.0
        <span className='version-name'>beta</span>
      </div>

      <div className='changelog-greeting'>
        Welcome to the very first version! (still in beta testing)
      </div>
      <div className='changelog-body'>
        <div className='changelog-subtitle'>New Features</div>
        <div className='changelog-log'>
          <ul className='changelog-list'>
            <li>Car search by license number</li>
            <li>Car info display</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Changelog;
