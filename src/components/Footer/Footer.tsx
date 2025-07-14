import './Footer.css';

interface FooterProps {
  handleChangelogClick: () => void;
  handleDisclaimerClick: () => void;
}

const Footer = ({
  handleChangelogClick,
  handleDisclaimerClick,
}: FooterProps) => {
  return (
    <div className='footer-container'>
      <div className='footer-item-copyright'>© 2025 Blue Acara Project</div>
      <div className='footer-item-version'>v 1.2 Rasbora</div>
      <div className='footer-item-news' onClick={handleDisclaimerClick}>
        Disclaimer
      </div>
      <div className='footer-item-news' onClick={handleChangelogClick}>
        Changelog
      </div>
    </div>
  );
};
export default Footer;
