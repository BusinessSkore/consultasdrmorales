export interface Expediente {
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
  sexo: String;
  cedula: String;
  aflNSS: String;
  telefono: String;
  direccion: String;
  seguro: String;
  oficio: String;
  deporte: String;
  ladoDominante: String;
  app: String;
  habitosToxicos: String;
  antQuirurgicos: String;
  alergias: String;
  mecanismoLesion: String;
  tiempoEvolucion: String;
  elevacionAnteriorActiva: String;
  elevacionAnteriosPasiva: String;
  rotacionInterna: String;
  rotacionExterna: String;
  abd: String;
  jobe: String;
  speed: String;
  obrien: String;
  naponeon: String;
  acromioClavicular: String;
  inestabilidadAnterior: String;
  inestabilidadPosterior: String;
  cajonAnterior: String;
  cajonPosterior: String;
  lachman: String;
  appley: String;
  bostezoLateral: String;
  bostezoMedial: String;
  otraLesion: String;
  estudiosSolicitados: String;
  diagnosticoPresuntivo: String;
  diagnosticoImagen: String;
  medicamentos: String;
  terapiaFisica: String;
  cirugia: String;
  consultas: [object];
  referidoPor: String;
  updatedAt: Date;
  dxReclam: String;
}
