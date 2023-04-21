import { Factura } from "@/interfaces/Factura";
import { AxiosResponse } from "axios";
import axios from "./axios";

// export const create = async (factura: Factura): Promise<AxiosResponse> =>
//   await axios.put("/create", factura);

// export const destroy = async (
//   rncEmisor: string,
//   rncReceptorFechaEmision: string
// ): Promise<AxiosResponse> =>
//   await axios.put(
//     `/destroy?rncEmisor=${rncEmisor}&rncReceptorFechaEmision=${rncReceptorFechaEmision}`
//   );

export const getone = async (rncCedula: string): Promise<AxiosResponse> =>
  await axios.get(`/getone?rncCedula=${rncCedula}`);

export const updatencf = async (params: object): Promise<AxiosResponse> =>
  await axios.patch(`/updatencf`, params);
