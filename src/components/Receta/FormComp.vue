<template v-show="!cargando">
  <!-- {{ this.receta }} -->
  <!-- {{ this.currentEdition }} -->
  <!-- {{ this.seguros2 }} -->
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
            <label @click="this.showModalMethod7()" for="btn-modal">X</label>
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
                  @click="setSeguro(seguro.nombre, seguro.edad, seguro.cedula)"
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

            <!-- <textarea
              rows="5"
              id="receta"
              type="receta"
              v-model="receta.receta"
              class="form-control"
            /> -->
            <div class="form-group">
              <label class="form-label"><b>Datos del paciente</b></label>
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
                    v-model="receta.fechaActual"
                    class="form-control"
                  />
                </div>

                <!-- <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nombre"
                    >Nombre y Apellido:</label
                  ><input
                    id="nombre"
                    type="nombre"
                    v-model="receta.nombre"
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
                    v-model="receta.seguro"
                    class="form-control"
                    @focus="this.showModalMethod7()"
                  />
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="cedula"
                    >Cédula:</label
                  ><input
                    id="cedula"
                    type="cedula"
                    v-model="receta.cedula"
                    class="form-control"
                  />
                </div>

                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="edad"
                    >Edad:</label
                  ><input
                    disabled
                    id="edad"
                    type="Number"
                    v-model="receta.edad"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <label class="form-label"><b>Receta</b></label>
            <div class="grid">
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="medicamento"
                  >Medicamento:</label
                ><input
                  id="medicamento"
                  type="medicamento"
                  v-model="medicamento"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="dosis"
                  >Dosificación:</label
                ><input
                  id="dosis"
                  type="dosis"
                  v-model="dosis"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <br />
                <button
                  @click="addActivity()"
                  class="btn btn-success btn-sm"
                  type="button"
                >
                  <i class="fas fa-plus" _mstvisible="2"></i> Agregar
                </button>
              </div> -->
            </div>
            <div v-if="this.modoForm == 'add'">
              <div class="grid-full">
                <div>
                  <!-- <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="medicamento"
                    >Indicación:</label
                  > -->
                  <textarea
                    rows="13"
                    id="medicamento"
                    type="medicamento"
                    v-model="medicamento"
                    class="form-control"
                  />
                </div>
                <!-- <div>
                  <button
                    :disabled="!this.medicamento"
                    @click="addActivity()"
                    class="btn btn-success btn-sm"
                    style="height: 100%"
                    type="button"
                  >
                    <i class="fas fa-plus" _mstvisible="2"></i> Agregar
                  </button>
                </div> -->
              </div>
            </div>
            <div class="grid-list">
              <div v-for="(rx, index) in this.receta.rxs" :key="index">
                <div class="grid-short">
                  <div>
                    <textarea rows="13" v-model="rx.titu" class="form-control" />
                  </div>
                  <!-- <div>
                    <i
                      @click.prevent="deleteService(index)"
                      style="cursor:pointer"
                      class="fas fa-minus-circle redOption"
                    ></i>
                  </div> -->
                </div>
              </div>
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-primary"
              @click.prevent="saveReceta()"
              :disabled="
                !medicamento || !receta.seguro || !receta.edad || !receta.cedula
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-primary"
              @click.prevent="handleUpdate()"
              :disabled="
                !receta.rxs[0].titu || !receta.seguro || !receta.edad || !receta.cedula
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/recetas2/${receta._id}`)"
            >
              <i class="fas fa-print"></i> Imprimir
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="newReceta()"
            >
              <i class="fas fa-plus"></i> Nueva Receta
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
import { Receta } from "@/interfaces/Receta";
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
  createReceta,
  eliminateRecetas,
  createRecetaa,
  getOneReceta,
  deleteReceta,
  getReceta,
  updateReceta,
  getPrint,
} from "@/services/expedientesclinicos/Receta";
import { getVitolas } from "@/services/expedientesclinicos/Vitola";
import { getFuncions } from "@/services/expedientesclinicos/Funcion";
import { createMensaje } from "@/services/expedientesclinicos/ChatService";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "recetas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      medicamento: "",
      dosis: "",
      search: "",
      seguros2: [],
      seguros: [
        "NINGUNO",
        "ARS CMD",
        "MAPFRE SALUD ARS, S.A.",
        "FUTURO",
        "META SALUD",
        "YUNEN",
        "RESERVAS",
        "MONUMENTAL",
        "ASEMAP",
        "ARS APS S A",
        "SIMAG",
        "RENACER",
        "GRUPO MEDICO ASOCIADO",
        "PRIMERA ARS DE HUMANO",
        "UNIVERSAL",
        "HUMANO SEGUROS",
        "SENASA CONTRIBUTIVO",
        "SENASA SUBSIDIADO",
        "SEMMA",
        "IDOPPRIL",
        "ARS UASD",
        "OTRA",
      ],
      currentEdition: {} as any,
      vitolas: [] as Vitola[],
      empleados: [] as Empleado[],
      empleadosEmp: [] as Empleado[],
      empleadosPeg: [] as Empleado[],
      empleadosMez: [] as Empleado[],
      campoFocus: "fechaActual",
      mensageError: "Error",
      mensageExito: "Receta Registrada Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Receta?",
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
      receta: {} as Receta,
      oneReceta: {} as Receta,
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
      printId: {} as any,
    };
  },

  async mounted() {
    if (this.$route.fullPath == "/recetas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Receta";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Receta";
    }

    if (this.modoForm == "add") {
      this.receta.no = 1;
      this.receta.consultas = [];
      this.fillFields();
      this.fixTimeAdd();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadReceta(this.$route.params.id);
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
    toRxArray() {
      this.receta.rxs.push({ titu: this.medicamento });
    },

    newReceta() {
      this.$router.push(`/recetas/new`);
      this.showDelete = false;
      this.receta.rxs = [];
      this.modoForm = "add";
      this.encabezado = "Nueva Receta";
      document.getElementById("medicamento").focus();
    },
    async loadPrint() {
      try {
        const res = await getPrint();
        this.printId = res.data;
      } catch (error) {
        // console.error(error);
      }
    },

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

    setSeguro(seguro: string, edad: number, cedula: string) {
      this.receta.seguro = seguro;
      this.receta.edad = edad;
      this.receta.cedula = cedula;
      this.showModalMethod7();
      this.search = "";
      document.getElementById("medicamento").focus();
    },

    buscar(term: string) {
      this.seguros2 = this.seguros;
      if (term !== "") {
        this.seguros2 = this.seguros.filter((seguro: any) => {
          return seguro.nombre
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
      if (this.seguros2.length == 1) {
        if (confirm("¿" + this.seguros2[0].nombre + "?")) {
          this.setSeguro(
            this.seguros2[0].nombre,
            this.seguros2[0].edad,
            this.seguros2[0].cedula
          );
          // document.getElementById("oficio").focus();
        }
      }
    },

    showModalMethod7() {
      this.seguros2 = this.seguros;
      this.showModal7 = !this.showModal7;
      // document.getElementById("oficio").focus();
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    deleteService(it: any) {
      if (confirm("Está Seguro que desea Eliminar Esta Indicación?")) {
        this.receta.rxs.splice(it, 1);
      }
    },

    editService(it: number, medicamento: any) {
      this.medicamento = medicamento;
      this.receta.rxs.splice(it, 1);
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
      if (this.medicamento !== "") {
        this.receta.rxs.push({
          titu: this.medicamento,
        });
        this.medicamento = "";
      }
      document.getElementById("medicamento").focus();
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
      this.receta.edad = years;
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

    fixTimeAdd() {
      this.receta.fechaActual = this.formatDateToFixAdd(
        this.receta.fechaActual,
        true
      );
    },

    fixTime() {
      this.receta.fecha = this.formatDateToFix(this.receta.fecha, true);
      this.receta.fechaActual = this.formatDateToFix(
        this.receta.fechaActual,
        true
      );
    },

    formatDateToFixAdd(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "h");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(4, "h");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadReceta(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getReceta(id);
        this.receta = data;
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
          this.receta.userMod = this.$store.state.user.usuario;
          await updateReceta(this.$route.params.id, this.receta);
          this.addMessage();
          this.$router.push("/recetas");
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
            await deleteReceta(this.$route.params.id);
            this.addMessage();
            this.$router.push("/recetas");
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
    calcReceta() {
      (this.receta.retension = this.receta.bruto * 0.1),
        (this.receta.neto = this.receta.bruto * 0.9);
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
      this.receta.fechaActual = new Date();
      this.receta.fecha = new Date();
      this.receta.rxs = [];
    },

    async loadOneReceta() {
      try {
        const res = await getOneReceta();
        this.oneReceta = res.data;
        this.one = this.oneReceta[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.receta.no = this.nextNo;
        this.receta.principal = this.nextNo;
        this.receta.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveRecetaa() {
      await this.loadOneReceta();
      try {
        const res = await createRecetaa(this.servicio);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveReceta() {
      this.toRxArray();
      this.toggleLoading();
      try {
        try {
          const res = await getOneReceta();
          this.oneReceta = res.data;
          this.one = this.oneReceta[0];
          this.nextNo = this.one.no + 1;
          this.receta.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.receta.userReg = this.$store.state.user.usuario;
        const res = await createReceta(this.receta).then(
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
        // this.$router.push("/recetas/");
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
      // Impresion Directa
      await this.loadPrint();
      this.$router.push(`/recetas2/${this.printId._id}`);
    },

    async deleteAllRecetas() {
      try {
        const res = await eliminateRecetas(this.receta);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.receta.nombre = "";
      this.receta.referidoPor = "";
      this.receta.fechaActual = "";
      this.receta.fechaNacimiento = "";
      this.receta.edad = "";
      this.receta.sexo = "";
      this.receta.cedula = "";
      this.receta.telefono = "";
      this.receta.direccion = "";
      this.receta.seguro = "";
      this.receta.oficio = "";
      this.receta.deporte = "";
      this.receta.ladoDominante = "";
      this.receta.app = "";
      this.receta.habitosToxicos = "";
      this.receta.antQuirurgicos = "";
      this.receta.alergias = "";
      this.receta.mecanismoLesion = "";
      this.receta.tiempoEvolucion = "";
      this.receta.elevacionAnteriorActiva = "";
      this.receta.elevacionAnteriosPasiva = "";
      this.receta.rotacionInterna = "";
      this.receta.rotacionExterna = "";
      this.receta.abd = "";
      this.receta.jobe = "";
      this.receta.speed = "";
      this.receta.obrien = "";
      this.receta.naponeon = "";
      this.receta.acromioClavicular = "";
      this.receta.inestabilidadAnterior = "";
      this.receta.inestabilidadPosterior = "";
      this.receta.cajonAnterior = "";
      this.receta.cajonPosterior = "";
      this.receta.lachman = "";
      this.receta.appley = "";
      this.receta.bostezoLateral = "";
      this.receta.bostezoMedial = "";
      this.receta.otraLesion = "";
      this.receta.estudiosSolicitados = "";
      this.receta.diagnosticoPresuntivo = "";
      this.receta.diagnosticoImagen = "";
      this.receta.medicamentos = "";
      this.receta.terapiaFisica = "";
      this.receta.cirugia = "";
      this.receta.consultas = "";
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

.grid-short {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
}

.grid-list {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
}

.grid-full {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
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
  z-index: 100;
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
