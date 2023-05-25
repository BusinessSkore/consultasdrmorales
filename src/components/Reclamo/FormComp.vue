<template>
  <!-- {{ this.reclamos }} -->
  <!-- {{ this.reclamo }} -->
  <!-- {{ this.error }} -->
  <!-- <h1>Subs: {{ this.subs }}</h1>
  <h1>PreSubs: {{ this.preSubs }}</h1> -->

  <!-- {{ this.currentEdition }} -->
  <!-- {{ this.seguros2.length }} -->
  <div class="unique">
    <div>
      <Navbar />
      <!-- {{ formatDate(this.reclamo.ultimoPago) }}<br /> -->
      <!-- {{ formatDate(this.fechaActual) }}<br /> -->
      <!-- {{
        formatDate(this.fechaActual) -
          formatDate(this.reclamo.ultimoPago) -
          1
      }}<br />
      {{
        (formatDate(this.fechaActual) -
          formatDate(this.reclamo.ultimoPago)) *
          this.reclamo.monto
      }} -->
      <Transition>
        <div v-if="cargando" class="spin">
          <img class="img" src="@/assets/images/logo.png" />
        </div>
      </Transition>

      <div v-if="showMessage" class="message">
        <div class="contenedormessage">
          <header>
            Mensaje
          </header>
          <div class="contenidomessage">
            <p :class="isError(error)">{{ error }}</p>

            <button
              id="btnAcept"
              class="btn btn-primary"
              @click.prevent="this.showMessageMethod()"
            >
              <i class="fas fa-check"></i> Aceptar
            </button>
          </div>
        </div>
      </div>

      <div v-if="showModalAseguradoras" class="modal7">
        <div class="contenedor7">
          <header>
            Seleccione la Aseguradora
            <!-- <span class="closeModal" @click="this.showModalAseguradorasMethod()"
              >X</span
            > -->
          </header>
          <div class="contenido7">
            <!-- <label @click="this.showModalAseguradorasMethod()" for="btn-modal"
              >X</label
            > -->
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
                  @click="setSeguro(seguro)"
                >
                  {{ seguro }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!cargando" class="general">
        <!-- <h6 :class="isError(error)">{{ error }}</h6> -->
        <form>
          <fieldset>
            <div class="card ">
              <h6>{{ encabezado }}</h6>
              <div class="card-body">
                <label class="form-label"><b>Datos del Paciente</b></label>
                <div class="grid-4">
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="aflNSS,"
                      >No. de Afiliado o NSS:</label
                    >
                    <div v-show="showSpinner" class="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>

                    <input
                      id="aflNSS"
                      type="aflNSS"
                      v-model="reclamo.aflNSS"
                      class="form-control"
                      @change="loadPatient(reclamo.aflNSS)"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="cedu,"
                      >Cédula:</label
                    ><input
                      disabled
                      id="cedu"
                      type="cedu"
                      v-model="reclamo.cedu"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="nombPac"
                      >Nombre y Apellido:</label
                    ><input
                      disabled
                      id="nombPac"
                      type="nombPac"
                      v-model="reclamo.nombPac"
                      class="form-control"
                      @focus="this.showModalMethod7()"
                    />
                  </div>

                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="sex,"
                      >Sexo:</label
                    ><select
                      disabled
                      id="sex"
                      type="sex"
                      v-model="reclamo.sex"
                      class="form-select"
                    >
                      <option>Masculino</option>
                      <option>Femenino</option>
                    </select>
                  </div>

                  <div v-show="isMed()">
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="telMed,"
                      >Teléfono:</label
                    ><input
                      disabled
                      id="telMed"
                      type="telMed"
                      v-model="reclamo.telMed"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="fechaNacimiento"
                      >Fecha de Nacimiento:</label
                    ><input
                      disabled
                      @change="calcularEdad(reclamo.fechaNacimiento)"
                      id="fechaNacimiento"
                      type="Date"
                      v-model="reclamo.fechaNacimiento"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="edad,"
                      >Edad:</label
                    ><input
                      disabled
                      id="edad"
                      min="0"
                      type="Number"
                      v-model="reclamo.edad"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="dir,"
                      >Dirección:</label
                    ><input
                      disabled
                      id="dir"
                      type="dir"
                      v-model="reclamo.dir"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-body">
                <label class="form-label"><b>Datos de la Reclamación</b></label>
                <div class="grid-6">
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="aut,"
                      >Autorización:</label
                    ><input
                      id="aut"
                      type="aut"
                      v-model="reclamo.aut"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="dx,"
                      >Diagnóstico:</label
                    ><input
                      disabled
                      id="dx"
                      type="dx"
                      v-model="reclamo.dx"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="nombARS,"
                      >Aseguradora:</label
                    ><input
                      
                      id="nombARS"
                      type="nombARS"
                      v-model="reclamo.nombARS"
                      @focus="this.showModalAseguradorasMethod()"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="aut,"
                      >Tipo de Servicio:</label
                    ><input
                      disabled
                      id="aut"
                      type="aut"
                      v-model="reclamo.tipServ"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="aut,"
                      >Monto Reclamado:</label
                    ><input
                      
                      id="aut"
                      type="aut"
                      v-model="reclamo.montRec"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="fechAutor,"
                      >Fecha:</label
                    ><input
                      id="fechAutor"
                      type="Date"
                      v-model="reclamo.fechAutor"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- <label class="form-label"><b>Datos Generales</b></label> -->
            <div class="grid">
              <!-- inicios de Campos -->
              <!-- <div>
                <label class="ta-l col-form-label col-form-label-sm" for="tipo,"
                  >Tipo de Reclamación:</label
                ><select
                  id="tipo"
                  type="tipo"
                  v-model="reclamo.tipo"
                  class="form-select"
                >
                  <option value="cent">Centro</option>
                  <option value="med">Médico</option>
                </select>
              </div> -->
              <!-- <div v-show="isMed()">
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="espec,"
                  >Especialidad:</label
                ><input
                  id="espec"
                  type="espec"
                  v-model="reclamo.espec"
                  class="form-control"
                />
              </div> -->
              <!-- <div v-show="isMed()">
                <label class="ta-l col-form-label col-form-label-sm" for="exeq,"
                  >Exequatur:</label
                ><input
                  id="exeq"
                  type="exeq"
                  v-model="reclamo.exeq"
                  class="form-control"
                />
              </div> -->
              <!-- <div v-show="isMed()">
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="ceduMed,"
                  >Cédula:</label
                ><input
                  id="ceduMed"
                  type="ceduMed"
                  v-model="reclamo.ceduMed"
                  class="form-control"
                />
              </div> -->
              <!-- <div v-show="isMed()">
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="telMed,"
                  >Teléfono:</label
                ><input
                  id="telMed"
                  type="telMed"
                  v-model="reclamo.telMed"
                  class="form-control"
                />
              </div> -->

              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="facNo,"
                  >Factura No.:</label
                ><input
                  id="facNo"
                  type="facNo"
                  v-model="reclamo.facNo"
                  class="form-control"
                />
              </div> -->
            </div>
            <!-- <label class="form-label"><b>Datos del Prestador</b></label> -->
            <div class="grid">
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="nombPres,"
                  >Nombre:</label
                ><input
                  id="nombPres"
                  type="nombPres"
                  v-model="reclamo.nombPres"
                  class="form-control"
                />
              </div> -->
              <!-- <div>
                <label
                  class="ta-l col-form-label col-form-label-sm"
                  for="codPres,"
                  >Código:</label
                ><input
                  id="codPres"
                  type="codPres"
                  v-model="reclamo.codPres"
                  class="form-control"
                />
              </div> -->
              <!-- <div v-show="!isMed()">
                <label class="ta-l col-form-label col-form-label-sm" for="med,"
                  >Médico:</label
                ><input
                  id="med"
                  type="med"
                  v-model="reclamo.med"
                  class="form-control"
                />
              </div> -->
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-primary"
              @click.prevent="saveReclamo()"
              :disabled="
                !reclamo.aut ||
                  !reclamo.fechAutor ||
                  !reclamo.nombARS ||
                  !reclamo.montRec ||
                  !reclamo.nombPac ||
                  !reclamo.cedu ||
                  !reclamo.aflNSS ||
                  !reclamo.sex ||
                  !reclamo.dir ||
                  !reclamo.dx
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !reclamo.aut ||
                  !reclamo.fechAutor ||
                  !reclamo.nombARS ||
                  !reclamo.montRec ||
                  !reclamo.nombPac ||
                  !reclamo.cedu ||
                  !reclamo.aflNSS ||
                  !reclamo.sex ||
                  !reclamo.edad ||
                  !reclamo.dir ||
                  !reclamo.dx
              "
            >
              <i class="fas fa-save"></i> Actualizar
            </button>

            <!-- <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/reclamos2/${reclamo._id}`)"
            >
              <i class="fas fa-print"></i> Imprimir
            </button> -->

            <button
              class="btn btn-danger"
              @click.prevent="handleDelete()"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
            <!-- <button
              v-if="showDelete"
              class="btn btn-danger"
              @click.prevent="handleDelete()"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button> -->
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";
import { Reclamo } from "@/interfaces/Reclamo";
// import { Funcion } from "@/interfaces/Funcion";
// import { Vitola } from "@/interfaces/Vitola";
// import { Reclamo } from "@/interfaces/Reclamo";
// import {
//   getPeg,
//   getMez,
//   getEmp,
// } from "@/services/expedientesclinicos/Reclamo";
// import { getLigas } from "@/services/expedientesclinicos/Liga";
import {
  createReclamo,
  eliminateReclamos,
  createReclamoa,
  getOneReclamo,
  deleteReclamo,
  getReclamo,
  updateReclamo,
} from "@/services/expedientesclinicos/Reclamo";
import { GetByAflNSS } from "@/services/expedientesclinicos/Expediente";
// import { getVitolas } from "@/services/expedientesclinicos/Vitola";
// import { getFuncions } from "@/services/expedientesclinicos/Funcion";
import { createMensaje } from "@/services/expedientesclinicos/ChatService";
import { getReclamos } from "@/services/expedientesclinicos/Reclamo";
import numeral from "numeral";
import moment from "moment";
// import Pusher from "pusher-js";

export default defineComponent({
  name: "reclamos-form",
  components: {
    Navbar,
  },
  data() {
    return {
      reclamos: [] as Reclamo[],
      subs: [],
      preSubs: [],
      almacenes: [
        {
          desc: "Almacén No. 01 (General)",
          subs: ["Donaciones", "Venta / Servicios", "Muestras Médicas"],
        },
        {
          desc: "Almacén No. 02 (Suministro de Oficina y Limpieza)",
          subs: [
            "Sub-01 (Materiales de Oficina)",
            "Sub-02 (Materiales de Limpieza)",
          ],
        },
        {
          desc: "Almacén No. 03 (Abastecimiento)",
          subs: [
            "Sub-01 (Carro de Paro UCI)",
            "Sub-02 (Carro de Paro 2do Piso)",
            "Sub-03 (Carro de Paro Perinato)",
            "Sub-04 (Carro de Paro Quirófano)",
            "Sub-05 (Carro de Paro 3er Piso)",
          ],
        },
        {
          desc: "Almacén No. 04 (Emergencia, Quirófano y Ambulatorio)",
          subs: [
            "Sub-01 (Emergencia)",
            "Sub-02 (Depósito Quirófano)",
            "Sub-03 (Imágenes)",
            "Sub-04 (Laboratorio Clínico)",
            "Sub-05 (Laboratorio Biomolecular)",
            "Sub-06 (Farmacia 3er Piso)",
            "Sub-07 (Emergencia Pediatrica)",
          ],
        },
        {
          desc: "Almacén No. 70 (Cocina)",
          subs: [
            "Sub-01 (Alimentos)",
            "Sub-02 (Bebidas y Líquidos)",
            "Sub-03 (Suministros)",
            "Sub-04 (Utencilios)",
          ],
        },
        {
          desc: "Almacén No. 98 (Vencidos)",
          subs: [],
        },
        {
          desc: "Almacén No. 99 (Averiado)",
          subs: [],
        },
      ],
      num1: 0,
      num2: 0,
      fechaActual: "",
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
      // vitolas: [] as Vitola[],
      // reclamos: [] as Reclamo[],
      // reclamosEmp: [] as Reclamo[],
      // reclamosPeg: [] as Reclamo[],
      // reclamosMez: [] as Reclamo[],
      campoFocus: "aflNSS",
      mensageError:
        "Ya Existe un Reclamo Registrado con este Número de Autorización",
      mensageExito: "Reclamo Registrado Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Reclamo?",
      encabezado: "",
      modoForm: "",
      // funciones: [] as Funcion[],
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
      showMessage: false,
      loadedAfiliado: {},
      cargando: false,
      showSpinner: false,
      reclamo: {} as Reclamo,
      oneReclamo: {} as Reclamo,
      one: {},
      nextNo: Number,
      reclamoSelected: [],
      clienteSelected: [],
      descripcionCliente: "",

      showInComentary: "",
      showModal: false,
      showModal7: false,
      showModalAseguradoras: false,
      showDelete: false,
      currentConsulta: "",
      estado: {} as object,
    };
  },

  async mounted() {
    // this.fechaActual = new Date();
    // this.loadReclamos();
    // this.seguros = [
    //   "Victor Osiris Alcántara Castro",
    //   "Abel David Ventura Rivas",
    // ];
    if (this.$route.fullPath == "/reclamos/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Reclamación por Consulta";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Reclamación por Consulta";
    }

    if (this.modoForm == "add") {
      this.reclamo.no = 1;
      this.reclamo.consultas = [];
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadReclamo(this.$route.params.id);
        // this.defSubs();

        // this.reclamo.finVac = new Date();
        // this.reclamo.fechaNac = new Date();
        // this.reclamo.fechaCont = new Date();
      }
      this.fixTime();
    }

    this.focus();
    // this.loadReclamos();
    // this.loadLigas();
    // this.loadVitolas();
    // this.filterReclamos();
  },

  methods: {
    showMessageMethod() {
      this.showMessage = !this.showMessage;
    },
    setService() {
      if (this.reclamo.tipServ == "Consulta") {
        this.reclamo.descServ = "Consulta";
      } else {
        this.reclamo.descServ = "";
      }
    },

    showModalAseguradorasMethod() {
      this.seguros2 = this.seguros;
      this.showModalAseguradoras = !this.showModalAseguradoras;
    },

    async redirect(id: string) {
      // alert("Redirecting");
      this.$router.push(`/reclamos/${id}`);

      // Remounted
      this.modoForm = "show";
      this.encabezado = "Detalles de Reclamo";
      this.showDeleteMethod();
      await this.loadReclamo(id);
      this.defSubs();

      // this.reclamo.finVac = new Date();
      // this.reclamo.fechaNac = new Date();
      // this.reclamo.fechaCont = new Date();
      this.fixTime();
      this.focus();

      this.showModalMethod7();
    },

    async buscando() {
      this.toggleLoading();
      try {
        const res = await getReclamos(this.criterio);
        this.reclamos = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (this.reclamo.barcode !== "Todos") {
        this.reclamos = this.reclamos.filter((reclamo: Reclamo) => {
          return reclamo.nombPac
            .toLowerCase()
            .includes(this.reclamo.barcode.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async changeFocus() {
      document.getElementById("fechAutor").focus();
      await this.buscando();
      this.showModalMethod7();
    },
    calcVenc(date: any) {
      this.reclamo.mesVenc = moment(date).format("MM");
      this.reclamo.anoVenc = moment(date).format("YYYY");
    },

    // defSubs() {
    //   this.preSubs = this.almacenes.filter((almacen: Reclamo) => {
    //     return almacen.desc
    //       .toLowerCase()
    //       .includes(this.reclamo.almacn.toLowerCase());
    //   });
    //   this.subs = this.preSubs[0].subs;
    // },

    setSeguro(seguro: string) {
      this.reclamo.nombARS = seguro;
      this.showModalAseguradorasMethod();
      this.search = "";
      document.getElementById("fechAutor").focus();
    },

    buscar(term: string) {
      this.seguros2 = this.seguros;
      if (term !== "") {
        this.seguros2 = this.seguros.filter((seguro: string) => {
          return seguro.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (this.seguros2.length == 1) {
        if (confirm("¿" + this.seguros2[0] + "?")) {
          this.setSeguro(this.seguros2[0]);
          document.getElementById("autPor").focus();
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
      if (confirm("Está Seguro que desea Eliminar Esta Consulta?")) {
        this.reclamo.consultas.splice(it, 1);
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
        this.reclamo.consultas.push({
          description: this.currentConsulta,
          date: new Date(),
        });
        this.currentConsulta = "";
      }
      document.getElementById("barcode").focus();
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
      this.reclamo.edad = years;
    },

    // async filterReclamos() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getPeg();
    //     this.reclamosPeg = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }

    //   try {
    //     const res = await getEmp();
    //     this.reclamosEmp = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }

    //   try {
    //     const res = await getMez();
    //     this.reclamosMez = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }

    //   this.toggleLoading();
    // },

    // async loadLigas() {
    //   // this.toggleLoading();
    //   try {
    //     const res = await getLigas();
    //     this.ligas = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   // this.toggleLoading();
    // },

    // async loadVitolas() {
    //   // this.toggleLoading();
    //   try {
    //     const res = await getVitolas();
    //     this.vitolas = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   // this.toggleLoading();
    // },

    async loadReclamos() {
      this.toggleLoading();
      try {
        const res = await getReclamos(this.criterio);
        this.seguros = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    fixTime() {
      if (this.reclamo.fechAutor) {
        this.reclamo.fechAutor = this.formatDateToFix(
          this.reclamo.fechAutor,
          false
        );
      }
      if (this.reclamo.fechaNacimiento) {
        this.reclamo.fechaNacimiento = this.formatDateToFix(
          this.reclamo.fechaNacimiento,
          false
        );
      }
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(4, "hours");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    async loadPatient(aflNSS: string) {
      this.toggleSpinner();
      try {
        const { data } = await GetByAflNSS(aflNSS);
        this.reclamo.cedu = data.cedula;
        this.reclamo.nombPac = data.nombre;
        this.reclamo.fechAutor = this.formatDateToFix(data.updatedAt, false);
        this.reclamo.nombARS = data.seguro;
        this.reclamo.sex = data.sexo;
        this.reclamo.telMed = data.telefono;
        this.reclamo.dx = data.diagnosticoPresuntivo;
        this.reclamo.fechaNacimiento = this.formatDateToFix(
          data.fechaNacimiento,
          false
        );
        this.reclamo.edad = data.edad;
        this.reclamo.dir = data.direccion;
        document.getElementById("aut").focus();
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleSpinner();
    },

    async loadReclamo(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getReclamo(id);
        this.reclamo = data;
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
          this.reclamo.userMod = this.$store.state.user.usuario;
          await updateReclamo(this.$route.params.id, this.reclamo);
          // this.addMessage();
          this.$router.push("/reclamos");
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
            await deleteReclamo(this.$route.params.id);
            // this.addMessage();
            this.$router.push("/reclamos");
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
    calcReclamo() {
      (this.reclamo.retension = this.reclamo.bruto * 0.1),
        (this.reclamo.neto = this.reclamo.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("MM");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.reclamo.instit = "Instituto Avanzado de Artroscopía y Artroplastía";
      this.reclamo.nombPres = "Dr. Carlos Morales Ángeles";
      this.reclamo.tipServ = "Consulta";
      this.reclamo.descServ = "Consulta";
      this.reclamo.tipo = "med";
      this.reclamo.lote = 0;
      this.reclamo.montRec = 500;

      // this.reclamo.fechaNac = new Date();
      // this.reclamo.fechaCont = new Date();
    },

    async loadOneReclamo() {
      try {
        const res = await getOneReclamo();
        this.oneReclamo = res.data;
        this.one = this.oneReclamo[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.reclamo.no = this.nextNo;
        this.reclamo.principal = this.nextNo;
        this.reclamo.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveReclamoa() {
      await this.loadOneReclamo();
      try {
        const res = await createReclamoa(this.reclamo);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveReclamo() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneReclamo();
          this.oneReclamo = res.data;
          this.one = this.oneReclamo[0];
          this.nextNo = this.one.no + 1;
          this.reclamo.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.reclamo.userReg = this.$store.state.user.usuario;
        this.reclamo.aut = this.reclamo.aut.toUpperCase().trim();
        const res = await createReclamo(this.reclamo).then(
          (res) => {
            this.error = this.respuesta = res.data.title;
            // this.$router.push("/");
            this.res = res;
            this.respuesta = res.data;
            // // this.addMessage();
          },
          (err) => {
            // console.log(err.response);
            this.error = err.response.data.error;
            this.showMessageMethod();
            document.getElementById("btnAcept").focus();
          }
        );
        // this.$router.push("/reclamos/");
      } catch (error) {
        // // console.error(error);
      }
      await this.toggleLoading();
      if (this.error !== this.mensageError) {
        await this.cleanFields();
      }
      await this.fillFields();
      await this.fixTime();
      document.getElementById(this.campoFocus).focus();
      this.toggleAlert();
    },

    async deleteAllReclamos() {
      try {
        const res = await eliminateReclamos(this.reclamo);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.reclamo.aflNSS = "";
      this.reclamo.cedu = "";
      this.reclamo.nombPac = "";
      this.reclamo.sex = "";
      this.reclamo.telMed = "";
      this.reclamo.fechaNacimiento = "";
      this.reclamo.edad = "";
      this.reclamo.dir = "";
      this.reclamo.aut = "";
      this.reclamo.dx = "";
      this.reclamo.nombARS = "";
      this.reclamo.tipServ = "";
      this.reclamo.montRec = "";
      this.reclamo.fechAutor = "";
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    toggleSpinner() {
      this.showSpinner = !this.showSpinner;
    },

    focus() {
      document.getElementById(this.campoFocus).focus();
    },
    focus2() {
      document.getElementById(this.campoFocus2).focus();
    },

    isMed() {
      if (this.reclamo.tipo == "cent") {
        this.reclamo.nombPres = "Clínica Cruz Jiminián";
        return false;
      } else {
        return true;
      }
    },
  },
});
</script>

<style lang="css" scoped>
/* Start New Spinner */

.lds-ripple {
  display: inline-block;
  position: absolute;
  width: 40px;
  height: 40px;
}
.lds-ripple div {
  position: absolute;
  border: 2px solid rgb(47, 164, 231);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 36px;
    height: 36px;
    opacity: 0;
  }
}
/* end New Spinner */
/* .btn {
  margin-bottom: 500px;
} */

.unique {
  background-color: rgb(243, 242, 242);
}
.card {
  margin-bottom: 20px;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
}

.bg-secondary {
  margin-bottom: 10px;
}

/* .closeModal {
  cursor: pointer;
} */

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
  box-shadow: 0px 1px 10px rgba(5, 24, 250, 0.4);
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

.grid-4 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
}

.grid-6 {
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

/* h4 {
  background-color: grey;
  color: white;
  text-align: center;
  box-shadow: 2px 2px 10px rgb(199, 199, 199);
} */

h6 {
  color: white;
  font-weight: bold;
  /* text-align: center; */
  background-color: rgb(47, 164, 231);
  /* background-color: rgb(147, 147, 147); */
  padding: 5px;
}

h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
}

/* fieldset {
  margin-top: 40px;
} */

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
  /* color: rgb(47, 164, 231); */
  /* border-radius: 7px; */
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
  height: 70px;
  width: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
}

.img {
  pointer-events: none;
  /* opacity: 0.7; */
  width: 55px;
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
  margin-top: 40px;
  /* margin-bottom: 20px; */
  background-color: rgb(255, 85, 85);
}

.success {
  color: white;
  text-align: center;
  margin-top: 40px;
  /* margin-bottom: 20px; */
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
  cursor: pointer;
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
  /* background: rgba(5, 24, 250, 0.1); */
  transition: all 500ms ease;
}

.contenedor {
  width: 700px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  /* background: rgb(47, 164, 231); */
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

#search {
  margin-top: 35px;
}

.modal7 {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(5, 24, 250, 0.1); */
  transition: all 500ms ease;
  overflow-y: scroll;
  z-index: 100
}

.contenedor7 {
  width: 350px;
  height: 350px;
  overflow-y: scroll;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor7 header {
  padding: 10px;
  background: rgb(47, 164, 231);
  color: #fff;
  position: fixed;
  width: 350px;
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

.ars {
  margin: 0%;
  font-size: 12px;
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
  box-shadow: 10px 10px 7px rgba(5, 24, 250, 0.7);
  -moz-box-shadow: 10px 10px 7px rgba(5, 24, 250, 0.7);
  -webkit-box-shadow: 10px 10px 7px rgba(5, 24, 250, 0.7);
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

/* .card-body {
  background-color: #ddd;
  overflow-x: scroll;
} */

/* Message Modal Start */
/* Modal 7 */

#search {
  margin-top: 35px;
}

.message {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* background: rgba(5, 24, 250, 0.1); */
  transition: all 500ms ease;
  /* overflow-y: scroll; */
  z-index: 100;
}

.contenedormessage {
  width: 350px;
  height: 200px;
  /* overflow-y: scroll; */
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(0, 0, 0, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedormessage header {
  padding: 10px;
  background: rgb(47, 164, 231);
  color: #fff;
  position: fixed;
  width: 350px;
}

.contenedormessage label {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.contenidomessage {
  padding: 7px;
}
/* Message Modal Finish */
</style>
