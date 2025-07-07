import './Footer.css';

interface FooterProps {
  handleClick: () => void;
}

const Footer = ({ handleClick }: FooterProps) => {
  return (
    <div className='footer-container'>
      <div className='footer-item-copyright'>© 2025 Blue Acara Project</div>
      <div className='footer-item-version'>v 1.1 alpha</div>
      <div className='footer-item-news' onClick={handleClick}>
        Changelog
      </div>
    </div>
  );
};
export default Footer;
