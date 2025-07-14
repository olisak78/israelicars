import './Changelog.css';
import { ReactComponent as Logo } from '../../icons/svg/bacara.svg';

const Changelog = () => {
  return (
    <div className='changelog-modal-content'>
      <div className='changelog-version'>
        <Logo className='logo-modal' />
        version 1.2 - Rasbora (14/7/2025)
      </div>

      <div className='changelog-greeting'>More Car Info!</div>
      <div className='changelog-body'>
        <div className='changelog-subtitle'>New Features</div>
        <div className='changelog-log'>
          <ul className='changelog-list'>
            <li>More General Information for cars</li>
            <li>Handicapped tag check</li>
            <li>Ownership history</li>
            <li>Bikes search</li>
            <li>Trucks search</li>
            <li>Buses search</li>
            <li>Disclaimer added</li>
          </ul>
        </div>
        <div className='changelog-subtitle'>Changes</div>
        <div className='changelog-log'>
          <ul className='changelog-list'>
            <li>Much improved UI in Search screen</li>
            <li>Info displayed in Modal</li>
            <li>Improved error handling and notifications</li>
          </ul>
        </div>
      </div>

      <div className='changelog-version'>version 1.1 - alpha (7/7/2025)</div>

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

      <div className='changelog-version'>version 1.0 beta (6/7/2025)</div>

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
    </div>
  );
};

export default Changelog;
