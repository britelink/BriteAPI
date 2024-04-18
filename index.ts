import axios, { AxiosInstance } from "axios";
import { Appointment, Patient, Premise, Provider } from "./typings";

export class BriteAPI {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("API key is required for BriteAPI.");
    }
    this.client = axios.create({
      baseURL: "https://www.britelink.io/api/v1/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  // Helper methods for HTTP operations
  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await this.client.get<T>(endpoint);
    return response.data;
  }

  private async create<T>(
    endpoint: string,
    data: any,
    queryParams: Record<string, any> = {}
  ): Promise<T> {
    const url = new URL(endpoint, this.client.defaults.baseURL);
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key])
    );
    const response = await this.client.post<T>(url.toString(), data);
    return response.data;
  }

  private async update<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.client.put<T>(endpoint, data);
    return response.data;
  }

  private async delete(endpoint: string, id: number): Promise<void> {
    await this.client.delete(endpoint, { data: { id } });
  }

  // Patient methods
  fetchPatients(): Promise<Patient[]> {
    return this.fetch<Patient[]>("/patients");
  }

  createPatient(
    data: Patient,
    useInternalDb: boolean = false
  ): Promise<Patient> {
    return this.create<Patient>("/patients", data, { useInternalDb });
  }

  updatePatient(id: number, patientData: Patient): Promise<Patient> {
    return this.update<Patient>(`/patients`, { id, patientData });
  }
  deletePatient(id: number): Promise<void> {
    return this.delete("/patients", id);
  }

  // Premise methods
  fetchPremises(): Promise<Premise[]> {
    return this.fetch<Premise[]>("/premises");
  }

  createPremise(
    data: Premise,
    useInternalDb: boolean = false
  ): Promise<Premise> {
    return this.create<Premise>("/premises", data, { useInternalDb });
  }

  updatePremise(id: number, premiseData: Premise): Promise<Premise> {
    return this.update<Premise>(`/premises/`, { id, premiseData });
  }

  deletePremise(id: number): Promise<void> {
    return this.delete(`/premises`, id);
  }

  // Provider methods
  fetchProviders(): Promise<Provider[]> {
    return this.fetch<Provider[]>("/providers");
  }

  createProvider(
    data: Provider,
    useInternalDb: boolean = false
  ): Promise<Provider> {
    return this.create<Provider>("/providers", data, { useInternalDb });
  }

  updateProvider(id: number, providerData: Provider): Promise<Provider> {
    return this.update<Provider>(`/providers/`, { id, providerData });
  }

  deleteProvider(id: number): Promise<void> {
    return this.delete(`/providers`, id);
  }

  // Appointment methods
  fetchAppointments(): Promise<Appointment[]> {
    return this.fetch<Appointment[]>("/appointments");
  }

  createAppointment(
    data: Appointment,
    useInternalDb: boolean = false
  ): Promise<Appointment> {
    return this.create<Appointment>("/appointments", data, { useInternalDb });
  }

  updateAppointment(
    id: number,
    appointmentData: Appointment
  ): Promise<Appointment> {
    return this.update<Appointment>("/appointments", { id, appointmentData });
  }

  deleteAppointment(id: number): Promise<void> {
    return this.delete(`/appointments`, id);
  }
}
