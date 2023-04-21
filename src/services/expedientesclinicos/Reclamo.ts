import { Reclamo } from "@/interfaces/Reclamo";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createReclamoa = async (
  reclamo: Reclamo
): Promise<AxiosResponse> => await axios.post("/reclamos/Savea", reclamo);

// Crear un Solo Registro
export const createReclamo = async (
  reclamo: Reclamo
): Promise<AxiosResponse> => await axios.post("/reclamos/Save", reclamo);

// Leer Todos los registros
export const getReclamos = async (criterio: any): Promise<AxiosResponse<Reclamo[]>> =>
  await axios.post("/reclamos/get", criterio);

// Leer Todos los registros de un Especialista
export const getServsByEsp = async (criterio: any): Promise<AxiosResponse<Reclamo[]>> =>
  await axios.post("/reclamos/getServsByEsp", criterio);

//Leer un solo Registro por ID
export const getReclamosLote = async (
  seguro: string
): Promise<AxiosResponse<Reclamo>> =>
  await axios.get(`/reclamos/gettolote?nombARS=${seguro}`);

//Leer un solo Registro por ID
export const restartLote = async (
  loteNo: number
): Promise<AxiosResponse<Reclamo>> =>
  await axios.get(`/reclamos/restartLote?loteNo=${loteNo}`);

export const getReclamosLote2 = async (
  loteNo: number
): Promise<AxiosResponse<Reclamo>> =>
  await axios.get(`/reclamos/gettolote2?loteNo=${loteNo}`);

//Leer un solo Registro por ID
export const postReclamosLote = async (
  seguro: string,
  loteNo: number
): Promise<AxiosResponse<Reclamo>> =>
  await axios.get(`/reclamos/posttolote?nombARS=${seguro}&loteNo=${loteNo}`);

//Leer un solo Registro por ID
export const getReclamo = async (
  id: string
): Promise<AxiosResponse<Reclamo>> =>
  await axios.get(`/reclamos/GetById/${id}`);

//Leer el último Registro
export const getOneReclamo = async (): Promise<AxiosResponse<Reclamo>> =>
  await axios.get("/reclamos/GetOne");

//Actualizar un Registro
export const updateReclamo = async (
  id: string,
  newReclamo: Reclamo
): Promise<AxiosResponse<Reclamo>> =>
  await axios.put(`/reclamos/Update/${id}`, newReclamo);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteReclamo = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/reclamos/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateReclamos = async (
  reclamo: Reclamo
): Promise<AxiosResponse> => await axios.post("/reclamos/delete", reclamo);

//Reportes----------------------------------------------------------------------------------------------------
// Get Reclamos Agrupados por Día
export const getproddayli = async (): Promise<AxiosResponse<Reclamo[]>> =>
  await axios.get("/reclamos/getproddayli");

// Get Reclamos Agrupadas por Estatus
export const getreclamosCant = async (): Promise<AxiosResponse<Reclamo[]>> =>
  await axios.get("/reclamos/getGpedByStat");

// Get Reclamos Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Reclamo[]>> =>
  await axios.get("/reclamos/getfactsGpedByCli");

//Funciones----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (reclamo: Reclamo): Promise<AxiosResponse> =>
  await axios.post("/reclamos/updateOne", reclamo);

// Leer todas las reclamos por Aseguradora
export const GetByArs = async (
  aseguradoras: Reclamo
): Promise<AxiosResponse> =>
  await axios.post("/reclamos/GetByArs", aseguradoras);
