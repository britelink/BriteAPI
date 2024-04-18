import { Appointment, Patient, Premise, Provider } from "./typings";

export declare class BriteAPI {
  /**
   * Constructs the API client with a provided API key.
   * @param apiKey The API key for authentication
   */
  constructor(apiKey: string);

  /**
   * Generic fetch method for retrieving data from a specific endpoint.
   * @param endpoint The endpoint URL to fetch data from
   * @returns A promise resolving to the response data
   */
  fetch(endpoint: string): Promise<any>;

  // Patient-related methods
  fetchPatients(): Promise<Patient[]>;
  createPatient(data: Patient, useInternalDb?: boolean): Promise<Patient>;
  updatePatient(id: number, patientData: Patient): Promise<Patient>;
  deletePatient(id: number): Promise<string>;

  // Premise-related methods
  fetchPremises(): Promise<Premise[]>;
  createPremise(data: Premise, useInternalDb?: boolean): Promise<Premise>;
  updatePremise(id: number, premiseData: Premise): Promise<Premise>;
  deletePremise(id: number): Promise<string>;

  // Provider-related methods
  fetchProviders(): Promise<Provider[]>;
  createProvider(data: Provider, useInternalDb?: boolean): Promise<Provider>;
  updateProvider(id: number, providerData: Provider): Promise<Provider>;
  deleteProvider(id: number): Promise<string>;
  fetchProvidersByPremise(premiseId: number): Promise<Provider[]>;
  fetchProvider(id: number): Promise<Provider>;

  // Appointment-related methods
  fetchAppointments(): Promise<Appointment[]>;
  createAppointment(
    data: Appointment,
    useInternalDb?: boolean
  ): Promise<Appointment>;
  updateAppointment(
    id: number,
    appointmentData: Appointment
  ): Promise<Appointment>;
  deleteAppointment(id: number): Promise<string>;
}
