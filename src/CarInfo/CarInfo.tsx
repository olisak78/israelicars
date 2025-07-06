import { addDashes } from '../utils/addDashes';
import { CarRecord } from '../utils/types';
import './CarInfo.css';

interface CarInfoProps {
  carRecord: CarRecord;
  handleBack: () => void;
}

const CarInfo = ({ carRecord, handleBack }: CarInfoProps) => {
  const translateOwnership = (baalut: string): string => {
    switch (baalut) {
      case 'פרטי':
        return 'Private';
      case 'מסחרי':
        return 'Commercial';
      default:
        return baalut;
    }
  };
  return (
    <>
      <div className='result-title'>
        License Plate:{' '}
        <span className='car-number'>
          {addDashes(carRecord.mispar_rechev.toString())}
        </span>
      </div>
      <div className='result-grid'>
        <div className='grid-item-title-brand'>Brand</div>
        <div className='grid-item-value-brand'>{carRecord.tozeret_nm}</div>

        <div className='grid-item-title-trim-level'>Grade Level</div>
        <div className='grid-item-value-trim-level'>
          {carRecord.ramat_gimur || 'N/A'}
        </div>

        <div className='grid-item-title-production-year'>Production Year</div>
        <div className='grid-item-value-production-year'>
          {carRecord.shnat_yitzur}
        </div>

        <div className='grid-item-title-ownership'>Ownership</div>
        <div className='grid-item-value-ownership'>
          {translateOwnership(carRecord.baalut)}
        </div>

        <div className='grid-item-title-valid'>Valid Until</div>
        <div className='grid-item-value-valid'>{carRecord.tokef_dt}</div>

        <div className='grid-item-title-test-date'>Last Test</div>
        <div className='grid-item-value-test-date'>
          {carRecord.mivchan_acharon_dt}
        </div>
        <div className='grid-item-title-color'>Color</div>
        <div className='grid-item-value-color'>{carRecord.tzeva_rechev}</div>

        <div className='grid-item-title-on-road'>On Road From</div>
        <div className='grid-item-value-on-road'>
          {carRecord.moed_aliya_lakvish}
        </div>

        <div className='grid-item-title-engine'>Engine Type</div>
        <div className='grid-item-value-engine'>{carRecord.sug_delek_nm}</div>

        <div className='grid-item-title-front-tire'>Front Tire</div>
        <div className='grid-item-value-front-tire'>{carRecord.zmig_kidmi}</div>

        <div className='grid-item-title-rear-tire'>Rear Tire</div>
        <div className='grid-item-value-rear-tire-value'>
          {carRecord.zmig_ahori}
        </div>

        <div className='grid-item-title-chassis'>Chassis</div>
        <div className='grid-item-value-chassis'>{carRecord.misgeret}</div>
        <button onClick={handleBack} className='back-to-search-button'>
          Search Another Vehicle
        </button>
      </div>
    </>
  );
};

export default CarInfo;
