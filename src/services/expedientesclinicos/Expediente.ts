import { Expediente } from "@/interfaces/Expediente";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createExpedientea = async (expediente: Expediente): Promise<AxiosResponse> =>
  await axios.post("/expedientes/Savea", expediente);

// Crear un Solo Registro
export const createExpediente = async (expediente: Expediente): Promise<AxiosResponse> =>
  await axios.post("/expedientes/Save", expediente);

// // Leer Todos los registros
// export const getExpedientes = async (): Promise<AxiosResponse<Expediente[]>> =>
//   await axios.get("/expedientes/get");

// //Leer Registros por Medico
// export const getExpedientes = async (medico: string): Promise<AxiosResponse> =>
//   await axios.get(`/expedientes/get`, medico);

  // Crear un Solo Registro
export const getExpedientes = async (medico: string): Promise<AxiosResponse> =>
await axios.post("/expedientes/get", medico);

//Leer un solo Registro por ID
export const getExpediente = async (id: string): Promise<AxiosResponse<Expediente>> =>
  await axios.get(`/expedientes/GetById/${id}`);

// Leer Un registro segun criterio
export const GetByAflNSS = async (aflNSS: string): Promise<AxiosResponse<Expediente>> =>
  await axios.get(`/expedientes/GetByAflNSS/${aflNSS}`);

//Leer el último Registro
export const getOneExpediente = async (): Promise<AxiosResponse<Expediente>> =>
  await axios.get("/expedientes/GetOne");

//Actualizar un Registro
export const updateExpediente = async (
  id: string,
  newExpediente: Expediente
): Promise<AxiosResponse<Expediente>> =>
  await axios.put(`/expedientes/Update/${id}`, newExpediente);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteExpediente = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/expedientes/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateExpedientes = async (expediente: Expediente): Promise<AxiosResponse> =>
  await axios.post("/expedientes/delete", expediente);

//Reportes----------------------------------------------------------------------------------------------------
// Get Expedientes Agrupadas por Estatus
export const getexpedientesCant = async (): Promise<AxiosResponse<Expediente[]>> =>
  await axios.get("/expedientes/getGpedByStat");

// Get Expedientes Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Expediente[]>> =>
  await axios.get("/expedientes/getfactsGpedByCli");

// Get Expedientes Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Expediente[]>> =>
  await axios.get("/expedientes/getGpedByVitola");

//Expedientees----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (expediente: Expediente): Promise<AxiosResponse> =>
  await axios.post("/expedientes/updateOne", expediente);
