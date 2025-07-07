import './Title.css';

interface TitleProps {
  title: string;
  subtitle: string;
}

const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div className='car-box-title'>
      <div className='car-box-main-title'>{title}</div>
      <div className='car-box-subtitle'>{subtitle}</div>
    </div>
  );
};

export default Title;
