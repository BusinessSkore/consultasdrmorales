import { Cita } from "@/interfaces/Cita";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createCitaa = async (cita: Cita): Promise<AxiosResponse> =>
  await axios.post("/citas/Savea", cita);

// Crear un Solo Registro
export const createCita = async (cita: Cita): Promise<AxiosResponse> =>
  await axios.post("/citas/Save", cita);

// Leer Todos los registros
export const getCitas = async (): Promise<AxiosResponse<Cita[]>> =>
  await axios.get("/citas/get");

//Leer un solo Registro por ID
export const getCita = async (id: string): Promise<AxiosResponse<Cita>> =>
  await axios.get(`/citas/GetById/${id}`);

//Leer el último Registro
export const getOneCita = async (): Promise<AxiosResponse<Cita>> =>
  await axios.get("/citas/GetOne");

//Actualizar un Registro
export const updateCita = async (
  id: string,
  newCita: Cita
): Promise<AxiosResponse<Cita>> =>
  await axios.put(`/citas/Update/${id}`, newCita);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteCita = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/citas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateCitas = async (cita: Cita): Promise<AxiosResponse> =>
  await axios.post("/citas/delete", cita);

//Reportes----------------------------------------------------------------------------------------------------
// Get Citas Agrupadas por Estatus
export const getcitasCant = async (): Promise<AxiosResponse<Cita[]>> =>
  await axios.get("/citas/getGpedByStat");

// Get Citas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Cita[]>> =>
  await axios.get("/citas/getfactsGpedByCli");

// Get Citas Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Cita[]>> =>
  await axios.get("/citas/getGpedByVitola");

//Citaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (cita: Cita): Promise<AxiosResponse> =>
  await axios.post("/citas/updateOne", cita);
