import { Resclinico } from "@/interfaces/Resclinico";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createResclinicoa = async (
  resclinico: Resclinico
): Promise<AxiosResponse> => await axios.post("/resclinicos/Savea", resclinico);

// Crear un Solo Registro
export const createResclinico = async (
  resclinico: Resclinico
): Promise<AxiosResponse> => await axios.put("/resclinico/create", resclinico);

// Leer Todos los registros
export const getResclinicos = async (): Promise<AxiosResponse<Resclinico[]>> =>
  await axios.get("/resclinico/list");

//Leer un solo Registro por ID
export const getResclinico = async (
  id: string
): Promise<AxiosResponse<Resclinico>> =>
  await axios.get(`/resclinico/get?id=${id}`);

//Leer el último Registro
export const getOneResclinico = async (): Promise<AxiosResponse<Resclinico>> =>
  await axios.get("/resclinicos/GetOne");

//Leer el último Registro Para Imprimir
export const getPrint = async (): Promise<AxiosResponse<Resclinico>> =>
  await axios.get("/resclinicos/GetPrint");

//Actualizar un Registro
export const updateResclinico = async (
  id: string,
  newResclinico: Resclinico
): Promise<AxiosResponse<Resclinico>> =>
  await axios.put(`/resclinico/update`, newResclinico);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteResclinico = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/resclinicos/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateResclinicos = async (
  resclinico: Resclinico
): Promise<AxiosResponse> => await axios.post("/resclinicos/delete", resclinico);

//Reportes----------------------------------------------------------------------------------------------------
// Get Resclinicos Agrupadas por Estatus
export const getresclinicosCant = async (): Promise<AxiosResponse<Resclinico[]>> =>
  await axios.get("/resclinicos/getGpedByStat");

// Get Resclinicos por Expediente
export const getResclinicosByExp = async (
  nombre: any
): Promise<AxiosResponse<Resclinico[]>> =>
  await axios.post("/resclinicos/getByExp", nombre);

// Get Resclinicos Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Resclinico[]>> =>
  await axios.get("/resclinicos/getfactsGpedByCli");

// Get Resclinicos Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Resclinico[]>> =>
  await axios.get("/resclinicos/getGpedByVitola");

//Resclinicoes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (resclinico: Resclinico): Promise<AxiosResponse> =>
  await axios.post("/resclinicos/updateOne", resclinico);
