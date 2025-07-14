// API endpoints for different vehicle data
export const API_ENDPOINTS = {
  CARS: {
    BASIC:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3',
    DETAILED:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40',
    KILOMETRAGE:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=56063a99-8a3e-4ff4-912e-5966c0279bad',
    HANDICAPPED:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e',
    OWNERSHIP:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=bb2355dc-9ec7-4f06-9c3f-3344672171da',
  },
  BIKES: {
    BASIC:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f',
  },
  TRUCKS: {
    BASIC:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790',
  },
  BUSES: {
    BASIC:
      'https://data.gov.il/api/3/action/datastore_search?resource_id=91d298ed-a260-4f93-9d50-d5e3c5b82ce1',
  },
};

export interface ApiResponse {
  success: boolean;
  result: {
    records: any[];
    total: number;
  };
}

export class VehicleApiService {
  // Generic API call function
  static async fetchData(
    url: string,
    vehicleNumber: string
  ): Promise<ApiResponse> {
    const fullUrl = `${url}&q=${vehicleNumber}`;

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error('API call was not successful');
      }

      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  // Fetch detailed car data (second API call)
  static async fetchDetailedCarData(
    degem_nm: string,
    degem_cd: string,
    shnat_yitzur: string
  ): Promise<ApiResponse> {
    const url = `${API_ENDPOINTS.CARS.DETAILED}&q=${degem_nm}&q=${degem_cd}&q=${shnat_yitzur}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error('Detailed API call was not successful');
      }

      return data;
    } catch (error) {
      console.error('Detailed API fetch error:', error);
      throw error;
    }
  }

  // Cache management
  static getCachedData(key: string): any {
    try {
      const cached = localStorage.getItem(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  static setCachedData(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  // Get cache key for different data types including category
  static getCacheKey(
    vehicleNumber: string,
    category: string,
    actionType: string
  ): string {
    return `vehicle_${vehicleNumber}_${category}_${actionType}`;
  }
}
