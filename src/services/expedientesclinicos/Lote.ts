import { Lote } from "@/interfaces/Lote";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createLotea = async (
  lote: Lote
): Promise<AxiosResponse> => await axios.post("/lotes/Savea", lote);

// Crear un Solo Registro
export const createLote = async (
  lote: Lote
): Promise<AxiosResponse> => await axios.post("/lotes/Save", lote);

// Leer Todos los registros
export const getLotes = async (criterio: any): Promise<AxiosResponse<Lote[]>> =>
  await axios.post("/lotes/get", criterio);

// Leer Todos los registros de un Especialista
export const getServsByEsp = async (criterio: any): Promise<AxiosResponse<Lote[]>> =>
  await axios.post("/lotes/getServsByEsp", criterio);

//Leer un solo Registro por ID
export const getLote = async (
  id: string
): Promise<AxiosResponse<Lote>> =>
  await axios.get(`/lotes/GetById/${id}`);

//Leer el último Registro
export const getOneLote = async (): Promise<AxiosResponse<Lote>> =>
  await axios.get("/lotes/GetOne");

//Actualizar un Registro
export const updateLote = async (
  id: string,
  newLote: Lote
): Promise<AxiosResponse<Lote>> =>
  await axios.put(`/lotes/Update/${id}`, newLote);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteLote = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/lotes/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateLotes = async (
  lote: Lote
): Promise<AxiosResponse> => await axios.post("/lotes/delete", lote);

//Reportes----------------------------------------------------------------------------------------------------
// Get Lotes Agrupados por Día
export const getproddayli = async (): Promise<AxiosResponse<Lote[]>> =>
  await axios.get("/lotes/getproddayli");

// Get Lotes Agrupadas por Estatus
export const getlotesCant = async (): Promise<AxiosResponse<Lote[]>> =>
  await axios.get("/lotes/getGpedByStat");

// Get Lotes Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Lote[]>> =>
  await axios.get("/lotes/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (lote: Lote): Promise<AxiosResponse> =>
  await axios.post("/lotes/updateOne", lote);

// Leer todas las lotes por Aseguradora
export const GetByArs = async (
  aseguradoras: Lote
): Promise<AxiosResponse> =>
  await axios.post("/lotes/GetByArs", aseguradoras);
