import './Changelog.css';
import { ReactComponent as Logo } from '../../icons/svg/bacara.svg';

const Changelog = () => {
  return (
    <>
      <div className='changelog-version'>
        <Logo className='logo' />
        7/7/2025 - v 1.1
        <span className='version-name'>-alpha</span>
      </div>

      <div className='changelog-greeting'>Shalom Hebrew!</div>
      <div className='changelog-body'>
        <div className='changelog-subtitle'>New Features</div>
        <div className='changelog-log'>
          <ul className='changelog-list'>
            <li>Hebrew translation</li>
            <li>Russian translation</li>
            <li>Language switcher</li>
          </ul>
        </div>
        <div className='changelog-subtitle'>Changes</div>
        <div className='changelog-log'>
          <ul className='changelog-list'>
            <li>Header color became blue-grey gradient</li>
          </ul>
        </div>
      </div>

      <div className='changelog-version'>
        6/7/2025 - v 1.0
        <span className='version-name'>-beta</span>
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
