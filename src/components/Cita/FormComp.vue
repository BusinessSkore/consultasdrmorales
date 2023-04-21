<template v-show="!cargando">
  <!-- {{ this.currentEdition }} -->
  <!-- {{ this.seguros2.length }} -->
  <!-- {{ this.seguros }} -->
  <div>
    <div>
      <Navbar />
      <Transition>
        <div v-if="cargando" class="spin">
          <img class="img" src="@/assets/images/logo.png" />
        </div>
      </Transition>

      <div v-if="showModal" class="modal">
        <div class="contenedor">
          <header>Consulta</header>
          <div class="contenido">
            <label @click="this.showModalMethod()" for="btn-modal">X</label>
            <div class="contenido">
              <div>
                <textarea
                  rows="12"
                  id="showInComentary"
                  type="showInComentary"
                  v-model="currentEdition.description"
                  class="form-control"
                />
              </div>
              <!-- <button class="btn btn-primary" @click.prevent="actualizar()">
                <i class="fas fa-check"></i> Actualizar
              </button>
              &nbsp;
              <button class="btn btn-danger" @click.prevent="cancelar()">
                <i class="fas fa-undo"></i> Cancelar
              </button> -->
              <!-- {{ this.showInComentary }} -->
            </div>
          </div>
        </div>
      </div>

      <div v-if="showModal7" class="modal7">
        <div class="contenedor7">
          <header>Pacientes</header>
          <div class="contenido7">
            <label @click="this.showModalMethod72()" for="btn-modal">X</label>
            <div class="contenido7">
              <div>
                <input
                  id="search"
                  type="search"
                  v-model="search"
                  class="form-control"
                  @keypress="buscar()"
                />
              </div>
              <div>
                <p
                  class="ars"
                  style="cursor: pointer"
                  v-for="(seguro, index) in seguros2"
                  :key="index"
                  @click="setSeguro(seguro.nombre)"
                >
                  {{ seguro.nombre }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="!cargando" class="general">
        <h6 :class="isError(error)">{{ error }}</h6>
        <form>
          <fieldset>
            <h6>{{ encabezado }}</h6>
            <label class="form-label"><b>Datos Generales</b></label>
            <div class="form-group">
              <div class="grid">
                <!-- Start Fields -->

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fechaActual"
                    >Fecha / Hora:</label
                  ><input
                    id="fechaActual"
                    type="datetime-local"
                    v-model="cita.fechaActual"
                    class="form-control"
                  />
                </div>

                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombre"
                    >Paciente:</label
                  ><input
                    id="nombre"
                    type="nombre"
                    v-model="cita.nombre"
                    class="form-control"
                  />
                </div> -->

                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="fechaNacimiento"
                    >Fecha de Nacimiento:</label
                  ><input
                    @change="calcularEdad(cita.fechaNacimiento)"
                    id="fechaNacimiento"
                    type="Date"
                    v-model="cita.fechaNacimiento"
                    class="form-control"
                  />
                </div> -->
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="edad"
                    >Edad:</label
                  ><input
                    disabled
                    id="edad"
                    type="Number"
                    v-model="cita.edad"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="sexo"
                    >Sexo:</label
                  ><select
                    id="sexo"
                    type="String"
                    v-model="cita.sexo"
                    class="form-select"
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                  </select>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cedula"
                    >Cédula:</label
                  ><input
                    id="cedula"
                    type="cedula"
                    v-model="cita.cedula"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="telefono"
                    >Teléfono:</label
                  ><input
                    id="telefono"
                    type="telefono"
                    v-model="cita.telefono"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="direccion"
                    >Dirección:</label
                  ><input
                    id="direccion"
                    type="direccion"
                    v-model="cita.direccion"
                    class="form-control"
                  />
                </div> -->
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="seguro"
                    >Paciente:</label
                  ><input
                    id="seguro"
                    type="seguro"
                    v-model="cita.seguro"
                    class="form-control"
                    @focus="this.showModalMethod7()"
                  />
                </div>
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="oficio"
                    >Oficio:</label
                  ><input
                    id="oficio"
                    type="oficio"
                    v-model="cita.oficio"
                    class="form-control"
                  />
                </div> -->
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="deporte"
                    >Deporte:</label
                  ><input
                    id="deporte"
                    type="deporte"
                    v-model="cita.deporte"
                    class="form-control"
                  />
                </div> -->
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="ladoDominante"
                    >Lado Dominante:</label
                  ><input
                    id="ladoDominante"
                    type="ladoDominante"
                    v-model="cita.ladoDominante"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <label class="form-label"><b>APP y Hábitos Tóxicos</b></label> -->
                <!-- <div class="grid">
                <div>
                  <label class="ta-l col-form-label col-form-label-sm" for="app"
                    >APP:</label
                  ><textarea
                    rows="5"
                    id="app"
                    type="app"
                    v-model="cita.app"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="habitosToxicos"
                    >Hábitos Tóxicos:</label
                  ><textarea
                    rows="5"
                    id="habitosToxicos"
                    type="habitosToxicos"
                    v-model="cita.habitosToxicos"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="antQuirurgicos"
                    >Antecedentes Quirúrgicos:</label
                  ><textarea
                    rows="5"
                    id="antQuirurgicos"
                    type="antQuirurgicos"
                    v-model="cita.antQuirurgicos"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="alergias"
                    >Alergias:</label
                  ><textarea
                    rows="5"
                    id="alergias"
                    type="alergias"
                    v-model="cita.alergias"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <label class="form-label"><b>Exámen Físico</b></label>
              <div class="grid-3">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="mecanismoLesion"
                    >Mecanismo de la Lesión:</label
                  ><textarea
                    rows="5"
                    id="mecanismoLesion"
                    type="mecanismoLesion"
                    v-model="cita.mecanismoLesion"
                    class="form-control"
                  />
                </div> 
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="tiempoEvolucion"
                    >Tiempo de Evolución:</label
                  ><input
                    id="tiempoEvolucion"
                    type="tiempoEvolucion"
                    v-model="cita.tiempoEvolucion"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <h5>Exámen Físico de Hombro</h5>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="elevacionAnteriorActiva"
                    >Elevación Anterior (Activa):</label
                  ><input
                    id="elevacionAnteriorActiva"
                    type="elevacionAnteriorActiva"
                    v-model="cita.elevacionAnteriorActiva"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="elevacionAnteriosPasiva"
                    >Elevación Anterior (Pasiva):</label
                  ><input
                    id="elevacionAnteriosPasiva"
                    type="elevacionAnteriosPasiva"
                    v-model="cita.elevacionAnteriosPasiva"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="rotacionInterna"
                    >Rotación Interna:</label
                  ><input
                    id="rotacionInterna"
                    type="rotacionInterna"
                    v-model="cita.rotacionInterna"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="rotacionExterna"
                    >Rotación Externa:</label
                  ><input
                    id="rotacionExterna"
                    type="rotacionExterna"
                    v-model="cita.rotacionExterna"
                    class="form-control"
                  />
                </div>
                <div>
                  <label class="ta-l col-form-label col-form-label-sm" for="abd"
                    >ABD:</label
                  ><input
                    id="abd"
                    type="abd"
                    v-model="cita.abd"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="jobe"
                    >JOBE:</label
                  ><input
                    id="jobe"
                    type="jobe"
                    v-model="cita.jobe"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="speed"
                    >SPEED:</label
                  ><input
                    id="speed"
                    type="speed"
                    v-model="cita.speed"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="obrien"
                    >OBRIEN:</label
                  ><input
                    id="obrien"
                    type="obrien"
                    v-model="cita.obrien"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="naponeon"
                    >NAPONEON:</label
                  ><input
                    id="naponeon"
                    type="naponeon"
                    v-model="cita.naponeon"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="acromioClavicular"
                    >Acromio Clavicular:</label
                  ><input
                    id="acromioClavicular"
                    type="acromioClavicular"
                    v-model="cita.acromioClavicular"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="inestabilidadAnterior"
                    >Inestabilidad Anterior:</label
                  ><input
                    id="inestabilidadAnterior"
                    type="inestabilidadAnterior"
                    v-model="cita.inestabilidadAnterior"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="inestabilidadPosterior"
                    >Inestabilidad Posterior:</label
                  ><input
                    id="inestabilidadPosterior"
                    type="inestabilidadPosterior"
                    v-model="cita.inestabilidadPosterior"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <h5>Exámen Físico de Rodilla</h5>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cajonAnterior"
                    >Cajón Anterior:</label
                  ><input
                    id="cajonAnterior"
                    type="cajonAnterior"
                    v-model="cita.cajonAnterior"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cajonPosterior"
                    >Cajón Posterior:</label
                  ><input
                    id="cajonPosterior"
                    type="cajonPosterior"
                    v-model="cita.cajonPosterior"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="lachman"
                    >LACHMAN:</label
                  ><input
                    id="lachman"
                    type="lachman"
                    v-model="cita.lachman"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="appley"
                    >APPLEY:</label
                  ><input
                    id="appley"
                    type="appley"
                    v-model="cita.appley"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="bostezoLateral"
                    >Bostezo Lateral:</label
                  ><input
                    id="bostezoLateral"
                    type="bostezoLateral"
                    v-model="cita.bostezoLateral"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="bostezoMedial"
                    >Bostezo Medial:</label
                  ><input
                    id="bostezoMedial"
                    type="bostezoMedial"
                    v-model="cita.bostezoMedial"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="otraLesion"
                    >Otra Lesión:</label
                  ><textarea
                    rows="5"
                    id="otraLesion"
                    type="otraLesion"
                    v-model="cita.otraLesion"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <label class="form-label"><b>Estudios Solicitados</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="estudiosSolicitados"
                    >Estudios Solicitados:</label
                  ><textarea
                    rows="4"
                    id="estudiosSolicitados"
                    type="estudiosSolicitados"
                    v-model="cita.estudiosSolicitados"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <label class="form-label"><b>Diagnósticos</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="diagnosticoPresuntivo"
                    >Diagnóstico Presuntivo:</label
                  ><textarea
                    rows="3"
                    id="diagnosticoPresuntivo"
                    type="diagnosticoPresuntivo"
                    v-model="cita.diagnosticoPresuntivo"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="diagnosticoImagen"
                    >Diagnóstico Por Imagen:</label
                  ><textarea
                    rows="3"
                    id="diagnosticoImagen"
                    type="diagnosticoImagen"
                    v-model="cita.diagnosticoImagen"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <label class="form-label"><b>Tratamiento Efectuado</b></label>
              <div class="grid">
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="medicamentos"
                    >Medicamentos:</label
                  ><textarea
                    rows="5"
                    id="medicamentos"
                    type="medicamentos"
                    v-model="cita.medicamentos"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="terapiaFisica"
                    >Terapia Física:</label
                  ><textarea
                    rows="5"
                    id="terapiaFisica"
                    type="terapiaFisica"
                    v-model="cita.terapiaFisica"
                    class="form-control"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cirugia"
                    >Cirugía:</label
                  ><textarea
                    rows="5"
                    id="cirugia"
                    type="cirugia"
                    v-model="cita.cirugia"
                    class="form-control"
                  />
                </div>
              </div> -->
                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombre"
                    >Referido Por:</label
                  ><input
                    id="referidoPor"
                    type="referidoPor"
                    v-model="cita.referidoPor"
                    class="form-control"
                  />
                </div> -->
                <!-- <label class="form-label"><b>Consultas</b></label>
              <div class="grid">
                <div>

                  <textarea
                    rows="2"
                    id="currentConsulta"
                    type="currentConsulta"
                    v-model="currentConsulta"
                    class="form-control"
                  />
                </div>

                <button class="btn btn-primary" @click.prevent="addActivity()">
                  <i class="fas fa-plus"></i> Agregar Consulta
                </button>
              </div> -->
              </div>
              <!-- <div class="grid-consultas"> -->
              <!-- <ul>
                <li
                  v-for="(consulta, index) in cita.consultas"
                  :key="index"
                >
                  <a href="#">
                    <h2>
                      No. {{ index + 1 }} - {{ newFormatDate(consulta.date) }}
                      <i
                        @click.prevent="deleteService(index)"
                        style="cursor:pointer"
                        class="fas fa-minus-circle redOption"
                      ></i>
                      &nbsp;
                      <i
                        @click.prevent="editService(index, consulta)"
                        style="cursor:pointer"
                        class="fas fa-edit greenOption"
                      ></i>
                    </h2>
                    <p>{{ consulta.description }}</p>
                  </a>
                </li>
              </ul> -->

              <!-- <div
                v-for="(consulta, index) in cita.consultas"
                :key="index"
                class="card-body"
              >
                <p style="font-weight: bold">
                  No. {{ index + 1 }} - {{ newFormatDate(consulta.date) }}
                  <i
                    @click.prevent="deleteService(index)"
                    style="cursor:pointer"
                    class="fas fa-minus-circle redOption"
                  ></i>
                  &nbsp;
                  <i
                    @click.prevent="editService(index, consulta)"
                    style="cursor:pointer"
                    class="fas fa-edit greenOption"
                  ></i>
                </p> -->
              <!-- <p>{{ consulta.description }}</p> -->

              <!-- <table id="customers">
                <tr>
                  <th>No.</th>
                  <th>Fecha</th>
                  <th>Consulta</th>
                  <th></th>
                </tr>
                <tr
                  v-for="(consulta, index) in cita.consultas"
                  :key="index"
                >
                  <td class="input-r">{{ index + 1 }}</td>
                  <td>{{ newFormatDate(consulta.date) }}</td>
                  <td>{{ consulta.description }}</td>
                  <td>
                    <i
                      @click.prevent="deleteService(index)"
                      style="cursor:pointer"
                      class="fas fa-minus-circle redOption"
                    ></i>
                    &nbsp;
                    <i
                      @click.prevent="editService(index, consulta)"
                      style="cursor:pointer"
                      class="fas fa-edit greenOption"
                    ></i>
                  </td>
                </tr>
              </table> -->
              <!-- </div> -->
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-primary"
              @click.prevent="saveCita()"
              :disabled="!cita.seguro || !cita.fechaActual"
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-primary"
              @click.prevent="handleUpdate()"
              :disabled="!cita.seguro || !cita.fechaActual"
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/citas2/${cita._id}`)"
            >
              <i class="fas fa-print"></i> Imprimir
            </button>

            <button
              v-if="showDelete"
              class="btn btn-danger"
              @click.prevent="handleDelete()"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getExpedientes } from "@/services/expedientesclinicos/Expediente";
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Cita } from "@/interfaces/Cita";
import { Funcion } from "@/interfaces/Funcion";
import { Vitola } from "@/interfaces/Vitola";
import { Empleado } from "@/interfaces/Empleado";
import {
  getPeg,
  getMez,
  getEmp,
} from "@/services/expedientesclinicos/Empleado";
import { getLigas } from "@/services/expedientesclinicos/Liga";
import {
  createCita,
  eliminateCitas,
  createCitaa,
  getOneCita,
  deleteCita,
  getCita,
  updateCita,
} from "@/services/expedientesclinicos/Cita";
import { getVitolas } from "@/services/expedientesclinicos/Vitola";
import { getFuncions } from "@/services/expedientesclinicos/Funcion";
import { createMensaje } from "@/services/expedientesclinicos/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "citas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      search: "",
      seguros2: [],
      seguros: [],
      currentEdition: {} as any,
      vitolas: [] as Vitola[],
      empleados: [] as Empleado[],
      empleadosEmp: [] as Empleado[],
      empleadosPeg: [] as Empleado[],
      empleadosMez: [] as Empleado[],
      campoFocus: "fechaActual",
      mensageError: "Error",
      mensageExito: "Cita Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Esta Cita?",
      encabezado: "",
      modoForm: "",
      funciones: [] as Funcion[],
      showDatosPadre: false,
      showDatosMadre: false,
      showDatosTutor: false,
      message: {
        username: "Ronnald",
        message: "Hola",
      },
      documento: {} as any,
      error: "",
      respuesta: {},
      actividad: "",
      showAlert: false,
      loadedAfiliado: {},
      cargando: false,
      cita: {} as Cita,
      oneCita: {} as Cita,
      one: {},
      nextNo: Number,
      medicoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",

      showInComentary: "",
      showModal: false,
      showModal7: false,
      showDelete: false,
      currentConsulta: "",
      estado: {} as object,
    };
  },

  async mounted() {
    if (this.$route.fullPath == "/citas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Cita";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Cita";
    }

    if (this.modoForm == "add") {
      this.cita.no = 1;
      this.cita.consultas = [];
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadCita(this.$route.params.id);
      }
      this.fixTime();
    }

    this.focus();
    this.loadExpedientes();
    // this.loadEmpleados();
    // this.loadLigas();
    // this.loadVitolas();
    // this.filterEmpleados();
  },

  methods: {
    async loadExpedientes() {
      this.toggleLoading();
      try {
        const res = await getExpedientes(this.$store.state.user.puedeVer);
        this.seguros = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },
    setSeguro(seguro: string) {
      this.cita.seguro = seguro;
      this.showModalMethod7();
      this.search = "";
      document.getElementById("oficio").focus();
    },

    buscar(term: string) {
      this.seguros2 = this.seguros;
      if (term !== "") {
        this.seguros2 = this.seguros.filter((seguro: any) => {
          return seguro.nombre.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (this.seguros2.length == 1) {
        if (confirm("¿" + this.seguros2[0].nombre + "?")) {
          this.setSeguro(this.seguros2[0].nombre);
          // document.getElementById("oficio").focus();
        }
      }
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
      // document.getElementById("oficio").focus();
    },

    showModalMethod72() {
      this.cita.seguro = "";
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
      // document.getElementById("oficio").focus();
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    deleteService(it: any) {
      if (confirm("Está Seguro que desea Eliminar Esta Consulta?")) {
        this.cita.consultas.splice(it, 1);
      }
    },

    editService(index: number, consulta: any) {
      this.currentEdition = consulta;
      this.showModalMethod();
    },

    newFormatDate(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue).calendar();
      // .startOf("hour")
      // .fromNow();
    },

    async addActivity() {
      if (this.currentConsulta !== "") {
        this.cita.consultas.push({
          description: this.currentConsulta,
          date: new Date(),
        });
        this.currentConsulta = "";
      }
      document.getElementById("currentConsulta").focus();
    },

    calcularEdad(date: any) {
      let years = 0;
      let edad = Math.floor(
        moment(new Date()).diff(moment(date, "YYYY-MM-DD"), "years", true)
      );
      if (edad > 120 || edad < 0) {
        years = 0;
      } else {
        years = edad;
      }
      this.cita.edad = years;
    },

    async filterEmpleados() {
      this.toggleLoading();
      try {
        const res = await getPeg();
        this.empleadosPeg = res.data;
      } catch (error) {
        // console.error(error);
      }

      try {
        const res = await getEmp();
        this.empleadosEmp = res.data;
      } catch (error) {
        // console.error(error);
      }

      try {
        const res = await getMez();
        this.empleadosMez = res.data;
      } catch (error) {
        // console.error(error);
      }

      this.toggleLoading();
    },

    async loadLigas() {
      // this.toggleLoading();
      try {
        const res = await getLigas();
        this.ligas = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadVitolas() {
      // this.toggleLoading();
      try {
        const res = await getVitolas();
        this.vitolas = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    // async loadEmpleados() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getEmpleados();
    //     this.empleados = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    fixTime() {
      this.cita.fecha = this.formatDateToFix(this.cita.fecha, true);
      this.cita.fechaActual = this.formatDateToFix(this.cita.fechaActual, true);
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadCita(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getCita(id);
        this.cita = data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
    },

    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.cita.userMod = this.$store.state.user.usuario;
          await updateCita(this.$route.params.id, this.cita);
          this.addMessage();
          this.$router.push("/citas");
        }
      } catch (error) {
        //console.error(error);
      }
      this.toggleLoading();
      // this.toggleAlert();
    },

    async handleDelete() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await deleteCita(this.$route.params.id);
            this.addMessage();
            this.$router.push("/citas");
          }
        } catch (error) {
          //console.error(error);
        }
      }
    },

    showDeleteMethod() {
      if (this.$store.state.user.type == "Power User") {
        this.showDelete = true;
      }
    },

    toggleShowDatosPadre() {
      this.showDatosPadre = !this.showDatosPadre;
    },
    toggleShowDatosMadre() {
      this.showDatosMadre = !this.showDatosMadre;
    },
    toggleShowDatosTutor() {
      this.showDatosTutor = !this.showDatosTutor;
    },

    async addMessage() {
      try {
        const res = await createMensaje(this.message);
      } catch (error) {
        // console.error(error);
      }
    },

    isError(message: string) {
      if (message == this.mensageExito) {
        return "success";
      } else {
        return "error";
      }
    },

    toggleAlert() {
      this.showAlert = !this.showAlert;
    },
    calcCita() {
      (this.cita.retension = this.cita.bruto * 0.1),
        (this.cita.neto = this.cita.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.cita.fechaActual = new Date();
      this.cita.fecha = new Date();
    },

    async loadOneCita() {
      try {
        const res = await getOneCita();
        this.oneCita = res.data;
        this.one = this.oneCita[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.cita.no = this.nextNo;
        this.cita.principal = this.nextNo;
        this.cita.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveCitaa() {
      await this.loadOneCita();
      try {
        const res = await createCitaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveCita() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneCita();
          this.oneCita = res.data;
          this.one = this.oneCita[0];
          this.nextNo = this.one.no + 1;
          this.cita.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.cita.userReg = this.$store.state.user.usuario;
        const res = await createCita(this.cita).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            this.addMessage();
          },
          (err) => {
            // console.log(err.response);
            this.error = err.response.data.error;
          }
        );
        // this.$router.push("/citas/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      await this.fillFields();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
    },

    async deleteAllCitas() {
      try {
        const res = await eliminateCitas(this.cita);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.cita.nombre = "";
      this.cita.referidoPor = "";
      this.cita.fechaActual = "";
      this.cita.fechaNacimiento = "";
      this.cita.edad = "";
      this.cita.sexo = "";
      this.cita.cedula = "";
      this.cita.telefono = "";
      this.cita.direccion = "";
      this.cita.seguro = "";
      this.cita.oficio = "";
      this.cita.deporte = "";
      this.cita.ladoDominante = "";
      this.cita.app = "";
      this.cita.habitosToxicos = "";
      this.cita.antQuirurgicos = "";
      this.cita.alergias = "";
      this.cita.mecanismoLesion = "";
      this.cita.tiempoEvolucion = "";
      this.cita.elevacionAnteriorActiva = "";
      this.cita.elevacionAnteriosPasiva = "";
      this.cita.rotacionInterna = "";
      this.cita.rotacionExterna = "";
      this.cita.abd = "";
      this.cita.jobe = "";
      this.cita.speed = "";
      this.cita.obrien = "";
      this.cita.naponeon = "";
      this.cita.acromioClavicular = "";
      this.cita.inestabilidadAnterior = "";
      this.cita.inestabilidadPosterior = "";
      this.cita.cajonAnterior = "";
      this.cita.cajonPosterior = "";
      this.cita.lachman = "";
      this.cita.appley = "";
      this.cita.bostezoLateral = "";
      this.cita.bostezoMedial = "";
      this.cita.otraLesion = "";
      this.cita.estudiosSolicitados = "";
      this.cita.diagnosticoPresuntivo = "";
      this.cita.diagnosticoImagen = "";
      this.cita.medicamentos = "";
      this.cita.terapiaFisica = "";
      this.cita.cirugia = "";
      this.cita.consultas = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    focus() {
      document.getElementById(this.campoFocus).focus();
    },
    focus2() {
      document.getElementById(this.campoFocus2).focus();
    },
  },
});
</script>

<style lang="css" scoped>
/* Start Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* End Transition */

/* <!-------------------------------------------------- Menú --------------------------------------------------> */
* {
  box-sizing: border-box;
}

#btn-mas {
  display: none;
}
.container {
  position: fixed;
  bottom: 0%;
  left: 80%;
  z-index: 100;
}
.redes a,
.btn-mas label {
  display: block;
  text-decoration: none;
  color: #fff;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.4);
  transition: all 500ms ease;
}
.redes a:hover {
  background: #fff;
  color: #2780e3;
}
.redes a {
  margin-bottom: -15px;
  opacity: 0;
  visibility: hidden;
}
#btn-mas:checked ~ .redes a {
  margin-bottom: 10px;
  opacity: 1;
  visibility: visible;
}
.btn-mas label {
  cursor: pointer;
  background: #2780e3;
  font-size: 23px;
}
#btn-mas:checked ~ .btn-mas label {
  transform: rotate(135deg);
  font-size: 25px;
  background-color: grey;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}

.blue {
  background-color: blue;
}

.orange {
  background-color: orange;
}

.yellow {
  background-color: yellow;
}

/* <!----------------------------------------------------------------------------------------------------------> */

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}
.grid-consultas {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}
.grid-3 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
}

.ars {
  margin: 0%;
  font-size: 12px;
}

/* h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
} */

h6 {
  color: white;
  /* font-weight: bold; */
  text-align: center;
  background-color: rgb(147, 147, 147);
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(47, 164, 231);
  text-align: center;
}

input,
select,
textarea {
  border-radius: 7px;
  margin-bottom: 3px;
}

legend {
  margin: 0;
}

.form-label {
  background-color: rgb(220, 220, 220);
  width: 100%;
  font-size: 80%;
  /* margin: 0.1px; */
  /* color: rgb(47, 164, 231); */
  border-radius: 7px;
}

.ta-l {
  text-align: left;
}

label {
  text-align: center;
}

.col-form-label {
  font-weight: bold;
  line-height: 0;
}

/* button {
  background-color: rgb(147, 147, 147);
  color: white;
  width: 100%;
  border-radius: 4px;
  margin-top: 30px;
} */

/* -------------------------------Loading... -------------------------------*/

@keyframes spinner {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: rgb(47, 164, 231);
  border-radius: 50%;
  content: "";
  height: 90px;
  width: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
}

.img {
  pointer-events: none;
  /* opacity: 0.7; */
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.input-r {
  text-align: right;
}

.error {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 85, 85);
}

.success {
  color: white;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(0, 255, 0);
}

/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 3px;
  /* cursor: pointer; */
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  background-color: rgb(47, 164, 231);
  color: white;
}

td,
th {
  font-size: 75%;
}

/* ---------------------------------------- */
.redOption {
  color: red;
}

.greenOption {
  color: green;
}

/* Modal */
.modal {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all 500ms ease;
}

.contenedor {
  width: 700px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  background: rgb(47, 164, 231);
  color: #fff;
}

.contenedor label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido {
  padding: 7px;
}

/* End Modal */

/* Modal 7 */
.modal7 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all 500ms ease;
  overflow-y: scroll;
}

.contenedor7 {
  width: 250px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: rgb(47, 164, 231);
  color: #fff;
}

.contenedor7 label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenido7 {
  padding: 7px;
}

/* End Modal */

/* Notas Adhesivas */
/* *{
  margin:0;
  padding:0;
} */

/* body{
  font-family:arial,sans-serif;
  font-size:100%;
  margin:1em;
  background:#666;
  color:#fff;
} */

/* h2,p{
  font-size:100%;
  font-weight:normal;
} */

ul,
li {
  list-style: none;
}
ul {
  overflow: hidden;
  padding: 3em;
}
ul li a {
  text-decoration: none;
  color: #000;
  background: #ffc;
  display: block;
  height: 20em;
  width: 15em;
  padding: 2em;
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  -moz-transition: -moz-transform 0.15s linear;
  -o-transition: -o-transform 0.15s linear;
  -webkit-transition: -webkit-transform 0.15s linear;
}
ul li {
  margin: 1em;
  float: left;
}
ul li h2 {
  font-size: 100%;
  font-weight: bold;
  padding-bottom: 10px;
}
ul li p {
  font-family: "Reenie Beanie", arial, sans-serif;
  font-size: 100%;
}
ul li a {
  -webkit-transform: rotate(-6deg);
  -o-transform: rotate(-6deg);
  -moz-transform: rotate(-6deg);
}
ul li:nth-child(even) a {
  -o-transform: rotate(4deg);
  -webkit-transform: rotate(4deg);
  -moz-transform: rotate(4deg);
  position: relative;
  top: 5px;
  background: #cfc;
}
ul li:nth-child(3n) a {
  -o-transform: rotate(-3deg);
  -webkit-transform: rotate(-3deg);
  -moz-transform: rotate(-3deg);
  position: relative;
  top: -5px;
  background: #ccf;
}
ul li:nth-child(5n) a {
  -o-transform: rotate(5deg);
  -webkit-transform: rotate(5deg);
  -moz-transform: rotate(5deg);
  position: relative;
  top: -10px;
}
ul li a:hover,
ul li a:focus {
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  position: relative;
  z-index: 5;
}
ol {
  text-align: center;
}
ol li {
  display: inline;
  padding-right: 1em;
}
ol li a {
  color: #fff;
}
/* End Notas Adhesivas */

.card-body {
  background-color: #ddd;
  overflow-x: scroll;
}
</style>
