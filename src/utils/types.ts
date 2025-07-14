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

export const HIDDEN_FIELDS = [
  'mispar_rechev',
  'mispar rechev',
  'galgaley_sagsoget_kala_ind',
  'delek_cd',
  'mkoriut_nm',
  'shinui_zmig_ind',
  'shnui_zeva_ind',
  'bakarat_yatzivut_ind',
  'technologiat_hanaa_nm',
  'kamut_CO2',
  'kamut_NOX',
  'kamut_PM10',
  'kamut_HC',
  'kamut_HC_NOX',
  'kamut_CO',
  'kamut_CO2_city',
  'kamut_NOX_city',
  'kamut_PM10_city',
  'kamut_HC_city',
  'kamut_CO_cityl',
  'kamut_CO2_hway',
  'kamut_NOX_hway',
  'kamut_PM10_hway',
  'kamut_HC_hway',
  'kamut_CO_hway',
  'madad_yarok',
  'bakarat_stiya_menativ_ind',
  'bakarat_stiya_menativ_makor_hatkana',
  'nitur_merhak_milfanim_ind',
  'nitur_merhak_milfanim_makor_hatkana',
  'zihuy_beshetah_nistar_ind',
  'bakarat_shyut_adaptivit_ind',
  'zihuy_holchey_regel_ind',
  'zihuy_holchey_regel_makor_hatkana',
  'maarechet_ezer_labalam_ind',
  'matzlemat_reverse_ind',
  'hayshaney_lahatz_avir_batzmigim_ind',
  'hayshaney_hagorot_ind',
  'teura_automatit_benesiya_kadima_ind',
  'shlita_automatit_beorot_gvohim_ind',
  'shlita_automatit_beorot_gvohim_makor_hatkana',
  'zihuy_matzav_hitkarvut_mesukenet_ind',
  'zihuy_tamrurey_tnua_ind',
  'zihuy_rechev_do_galgali',
  'ihuy_tamrurey_tnua_makor_hatkana',
  'CO2_WLTP',
  'HC_WLTP',
  'PM_WLTP',
  'NOX_WLTP',
  'CO_WLTP',
  'CO2_WLTP_NEDC',
  'bakarat_stiya_activ_s',
  'blima_otomatit_nesia_leahor',
  'bakarat_mehirut_isa',
  'blimat_hirum_lifnei_holhei_regel_ofanaim',
  'hitnagshut_cad_shetah_met',
  'alco_lock',
  'dg_metach_solela',
  'rank',
  'shinui_mivne_ind',
  'gapam_ind',
  'co2_wltp_nedc',
  'co_wltp',
  'nox_wltp',
  'pm_wltp',
  'hc_wltp',
  'co2_wltp',
  'zihuy_tamrurey_tnua_makor_hatkana',
  'kamut_co_hway',
  'kamut_pm10_hway',
  'kamut_nox_hway',
  'kamut_co2_hway',
  'kamut_hc_hway',
  'kamut_co_city',
  'kamut_hc_city',
  'kamut_pm10_city',
  'kamut_nox_city',
  'kamut_co2_city',
  'kamut_co',
  'kamut_hc_nox',
  'kamut_hc',
  'kamut_pm10',
  'kamut_nox',
  'kamut_co2',
  'technologiat_hanaa_cd',
  'sug_mamir_nm',
  'sug_mamir_cd',
  'sug_tkina_cd',
  'argaz_ind',
  'halonot_hashmal_source',
  'kariot_avir_source',
  'hanaa_cd',
  'degem_cd',
  'tozeret_cd',
  'sug_degem',
  'horaat_rishum',
  'zmig_ahori',
  'tzeva_cd',
  'mazgan_ind',
  'abs_ind',
  'mispar_kariot_avir',
  'hege_koah_ind',
  'automatic_ind',
  'mispar_halonot_hashmal',
  'sug_delek_cd',
  'mida_zmig_ahori',
  'kod_omes_zmig_kidmi',
  'kod_omes_zmig_ahori',
  'kod_mehirut_zmig_kidmi',
  'kod_mehirut_zmig_ahori',
  'sug_rechev_eu_cd',
  'sug_rechev_cd',
  'mispar_mekomot_leyd_nahag',
  'mispar_mekomot',
  'tkina_eu',
  'mishkal_mitan_harama',
];
