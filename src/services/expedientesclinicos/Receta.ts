import { Receta } from "@/interfaces/Receta";
import { AxiosResponse } from "axios";
import axios from "./axios";

//Básicos----------------------------------------------------------------------------------------------------
//Cargar Registros
export const createRecetaa = async (receta: Receta): Promise<AxiosResponse> =>
  await axios.post("/recetas/Savea", receta);

// Crear un Solo Registro
export const createReceta = async (receta: Receta): Promise<AxiosResponse> =>
  await axios.post("/recetas/Save", receta);

// // Leer Todos los registros
// export const getRecetas = async (): Promise<AxiosResponse<Receta[]>> =>
//   await axios.get("/recetas/get");

// Crear un Solo Registro
export const getRecetas = async (medico: string): Promise<AxiosResponse> =>
  await axios.post("/recetas/get", medico);

//Leer un solo Registro por ID
export const getReceta = async (id: string): Promise<AxiosResponse<Receta>> =>
  await axios.get(`/recetas/GetById/${id}`);

//Leer el último Registro
export const getOneReceta = async (): Promise<AxiosResponse<Receta>> =>
  await axios.get("/recetas/GetOne");

//Leer el último Registro Para Imprimir
export const getPrint = async (): Promise<AxiosResponse<Receta>> =>
  await axios.get("/recetas/GetPrint");

// Get Recetas por Expediente
export const getRecetasByExp = async (
  nombre: any
): Promise<AxiosResponse<Receta[]>> =>
  await axios.post("/recetas/getByExp", nombre);

//Actualizar un Registro
export const updateReceta = async (
  id: string,
  newReceta: Receta
): Promise<AxiosResponse<Receta>> =>
  await axios.put(`/recetas/Update/${id}`, newReceta);

//Actualizar todos los Registros

//Eliminar un Registro
export const deleteReceta = async (id: string): Promise<AxiosResponse> =>
  await axios.delete(`/recetas/Delete/${id}`);

//Eliminar todos los Registros
export const eliminateRecetas = async (
  receta: Receta
): Promise<AxiosResponse> => await axios.post("/recetas/delete", receta);

//Reportes----------------------------------------------------------------------------------------------------
// Get Recetas Agrupadas por Estatus
export const getrecetasCant = async (): Promise<AxiosResponse<Receta[]>> =>
  await axios.get("/recetas/getGpedByStat");

// Get Recetas Agrupadas por Cliente
export const getfactsGpedByCli = async (): Promise<AxiosResponse<Receta[]>> =>
  await axios.get("/recetas/getfactsGpedByCli");

// Get Recetas Agrupadas por Vitola
export const getGpedByVitola = async (): Promise<AxiosResponse<Receta[]>> =>
  await axios.get("/recetas/getGpedByVitola");

//Recetaes----------------------------------------------------------------------------------------------------
//Actualizar Un Registro
export const updateOne = async (receta: Receta): Promise<AxiosResponse> =>
  await axios.post("/recetas/updateOne", receta);
