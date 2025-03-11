export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  lastUpdate: string;
  isUpdating: boolean;
}

export interface ExtendedPatient extends Patient {
  teeth: {
    caries: boolean;
    pulpitis: boolean;
    periodontitis: boolean;
    missing: boolean;
    crown: boolean;
    implant: boolean;
  };
  gums: {
    gingivitis: boolean;
    recession: boolean;
    bleeding: boolean;
    swelling: boolean;
  };
  tmj: {
    clicks: boolean;
    pain: boolean;
    limitedOpening: boolean;
    locking: boolean;
    hypermobility: boolean;
  };
  muscles: {
    palpationPain: boolean;
    spasm: boolean;
    hypertonus: boolean;
    asymmetry: boolean;
    fatigue: boolean;
  };
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
