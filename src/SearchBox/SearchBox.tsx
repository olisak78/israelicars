import { useState } from 'react';
import './SearchBox.css';
import { ReactComponent as Spinner } from '../icons/spinner-solid.svg';
import { addDashes } from '../utils/addDashes';
import {
  CAR_API_URL,
  CarApiResponse,
  CarRecord,
  STORAGE_KEY,
} from '../utils/types';

interface SearchBoxProps {
  onCarFound: (carRecord: CarRecord) => void;
  onError: (error: string) => void;
}

const SearchBox = ({ onCarFound, onError }: SearchBoxProps) => {
  const [shownPlate, setShownPlate] = useState<string>('');
  const [validPlate, setValidPlate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get cached car record from local storage
  const getCachedRecord = (carNumber: string): CarRecord | null => {
    setError(null);
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsedCache = JSON.parse(cached);
        return parsedCache[carNumber] || null;
      }
    } catch (error) {
      setError(`Error reading from cache: ${error}`);
    }
    return null;
  };

  // Save car record to local storage
  const cacheRecord = (carNumber: string, record: CarRecord): void => {
    try {
      setError(null);
      const cached = localStorage.getItem(STORAGE_KEY);
      const parsedCache = cached ? JSON.parse(cached) : {};
      parsedCache[carNumber] = record;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCache));
    } catch (error) {
      setError(`Error saving to cache: ${error}`);
    }
  };

  // Fetch car data from API
  const fetchCarData = async (carNumber: string) => {
    setError(null);
    setLoading(true);
    const url = `${CAR_API_URL}${carNumber}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CarApiResponse = await response.json();

      if (!data.success) {
        throw new Error('API request was not successful');
      }

      if (!data.result.records || data.result.records.length === 0) {
        throw new Error('No vehicle found with this license number');
      }

      return data?.result?.records[0];
    } catch (error) {
      setError(`API fetch error: ${error}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (val: { target: { value: string } }) => {
    const plate = val.target.value;
    const rawValue = plate.replaceAll('-', '');
    const plateNum: boolean = !isNaN(Number(rawValue[rawValue.length - 1]));
    if (plateNum || rawValue === '') {
      if (shownPlate === '' && rawValue === '0')
        setError("License can't begin with zero!");
      else {
        setError('');
        setShownPlate(rawValue);
        if (validPlate && rawValue.length < 7) setValidPlate(false);
        if (!validPlate && rawValue.length > 6) setValidPlate(true);
      }
    } else setError('Please enter numbers only!');
  };

  const handleSearch = async () => {
    console.log(`started search for car number ${shownPlate}`);
    if (!validPlate || !shownPlate) return;

    setLoading(true);
    setError(null);

    try {
      // First, check if we have cached data
      const cachedRecord = getCachedRecord(shownPlate);

      if (cachedRecord) {
        onCarFound(cachedRecord);
        return;
      }

      // If not cached, fetch from API
      const carRecord = await fetchCarData(shownPlate);

      if (carRecord) {
        // Cache the result
        cacheRecord(shownPlate, carRecord);
        // Pass the data to parent component
        onCarFound(carRecord);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while searching';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='input-main-title'>Enter License Number</div>
      <div className='input-box'>
        {!error && <div className='input-box-title'>License Plate Number</div>}
        {error && <div className='input-box-error'>{error}</div>}
        <input
          type='text'
          className='input-box-search'
          placeholder='Enter numbers only'
          maxLength={10}
          value={addDashes(shownPlate)}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === ' ') e.preventDefault();
          }}
        ></input>
        {loading && <Spinner className='search-spinner' fill='black' />}
        {!loading && (
          <button
            disabled={!validPlate}
            onClick={handleSearch}
            className={`search-button ${validPlate && 'valid'}`}
          >
            Search Vehicle
          </button>
        )}
      </div>
    </>
  );
};

export default SearchBox;
