import { useState } from 'react';
import './SearchBox.css';
import { ReactComponent as Spinner } from '../../icons/spinner-solid.svg';
import { addDashes } from '../../utils/addDashes';
import { useTranslation } from 'react-i18next';
import { FaCar, FaMotorcycle, FaTruck, FaBus, FaSearch } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import DataDisplay from '../DataDisplay/DataDisplay';
import { VehicleApiService, API_ENDPOINTS } from '../../services/apiService';
import ActionTypes from '../ActionTypes/ActionTypes';

interface SearchBoxProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

const SearchBox = ({ onCategorySelect, selectedCategory }: SearchBoxProps) => {
  const [shownPlate, setShownPlate] = useState<string>('');
  const [validPlate, setValidPlate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['info']);
  const [additionalMessage, setAdditionalMessage] = useState('');
  const { t } = useTranslation();

  const handleInput = (val: { target: { value: string } }) => {
    const plate = val.target.value;
    const rawValue = plate.replaceAll('-', '');
    const plateNum: boolean = !isNaN(Number(rawValue[rawValue.length - 1]));
    if (plateNum || rawValue === '') {
      if (shownPlate === '' && rawValue === '0')
        setError(t('search.errors.cantStartWithZero'));
      else {
        setError('');
        setShownPlate(rawValue);
        if (validPlate && rawValue.length < 7) setValidPlate(false);
        if (!validPlate && rawValue.length > 6) setValidPlate(true);
      }
    } else setError(t('search.errors.numbersOnly'));
  };

  const handleActionSelect = (actionType: string) => {
    if (actionType) {
      const types = [...selectedTypes];
      if (!types.includes(actionType)) {
        types.push(actionType);
        setSelectedTypes(types);
      } else {
        const newList = types.filter((t) => t !== actionType);
        setSelectedTypes(newList);
      }
    }
  };

  const handleActionClick = async () => {
    if (!validPlate || !shownPlate) {
      setError(t('search.errors.enterValidNumber'));
      return;
    }
    if (selectedTypes.length === 0) {
      setError(t('search.errors.selectActionType'));
      return;
    }
    setLoading(true);
    setError(null);
    setAdditionalMessage('');

    try {
      const results: { [key: string]: any } = {};
      const typesToFetch: string[] = [];

      // Check cache for each selected type
      for (const type of selectedTypes) {
        const cacheKey = VehicleApiService.getCacheKey(
          shownPlate,
          selectedCategory,
          type
        );
        const cachedData = VehicleApiService.getCachedData(cacheKey);

        if (cachedData) {
          results[type] = cachedData;
        } else {
          typesToFetch.push(type);
        }
      }

      // Fetch missing data from API
      for (const type of typesToFetch) {
        const data = await fetchDataByAction(type);
        results[type] = data;

        // Cache the result
        const cacheKey = VehicleApiService.getCacheKey(
          shownPlate,
          selectedCategory,
          type
        );
        VehicleApiService.setCachedData(cacheKey, data);
      }

      // Display results in modal
      setModalData(results);
      setModalTitle(getModalTitle(selectedTypes));
      setModalOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('common.error');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataByAction = async (actionType: string) => {
    switch (actionType) {
      case 'info':
        return await handleBasicInfo();
      case 'ownership':
        if (selectedCategory !== 'car') {
          throw new Error(t('errors.notAvailableForCategory'));
        }
        return await handleOwnershipHistory();
      case 'handicapped':
        if (selectedCategory !== 'car') {
          throw new Error(t('errors.notAvailableForCategory'));
        }
        return await handleHandicappedSign();
      case 'mileage':
        if (selectedCategory !== 'car') {
          throw new Error(t('errors.notAvailableForCategory'));
        }
        return await handleKilometrage();
      default:
        throw new Error(t('errors.unknownAction'));
    }
  };

  const handleBasicInfo = async () => {
    let endpoint = '';

    switch (selectedCategory) {
      case 'car':
        endpoint = API_ENDPOINTS.CARS.BASIC;
        break;
      case 'bike':
        endpoint = API_ENDPOINTS.BIKES.BASIC;
        break;
      case 'truck':
        endpoint = API_ENDPOINTS.TRUCKS.BASIC;
        break;
      case 'bus':
        endpoint = API_ENDPOINTS.BUSES.BASIC;
        break;
      default:
        throw new Error(t('errors.unknownCategory'));
    }

    const basicResponse = await VehicleApiService.fetchData(
      endpoint,
      shownPlate
    );

    if (
      !basicResponse.result.records ||
      basicResponse.result.records.length === 0
    ) {
      throw new Error(t('search.errors.noVehicleFound'));
    }

    const basicData = basicResponse.result.records[0];
    let finalData = basicData;

    // For cars, try to get detailed information
    if (selectedCategory === 'car') {
      const { degem_nm, degem_cd, shnat_yitzur } = basicData;

      if (
        degem_nm &&
        degem_cd &&
        shnat_yitzur &&
        degem_nm !== '' &&
        degem_cd !== 0 &&
        shnat_yitzur !== 0
      ) {
        try {
          const detailedResponse = await VehicleApiService.fetchDetailedCarData(
            degem_nm,
            degem_cd.toString(),
            shnat_yitzur.toString()
          );

          if (
            detailedResponse.result.records &&
            detailedResponse.result.records.length > 0
          ) {
            finalData = {
              basic: basicData,
              detailed: detailedResponse.result.records[0],
            };
          } else {
            setAdditionalMessage(t('modal.additionalDataNotAvailable'));
          }
        } catch (detailedError) {
          console.warn('Failed to fetch detailed data:', detailedError);
          setAdditionalMessage(t('modal.additionalDataNotAvailable'));
        }
      } else {
        setAdditionalMessage(t('modal.additionalDataNotAvailable'));
      }
    }

    return finalData;
  };

  const handleOwnershipHistory = async () => {
    const response = await VehicleApiService.fetchData(
      API_ENDPOINTS.CARS.OWNERSHIP,
      shownPlate
    );

    return response.result.records;
  };

  const handleHandicappedSign = async () => {
    const response = await VehicleApiService.fetchData(
      API_ENDPOINTS.CARS.HANDICAPPED,
      shownPlate
    );

    if (!response.result.records || response.result.records.length === 0) {
      // Instead of throwing an error, return a message indicating no handicapped sign
      return [];
    }

    return response.result.records[0];
  };

  const handleKilometrage = async () => {
    const response = await VehicleApiService.fetchData(
      API_ENDPOINTS.CARS.KILOMETRAGE,
      shownPlate
    );

    if (!response.result.records || response.result.records.length === 0) {
      return [];
    }

    return response.result.records[0];
  };

  const getModalTitle = (types: string[]): string => {
    if (types.length === 1) {
      const titles: { [key: string]: string } = {
        info: t('modal.titles.basicInfo'),
        ownership: t('modal.titles.ownershipHistory'),
        handicapped: t('modal.titles.handicappedSign'),
        mileage: t('modal.titles.kilometrage'),
      };
      return titles[types[0]] || t('modal.titles.default');
    } else {
      return t('modal.titles.multipleData');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalData(null);
    setModalTitle('');
    setAdditionalMessage('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedTypes(['info']);
    onCategorySelect(category);
  };

  return (
    <>
      <div className='input-box'>
        <div className='complex-search'>
          <input
            type='text'
            className={`search-bar ${shownPlate === '' ? '' : 'populated'}`}
            placeholder={t('search.placeholder')}
            value={addDashes(shownPlate)}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
          />

          <button
            className={`category-button ${
              selectedCategory === 'car' ? 'selected' : ''
            }`}
            onClick={() => handleCategorySelect('car')}
          >
            {(FaCar as any)({})}
          </button>
          <button
            className={`category-button ${
              selectedCategory === 'bike' ? 'selected' : ''
            }`}
            onClick={() => handleCategorySelect('bike')}
          >
            {(FaMotorcycle as any)({})}
          </button>
          <button
            className={`category-button ${
              selectedCategory === 'truck' ? 'selected' : ''
            }`}
            onClick={() => handleCategorySelect('truck')}
          >
            {(FaTruck as any)({})}
          </button>
          <button
            className={`category-button ${
              selectedCategory === 'bus' ? 'selected' : ''
            }`}
            onClick={() => handleCategorySelect('bus')}
          >
            {(FaBus as any)({})}
          </button>

          <button className='go-button' onClick={handleActionClick}>
            {loading ? (
              <Spinner className='search-spinner' fill='white' />
            ) : (
              (FaSearch as any)({})
            )}
          </button>
        </div>

        {/* {loading && <Spinner className='search-spinner' fill='black' />} */}

        <ActionTypes
          category={selectedCategory}
          types={selectedTypes}
          onClick={handleActionSelect}
          isLoading={loading}
        />

        {error && <div className='input-box-error'>{error}</div>}
      </div>

      <Modal isOpen={modalOpen} onClose={handleModalClose} title={modalTitle}>
        {modalData && (
          <DataDisplay
            data={modalData}
            selectedTypes={selectedTypes}
            additionalMessage={additionalMessage}
          />
        )}
      </Modal>
    </>
  );
};

export default SearchBox;
