import { Factura } from "@/interfaces/Factura";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const get = async (): Promise<AxiosResponse> =>
  await axios.get("/get?rncEmisor=04900722440");

export const create = async (factura: Factura): Promise<AxiosResponse> =>
  await axios.put("/create", factura);

export const destroy = async (
  rncEmisor: string,
  rncReceptorFechaEmision: string
): Promise<AxiosResponse> =>
  await axios.put(
    `/destroy?rncEmisor=${rncEmisor}&rncReceptorFechaEmision=${rncReceptorFechaEmision}`
  );
