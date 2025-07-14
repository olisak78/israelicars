import { useTranslation } from 'react-i18next';
import './ActionTypes.css';
import { FaWheelchair } from 'react-icons/fa';
import { GoDot } from 'react-icons/go';
import { GoDotFill } from 'react-icons/go';
import { BsSpeedometer } from 'react-icons/bs';
import { GiCarKey } from 'react-icons/gi';
import { RiInformation2Fill } from 'react-icons/ri';

interface ActionTypesProps {
  category: string;
  types: string[];
  onClick: (actionType: string) => void;
  isLoading?: boolean;
}

const ActionTypes = ({
  category,
  types,
  onClick,
  isLoading,
}: ActionTypesProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='action-types-container'>
        <div
          onClick={() => onClick('info')}
          className={`action-types-item ${
            types.includes('info') ? 'selected' : ''
          }`}
        >
          {t('buttons.generalInfo')}
          <div className='item-icon'>{(RiInformation2Fill as any)({})}</div>
          <div className='item-icon-v'>
            {types.includes('info')
              ? (GoDotFill as any)({})
              : (GoDot as any)({})}
          </div>
        </div>
        {category === 'car' && (
          <>
            <div
              onClick={() => onClick('ownership')}
              className={`action-types-item ${
                types.includes('ownership') ? 'selected' : ''
              }`}
            >
              {t('buttons.ownershipHistory')}
              <div className='item-icon'>{(GiCarKey as any)({})}</div>
              <div className='item-icon-v'>
                {types.includes('ownership')
                  ? (GoDotFill as any)({})
                  : (GoDot as any)({})}
              </div>
            </div>
            <div
              onClick={() => onClick('mileage')}
              className={`action-types-item ${
                types.includes('mileage') ? 'selected' : ''
              }`}
            >
              {t('buttons.kilometrage')}
              <div className='item-icon'>{(BsSpeedometer as any)({})}</div>
              <div className='item-icon-v'>
                {types.includes('mileage')
                  ? (GoDotFill as any)({})
                  : (GoDot as any)({})}
              </div>
            </div>
            <div
              onClick={() => onClick('handicapped')}
              className={`action-types-item ${
                types.includes('handicapped') ? 'selected' : ''
              }`}
            >
              {t('buttons.handicappedSign')}
              <div className='item-icon'>{(FaWheelchair as any)({})}</div>
              <div className='item-icon-v'>
                {types.includes('handicapped')
                  ? (GoDotFill as any)({})
                  : (GoDot as any)({})}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ActionTypes;
