import { addDashes } from '../../utils/addDashes';
import { CarRecord } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import './CarInfo.css';
import { useLanguage } from '../../contexts/LanguageContext';

interface CarInfoProps {
  carRecord: CarRecord;
  handleBack: () => void;
}

const CarInfo = ({ carRecord, handleBack }: CarInfoProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  return (
    <>
      <div className='result-title'>
        {t('carInfo.licensePlate')}:{' '}
        <span className='car-number'>
          {addDashes(carRecord.mispar_rechev.toString())}
        </span>
      </div>
      <div className='result-grid'>
        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-brand'>
              {carRecord.tozeret_nm}
            </div>
            <div className='grid-item-title-he-brand'>{t('carInfo.brand')}</div>
          </>
        ) : (
          <>
            <div className='grid-item-title-brand'>{t('carInfo.brand')}</div>
            <div className='grid-item-value-brand'>{carRecord.tozeret_nm}</div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-trim-level'>
              {carRecord.ramat_gimur || t('common.na')}
            </div>
            <div className='grid-item-title-he-trim-level'>
              {t('carInfo.gradeLevel')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-trim-level'>
              {t('carInfo.gradeLevel')}
            </div>
            <div className='grid-item-value-trim-level'>
              {carRecord.ramat_gimur || t('common.na')}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-production-year'>
              {carRecord.shnat_yitzur}
            </div>
            <div className='grid-item-title-he-production-year'>
              {t('carInfo.productionYear')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-production-year'>
              {t('carInfo.productionYear')}
            </div>
            <div className='grid-item-value-production-year'>
              {carRecord.shnat_yitzur}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-ownership'>
              {carRecord.baalut}
            </div>
            <div className='grid-item-title-he-ownership'>
              {t('carInfo.ownership')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-ownership'>
              {t('carInfo.ownership')}
            </div>
            <div className='grid-item-value-ownership'>{carRecord.baalut}</div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-valid'>{carRecord.tokef_dt}</div>
            <div className='grid-item-title-he-valid'>
              {t('carInfo.validUntil')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-valid'>
              {t('carInfo.validUntil')}
            </div>
            <div className='grid-item-value-valid'>{carRecord.tokef_dt}</div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-test-date'>
              {carRecord.mivchan_acharon_dt}
            </div>
            <div className='grid-item-title-he-test-date'>
              {t('carInfo.lastTest')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-test-date'>
              {t('carInfo.lastTest')}
            </div>
            <div className='grid-item-value-test-date'>
              {carRecord.mivchan_acharon_dt}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-color'>
              {carRecord.tzeva_rechev}
            </div>
            <div className='grid-item-title-he-color'>{t('carInfo.color')}</div>
          </>
        ) : (
          <>
            <div className='grid-item-title-color'>{t('carInfo.color')}</div>
            <div className='grid-item-value-color'>
              {carRecord.tzeva_rechev}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-on-road'>
              {carRecord.moed_aliya_lakvish}
            </div>
            <div className='grid-item-title-he-on-road'>
              {t('carInfo.onRoadFrom')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-on-road'>
              {t('carInfo.onRoadFrom')}
            </div>
            <div className='grid-item-value-on-road'>
              {carRecord.moed_aliya_lakvish}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-engine'>
              {carRecord.sug_delek_nm}
            </div>
            <div className='grid-item-title-he-engine'>
              {t('carInfo.engineType')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-engine'>
              {t('carInfo.engineType')}
            </div>
            <div className='grid-item-value-engine'>
              {carRecord.sug_delek_nm}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-front-tire'>
              {carRecord.zmig_kidmi}
            </div>
            <div className='grid-item-title-he-front-tire'>
              {t('carInfo.frontTire')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-front-tire'>
              {t('carInfo.frontTire')}
            </div>
            <div className='grid-item-value-front-tire'>
              {carRecord.zmig_kidmi}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-rear-tire-value'>
              {carRecord.zmig_ahori}
            </div>
            <div className='grid-item-title-he-rear-tire'>
              {t('carInfo.rearTire')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-rear-tire'>
              {t('carInfo.rearTire')}
            </div>
            <div className='grid-item-value-rear-tire-value'>
              {carRecord.zmig_ahori}
            </div>
          </>
        )}

        {currentLanguage === 'he' ? (
          <>
            <div className='grid-item-value-he-chassis'>
              {carRecord.misgeret}
            </div>
            <div className='grid-item-title-he-chassis'>
              {t('carInfo.chassis')}
            </div>
          </>
        ) : (
          <>
            <div className='grid-item-title-chassis'>
              {t('carInfo.chassis')}
            </div>
            <div className='grid-item-value-chassis'>{carRecord.misgeret}</div>
          </>
        )}
        <button onClick={handleBack} className='back-to-search-button'>
          {t('carInfo.searchAnother')}
        </button>
      </div>
    </>
  );
};

export default CarInfo;
