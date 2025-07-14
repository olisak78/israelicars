import { useTranslation } from 'react-i18next';
import './DataDisplay.css';
import { HIDDEN_FIELDS } from '../../utils/types';

interface DataDisplayProps {
  data: any;
  selectedTypes: string[];
  additionalMessage?: string;
}

const DataDisplay = ({
  data,
  selectedTypes,
  additionalMessage,
}: DataDisplayProps) => {
  const { t } = useTranslation();

  const formatFieldName = (key: string): string => {
    // Convert snake_case and other formats to readable labels
    const fieldMappings: { [key: string]: string } = {
      mispar_rechev: t('fields.vehicleNumber'),
      tozeret_nm: t('fields.manufacturer'),
      degem_nm: t('fields.model'),
      shnat_yitzur: t('fields.manufacturingYear'),
      sug_delek_nm: t('fields.fuelType'),
      mishkal_kolel: t('fields.totalWeight'),
      baalut: t('fields.ownership'),
      tokef_dt: t('fields.validUntil'),
      mivchan_acharon_dt: t('fields.lastTest'),
      tzeva_rechev: t('fields.color'),
      moed_aliya_lakvish: t('fields.onRoadFrom'),
      zmig_kidmi: t('fields.frontTire'),
      zmig_ahori: t('fields.rearTire'),
      misgeret: t('fields.chassis'),
      ramat_gimur: t('fields.trimLevel'),
      kilometer_test_aharon: t('fields.lastTestKilometers'),
      rishum_rishon_dt: t('fields.firstRegistration'),
      baalut_dt: t('fields.ownershipDate'),
      'MISPAR RECHEV': t('fields.vehicleNumber'),
      'TAARICH HAFAKAT TAG': t('fields.tagIssueDate'),
      'SUG TAV': t('fields.tagType'),
      mispar_manoa: t('fields.engineNumber'),
      nefach_manoa: t('fields.engineVolume'),
      koah_sus: t('fields.horsePower'),
      mispar_moshavim: t('fields.seatsNumber'),
      mishkal_azmi: t('fields.axleWeight'),
      hanaa_nm: t('fields.propulsion'),
      grira_nm: t('fields.towing'),
      kvutzat_sug_rechev: t('fields.vehicleTypeGroup'),
      sug_rechev_nm: t('fields.vehicleType'),
      tozeret_eretz_nm: t('fields.manufacturerCountry'),
      ramat_eivzur_betihuty: t('fields.safetyEquipmentLevel'),
      kvutzat_zihum: t('fields.pollutionGroup'),
      degem_manoa: t('fields.engineModel'),
      kinuy_mishari: t('fields.commercialName'),
      tozar: t('fields.manufacturer'),
      kvuzat_agra_cd: t('fields.taxGroup'),
      nefah_manoa: t('fields.engineVolume'),
      gova: t('fields.height'),
      mazgan_ind: t('fields.ac'),
      abs_ind: t('fields.abs'),
      mispar_kariot_avir: t('fields.airbagsNumber'),
      hege_koah_ind: t('fields.powerSteer'),
      automatic_ind: t('fields.automatic'),
      mispar_halonot_hashmal: t('fields.electricWindows'),
      halon_bagg_ind: t('fields.sunRoof'),
      galgaley_sagsoget_kala_ind: t('fields.alloyWheels'),
      merkav: t('fields.carBodyStyle'),
      delek_nm: t('fields.fuelType'),
      mispar_dlatot: t('fields.doorsNumber'),
      bakarat_yatzivut_ind: t('fields.stabilityControl'),
      kosher_grira_im_blamim: t('fields.towingCapacityWithBrakes'),
      kosher_grira_bli_blamim: t('fields.towingCapacityWithoutBrakes'),
      sug_tkina_nm: t('fields.standard'),
      bakarat_stiya_menativ_ind: t('fields.correctionOfLaneDeparture'),
      nitur_merhak_milfanim_ind: t('fields.frontDistanceControl'),
      zihuy_beshetah_nistar_ind: t('fields.hiddenAreaDetection'),
      bakarat_shyut_adaptivit_ind: t('fields.cruiseControl'),
      zihuy_holchey_regel_ind: t('fields.pedestriansDetection'),
      maarechet_ezer_lebalam_ind: t('fields.breakAssistance'),
      matzlemat_reverse_ind: t('fields.reverseCamera'),
      hayshaney_lahatz_avir_batzmigim_ind: t('fields.airPressureMonitor'),
      hayshaney_hagorot_ind: t('fields.beltsMonitor'),
      nikud_betihut: t('fields.safetyScore'),
      teura_automatit_benesiya_kadima_ind: t('fields.autoFrontLights'),
      shlita_automatit_beorot_gvohim_ind: t('fields.highLightsControl'),
      zihuy_matzav_hitkarvut_mesukenet_ind: t(
        'fields.dangerousApproachDetection'
      ),
      zihuy_tamrurey_tnua_ind: t('fields.roadSignsDetection'),
      zihuy_rechev_do_galgali: t('fields.bikeDetection'),
      mida_zmig_kidmi: t('fields.frontTire'),
      hespek: t('fields.horsePower'),
      mispar_shilda: t('fields.chassis'),
      operator_nm: t('fields.operator'),
      cluster_nm: t('fields.cluster'),
      bus_license_id: t('fields.busLicense'),
      stone_proof_nm: t('fields.stoneProof'),
      bullet_proof_nm: t('fields.bulletProof'),
      BusSize_nm: t('fields.busSize'),
      BusType_nm: t('fields.busType'),
      SeatsNum: t('fields.seatsNumber'),
      production_year: t('fields.manufacturingYear'),
      production_country: t('fields.manufacturerCountry'),
      PropulsionType_nm: t('fields.fuelType'),
      total_kilometer: t('fields.lastTestKilometers'),
    };

    return (
      fieldMappings[key] ||
      key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    );
  };

  const formatValue = (value: any, key?: string): string => {
    if (value === null || value === undefined) {
      return t('common.na');
    }
    if (typeof value === 'boolean') {
      return value ? t('common.yes') : t('common.no');
    }
    if (typeof value === 'number' && key === 'TAARICH HAFAKAT TAG') {
      const year = value.toString().substring(0, 4);
      const month = value.toString().substring(4, 6);
      return `${month}-${year}`;
    }
    return String(value);
  };

  const renderArrayData = (dataArray: any[]) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return <div className='no-data-message'>{t('common.noDataFound')}</div>;
    }

    // Sort ownership history by ownership date
    const sortedData = [...dataArray].sort((a, b) => {
      const dateA = String(a.baalut_dt || '');
      const dateB = String(b.baalut_dt || '');
      return dateB.localeCompare(dateA);
    });

    // Get headers excluding hidden fields
    const headers = Object.keys(sortedData[0]).filter(
      (key) =>
        !key.startsWith('_') && !HIDDEN_FIELDS.includes(key.toLowerCase())
    );

    if (headers.length === 0) {
      return <div className='no-data-message'>{t('common.noDataFound')}</div>;
    }

    // Helper function to format values with date handling
    const formatTableValue = (value: any, key: string) => {
      // Format ownership date
      if (key === 'baalut_dt' && typeof value === 'number') {
        const year = value.toString().substring(0, 4);
        const month = value.toString().substring(4, 6);
        return `${month}-${year}`;
      }
      return formatValue(value);
    };

    return (
      <table className='data-table'>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>{formatFieldName(key)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {headers.map((key) => (
                <td key={key}>{formatTableValue(item[key], key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderObjectData = (dataObject: any) => {
    const filteredEntries = Object.entries(dataObject).filter(
      ([key]) =>
        !key.startsWith('_') && !HIDDEN_FIELDS.includes(key.toLowerCase())
    );

    if (filteredEntries.length === 0) {
      return <div className='no-data-message'>{t('common.noDataFound')}</div>;
    }

    return (
      <div className='data-grid'>
        {filteredEntries.map(([key, value]) => (
          <div key={key} className='data-item'>
            <div className='data-label'>{formatFieldName(key)}</div>
            <div className='data-value'>{formatValue(value, key)}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderBasicCarInfo = (basicData: any, detailedData?: any) => {
    return (
      <div>
        <h3>{t('modal.basicInformation')}</h3>
        {renderObjectData(basicData)}

        {detailedData && (
          <div style={{ marginBottom: '2vh' }}>
            <h3>{t('modal.detailedInformation')}</h3>
            {renderObjectData(detailedData)}
          </div>
        )}

        {!detailedData && additionalMessage && (
          <div className='warning-message'>{additionalMessage}</div>
        )}
      </div>
    );
  };

  const renderHandicappedData = (handicappedData: any) => {
    if (!handicappedData || handicappedData.length === 0) {
      return <div className='no-data-message'>{t('common.noDataFound')}</div>;
    }
    if (handicappedData && handicappedData.status && handicappedData.message) {
      return (
        <div className='info-message'>
          <strong>{handicappedData.status}</strong>
          <br />
          {handicappedData.message}
        </div>
      );
    }

    // Regular handicapped data display
    return renderObjectData(handicappedData);
  };

  const renderMileageData = (mileageData: any) => {
    if (!mileageData || mileageData.length === 0) {
      return <div className='no-data-message'>{t('common.noDataFound')}</div>;
    }
    if (mileageData && mileageData.status && mileageData.message) {
      return (
        <div className='info-message'>
          <strong>{mileageData.status}</strong>
          <br />
          {mileageData.message}
        </div>
      );
    }

    // Regular handicapped data display
    return renderObjectData(mileageData);
  };

  const getTypeTitle = (type: string): string => {
    const titles: { [key: string]: string } = {
      info: t('modal.titles.basicInfo'),
      ownership: t('modal.titles.ownershipHistory'),
      handicapped: t('modal.titles.handicappedSign'),
      mileage: t('modal.titles.kilometrage'),
    };
    return titles[type] || '';
  };

  const renderMultipleTypes = () => {
    // Define the desired order for displaying data types
    const orderedTypes = ['info', 'mileage', 'handicapped', 'ownership'];

    // Filter to only include types that are selected and have data
    const typesToDisplay = orderedTypes.filter(
      (type) => selectedTypes.includes(type) && data[type]
    );

    return (
      <div>
        {typesToDisplay.map((type, index) => {
          const typeData = data[type];

          return (
            <div
              key={type}
              className={`type-section ${
                index === typesToDisplay.length - 1 ? 'last-section' : ''
              }`}
            >
              <h3 className='section-title'>{getTypeTitle(type)}</h3>

              {type === 'info' && typeData.detailed
                ? renderBasicCarInfo(typeData.basic, typeData.detailed)
                : type === 'info'
                ? renderBasicCarInfo(typeData, null)
                : type === 'ownership'
                ? renderArrayData(
                    Array.isArray(typeData) ? typeData : [typeData]
                  )
                : type === 'handicapped'
                ? renderHandicappedData(typeData)
                : type === 'mileage'
                ? renderMileageData(typeData)
                : renderObjectData(typeData)}
            </div>
          );
        })}

        {additionalMessage && (
          <div className='warning-message'>{additionalMessage}</div>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderMultipleTypes()}
      {additionalMessage &&
        selectedTypes.length === 1 &&
        selectedTypes[0] !== 'info' && (
          <div className='warning-message'>{additionalMessage}</div>
        )}
    </div>
  );
};

export default DataDisplay;
