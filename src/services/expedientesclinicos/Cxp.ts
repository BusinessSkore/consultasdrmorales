import { Cxp } from "@/interfaces/Cxp";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createCxpa = async (
  cxp: Cxp
): Promise<AxiosResponse> => await axios.post("/cxps/Savea", cxp);

// Crear un Solo Registro
export const createCxp = async (cxp: Cxp): Promise<AxiosResponse> =>
  await axios.post("/cxps/Save", cxp);

// Leer Todos los registros
export const getCxps = async (): Promise<AxiosResponse<Cxp[]>> =>
  await axios.get("/cxps/get");

//Leer un solo Registro por ID
export const getCxp = async (id: string): Promise<AxiosResponse<Cxp>> =>
  await axios.get(`/cxps/GetById/${id}`);

//Leer el último Registro
export const getOneCxp = async (): Promise<AxiosResponse<Cxp>> =>
  await axios.get("/cxps/GetOne");

//Actualizar un Registro
export const updateCxp = async (
  id: string,
  newCxp: Cxp
): Promise<AxiosResponse<Cxp>> =>
  await axios.put(`/cxps/Update/${id}`, newCxp);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteCxp = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/cxps/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateCxps = async (
  cxp: Cxp
): Promise<AxiosResponse> => await axios.post("/cxps/delete", cxp);

//Reportes----------------------------------------------------------------------------------------------------
// Get Cxps Agrupadas por Estatus
export const getcxpsCant = async (): Promise<AxiosResponse<Cxp[]>> =>
  await axios.get("/cxps/getGpedByStat");

// Get Cxps Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Cxp[]>> =>
  await axios.get("/cxps/getfactsGpedByCli");

//Cxpes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (cxp: Cxp): Promise<AxiosResponse> =>
  await axios.post("/cxps/updateOne", cxp);
