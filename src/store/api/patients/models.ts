export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  lastUpdate: string;
  isUpdating: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface GetPatientsParams {
  page?: number;
  perPage?: number;
}

export type PaginatedPatients = PaginatedResponse<Patient>;
