import './SearchButtons.css';
import { useTranslation } from 'react-i18next';

interface SearchButtonsProps {
  category: string;
  onClick: (actionType: string) => void;
  isLoading?: boolean;
}

const SearchButtons = ({
  category,
  onClick,
  isLoading = false,
}: SearchButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className='search-buttons-container'>
      <button
        className='search-button-item'
        onClick={() => onClick('basicInfo')}
        disabled={isLoading}
        title={t('tooltips.basicInfo')}
      >
        {t('buttons.basicInfo')}
      </button>

      {category === 'car' && (
        <>
          <button
            className='search-button-item'
            onClick={() => onClick('ownershipHistory')}
            disabled={isLoading}
            title={t('tooltips.ownershipHistory')}
          >
            {t('buttons.ownershipHistory')}
          </button>

          <button
            className='search-button-item'
            onClick={() => onClick('handicappedSign')}
            disabled={isLoading}
            title={t('tooltips.handicappedSign')}
          >
            {t('buttons.handicappedSign')}
          </button>

          <button
            className='search-button-item'
            onClick={() => onClick('kilometrage')}
            disabled={isLoading}
            title={t('tooltips.kilometrage')}
          >
            {t('buttons.kilometrage')}
          </button>
        </>
      )}
    </div>
  );
};

export default SearchButtons;
