import { Licencia } from "@/interfaces/Licencia";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createLicenciaa = async (
  licencia: Licencia
): Promise<AxiosResponse> => await axios.post("/licencias/Savea", licencia);

// Crear un Solo Registro
export const createLicencia = async (
  licencia: Licencia
): Promise<AxiosResponse> => await axios.post("/licencias/Save", licencia);

// Leer Todos los registros
export const getLicencias = async (): Promise<AxiosResponse<Licencia[]>> =>
  await axios.get("/licencias/get");

//Leer un solo Registro por ID
export const getLicencia = async (
  id: string
): Promise<AxiosResponse<Licencia>> =>
  await axios.get(`/licencias/GetById/${id}`);

//Leer el último Registro
export const getOneLicencia = async (): Promise<AxiosResponse<Licencia>> =>
  await axios.get("/licencias/GetOne");

//Leer el último Registro Para Imprimir
export const getPrint = async (): Promise<AxiosResponse<Licencia>> =>
  await axios.get("/licencias/GetPrint");

//Actualizar un Registro
export const updateLicencia = async (
  id: string,
  newLicencia: Licencia
): Promise<AxiosResponse<Licencia>> =>
  await axios.put(`/licencias/Update/${id}`, newLicencia);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteLicencia = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/licencias/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateLicencias = async (
  licencia: Licencia
): Promise<AxiosResponse> => await axios.post("/licencias/delete", licencia);

//Reportes----------------------------------------------------------------------------------------------------
// Get Licencias Agrupadas por Estatus
export const getlicenciasCant = async (): Promise<AxiosResponse<Licencia[]>> =>
  await axios.get("/licencias/getGpedByStat");

// Get Licencias por Expediente
export const getLicenciasByExp = async (
  nombre: any
): Promise<AxiosResponse<Licencia[]>> =>
  await axios.post("/licencias/getByExp", nombre);

// Get Licencias Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Licencia[]>> =>
  await axios.get("/licencias/getfactsGpedByCli");

// Get Licencias Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Licencia[]>> =>
  await axios.get("/licencias/getGpedByVitola");

//Licenciaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (licencia: Licencia): Promise<AxiosResponse> =>
  await axios.post("/licencias/updateOne", licencia);
