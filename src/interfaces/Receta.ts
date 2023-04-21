export interface Receta {
  // Generales
  id: null;
  no: number;
  userReg: string;
  userMod: string;
  fecha: Date;
  busqueda: string;
  // Entidad
  nombre: String;
  fechaActual: Date;
  fechaNacimiento: Date;
  edad: Number;
  receta: String;
  seguro: String;
  cedula: String;
  rxs: [Object];
}
