export interface CarRecord {
  _id: number;
  mispar_rechev: number;
  tozeret_cd: number;
  sug_degem: string;
  tozeret_nm: string;
  degem_cd: number;
  degem_nm: string;
  ramat_gimur: string;
  ramat_eivzur_betihuty: number;
  kvutzat_zihum: number;
  shnat_yitzur: number;
  degem_manoa: string;
  mivchan_acharon_dt: string;
  tokef_dt: string;
  baalut: string;
  misgeret: string;
  tzeva_cd: number;
  tzeva_rechev: string;
  zmig_kidmi: string;
  zmig_ahori: string;
  sug_delek_nm: string;
  horaat_rishum: number;
  moed_aliya_lakvish: string;
  kinuy_mishari: string;
  rank: number;
}

export interface CarApiResponse {
  success: boolean;
  result: {
    records: CarRecord[];
    total: number;
  };
}

export const STORAGE_KEY = 'carRecordsCache';
export const CAR_API_URL =
  'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=';
