export interface Factura {
  rncEmisor: string;
  "rncReceptor#fechaEmision": string;
  razSocEmisor: string;
  fechaEmision: string;
  ncf: string;
  venceNcf: string;
  razSocRecep: string;
  rncRecep: string;
  conc: string;
  subTot: number;
  isr: number;
  total: number;
  nota: string;
}
