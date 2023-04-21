import { Facturaa } from "@/interfaces/Facturaa";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createFacturaaa = async (
  facturaa: Facturaa
): Promise<AxiosResponse> => await axios.post("/facturaas/Savea", facturaa);

// Crear un Solo Registro
export const createFacturaa = async (
  facturaa: Facturaa
): Promise<AxiosResponse> => await axios.post("/facturaas/Save", facturaa);

// Leer Todos los registros
export const getFacturaas = async (criterio: any): Promise<AxiosResponse<Facturaa[]>> =>
  await axios.post("/facturaas/get", criterio);

// Leer Todos los registros de un Especialista
export const getServsByEsp = async (criterio: any): Promise<AxiosResponse<Facturaa[]>> =>
  await axios.post("/facturaas/getServsByEsp", criterio);

//Leer un solo Registro por ID
export const getFacturaa = async (
  id: string
): Promise<AxiosResponse<Facturaa>> =>
  await axios.get(`/facturaas/GetById/${id}`);

//Leer el último Registro
export const getOneFacturaa = async (): Promise<AxiosResponse<Facturaa>> =>
  await axios.get("/facturaas/GetOne");

//Actualizar un Registro
export const updateFacturaa = async (
  id: string,
  newFacturaa: Facturaa
): Promise<AxiosResponse<Facturaa>> =>
  await axios.put(`/facturaas/Update/${id}`, newFacturaa);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteFacturaa = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/facturaas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateFacturaas = async (
  facturaa: Facturaa
): Promise<AxiosResponse> => await axios.post("/facturaas/delete", facturaa);

//Reportes----------------------------------------------------------------------------------------------------
// Get Facturaas Agrupados por Día
export const getproddayli = async (): Promise<AxiosResponse<Facturaa[]>> =>
  await axios.get("/facturaas/getproddayli");

// Get Facturaas Agrupadas por Estatus
export const getfacturaasCant = async (): Promise<AxiosResponse<Facturaa[]>> =>
  await axios.get("/facturaas/getGpedByStat");

// Get Facturaas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Facturaa[]>> =>
  await axios.get("/facturaas/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (facturaa: Facturaa): Promise<AxiosResponse> =>
  await axios.post("/facturaas/updateOne", facturaa);

// Leer todas las facturaas por Aseguradora
export const GetByArs = async (
  aseguradoras: Facturaa
): Promise<AxiosResponse> =>
  await axios.post("/facturaas/GetByArs", aseguradoras);
