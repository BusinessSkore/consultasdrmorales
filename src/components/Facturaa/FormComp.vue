<template>
  <!-- {{ this.contEmis }}<br /><br />
  {{ this.contRecep }}<br /><br />
  {{ this.venceNcf }} -->
  <div class="unique">
    <div>
      <Navbar />
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
            Seleccione el Cliente
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
                <label class="form-label"><b>Datos de Contribuyentes</b></label>
                <div class="grid-6">
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="fechaEmision"
                      >Fecha Emisión:</label
                    ><input
                      id="fechaEmision"
                      type="date"
                      v-model="factura.fechaEmision"
                      class="form-control"
                    />
                  </div>
                  <!-- <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="rncEmisor"
                      >RNC Emisor:</label
                    >
                    <div v-show="showSpinner" class="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                    <input
                      disabled
                      id="rncEmisor"
                      type="rncEmisor"
                      v-model="factura.rncEmisor"
                      class="form-control"
                      @change="getCont(factura.rncEmisor, 'rncEmisor')"
                    />
                  </div> -->
                  <!-- <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="razSocEmisor"
                      >Razón Social Emisor:</label
                    ><input
                      disabled
                      id="razSocEmisor"
                      type="razSocEmisor"
                      v-model="factura.razSocEmisor"
                      class="form-control"
                    />
                  </div> -->
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="rncRecep"
                      >RNC Cliente:</label
                    >
                    <div v-show="showSpinner" class="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                    <input
                      id="rncRecep"
                      type="rncRecep"
                      v-model="factura.rncRecep"
                      class="form-control"
                      @change="getCont(factura.rncRecep, 'rncRecep')"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="razSocRecep"
                      >Razón Social Receptor:</label
                    ><input
                      disabled
                      id="razSocRecep"
                      type="razSocRecep"
                      v-model="factura.razSocRecep"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="ncf"
                      >NCF:</label
                    ><input
                      disabled
                      id="ncf"
                      type="ncf"
                      v-model="factura.ncf"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="venceNcf"
                      >Fecha Vencimiento NCF:</label
                    ><input
                      
                      id="venceNcf"
                      type="date"
                      v-model="factura.venceNcf"
                      class="form-control"
                    />
                  </div>
                </div>
                <label class="form-label"><b>Datos de Factura</b></label>
                <div class="grid-6">
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="conc"
                      >Concepto:</label
                    ><input
                      id="conc"
                      type="conc"
                      v-model="factura.conc"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="subTot"
                      >Subtotal:</label
                    ><input
                      id="subTot"
                      type="Number"
                      v-model="factura.subTot"
                      class="form-control"
                      @change="calcISR()"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="isr"
                      >ISR:</label
                    ><input
                      disabled
                      id="isr"
                      type="Number"
                      v-model="factura.isr"
                      class="form-control"
                    />
                  </div>
                  <div>
                    <label
                      class="ta-l col-form-label col-form-label-sm"
                      for="total"
                      >Total:</label
                    ><input
                      disabled
                      id="total"
                      type="Number"
                      v-model="factura.total"
                      class="form-control"
                    />
                  </div>
                </div>
                <div>
                  <label
                    class="ta-l col-form-label col-form-label-sm"
                    for="nota"
                    >Nota:</label
                  ><textarea
                    id="nota"
                    type="nota"
                    v-model="factura.nota"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <button
              v-if="this.modoForm == 'add'"
              class="btn btn-primary"
              @click.prevent="createFactura()"
              :disabled="
                !factura.rncEmisor ||
                  !factura.razSocEmisor ||
                  !factura.fechaEmision ||
                  !factura.ncf ||
                  !factura.venceNcf ||
                  !factura.razSocRecep ||
                  !factura.rncRecep ||
                  !factura.conc ||
                  !factura.subTot ||
                  !factura.isr ||
                  !factura.total
              "
            >
              <i class="fas fa-save"></i> Guardar
            </button>

            <!-- <button
              v-if="this.modoForm == 'show'"
              class="btn btn-success"
              @click.prevent="handleUpdate()"
              :disabled="
                !factura.fechAutor || !factura.nombARS || !this.reclamos.cantTotal > 0
              "
            >
              <i class="fas fa-save"></i> Actualizar
            </button> -->

            <button
              v-if="this.modoForm == 'show'"
              class="btn btn-warning"
              @click="this.$router.push(`/facturas2/${factura._id}`)"
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
import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";

import { Factura } from "@/interfaces/Factura";
import { create, destroy } from "@/services/facturas/Factura";
import { getone, updatencf } from "@/services/contribuyentes/Contribuyente";

import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "facturas-form",
  components: {
    Navbar,
  },
  data() {
    return {
      contEmis: {} as any,
      contRecep: {} as any,
      reclamos: [] as any[],
      facturas: [] as Factura[],
      subs: [],
      preSubs: [],
      num1: 0,
      num2: 0,
      fechaActual: "",
      search: "",
      seguros2: [],

      currentEdition: {} as any,
      // vitolas: [] as Vitola[],
      // facturas: [] as Factura[],
      // facturasEmp: [] as Factura[],
      // facturasPeg: [] as Factura[],
      // facturasMez: [] as Factura[],
      campoFocus: "fechaEmision",
      mensageError:
        "Ya Existe un Factura Registrado con este Número de Autorización",
      mensageExito: "Factura Registrado Exitosamente",
      mensageConfirm: "¿Está Seguro que desea Eliminar Este Factura?",
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
      factura: {} as Factura,
      one: {},
      nextNo: Number,
      facturaSelected: [],
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
    if (this.$route.fullPath == "/facturaas/new") {
      this.modoForm = "add";
      this.encabezado = "Nueva Factura";
    } else {
      this.modoForm = "show";
      this.encabezado = "Detalles de Factura";
    }

    if (this.modoForm == "add") {
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadFactura(this.$route.params.id);
      }
    }
    this.focus();
  },

  methods: {
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    async getCont(rncCedula: string, cont: string) {
      this.toggleSpinner();
      try {
        const res = await getone(rncCedula);
        if (cont == "rncEmisor") {
          this.contEmis = res.data;
          this.factura.razSocEmisor = this.contEmis.razonSocial;
        } else {
          this.contRecep = res.data;
          this.factura.razSocRecep = this.contRecep.razonSocial;

          switch (this.contRecep.tipoNCFFact) {
            case "B01":
              this.factura.ncf =
                "B01" + this.formatSecuence(this.contEmis.nextB01);
              this.factura.venceNcf = this.contEmis.venceB01;
              break;
            case "B15":
              this.factura.ncf =
                "B15" + this.formatSecuence(this.contEmis.nextB15);
              break;
          }
        }
      } catch (error) {
        // console.error(error);
      }
      this.toggleSpinner();
    },

    calcISR() {
      this.factura.isr = (this.factura.subTot * 0.1).toFixed(2);
      this.factura.total = (this.factura.subTot - this.factura.isr).toFixed(2);
    },
    showMessageMethod() {
      this.showMessage = !this.showMessage;
    },
    setService() {
      if (this.factura.tipServ == "Consulta") {
        this.factura.descServ = "Consulta";
      } else {
        this.factura.descServ = "";
      }
    },

    showModalAseguradorasMethod() {
      this.seguros2 = this.seguros;
      this.showModalAseguradoras = !this.showModalAseguradoras;
    },

    async redirect(id: string) {
      // alert("Redirecting");
      this.$router.push(`/facturas/${id}`);

      // Remounted
      this.modoForm = "show";
      this.encabezado = "Detalles de Factura";
      this.showDeleteMethod();
      await this.loadFactura(id);
      this.defSubs();

      // this.factura.finVac = new Date();
      // this.factura.fechaNac = new Date();
      // this.factura.fechaCont = new Date();
      this.fixTime();
      this.focus();

      this.showModalMethod7();
    },

    // async buscando() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getFacturas(this.criterio);
    //     this.facturas = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   if (this.factura.barcode !== "Todos") {
    //     this.facturas = this.facturas.filter((factura: Factura) => {
    //       return factura.nombPac
    //         .toLowerCase()
    //         .includes(this.factura.barcode.toLowerCase());
    //     });
    //   }
    //   this.toggleLoading();
    // },

    async changeFocus() {
      document.getElementById("fechAutor").focus();
      await this.buscando();
      this.showModalMethod7();
    },
    calcVenc(date: any) {
      this.factura.mesVenc = moment(date).format("MM");
      this.factura.anoVenc = moment(date).format("YYYY");
    },

    // defSubs() {
    //   this.preSubs = this.almacenes.filter((almacen: Factura) => {
    //     return almacen.desc
    //       .toLowerCase()
    //       .includes(this.factura.almacn.toLowerCase());
    //   });
    //   this.subs = this.preSubs[0].subs;
    // },

    async setSeguro(seguro: string) {
      this.factura.nombARS = seguro;
      this.showModalAseguradorasMethod();
      this.search = "";
      document.getElementById("fechAutor").focus();
      await this.loadReclamosFactura(seguro);
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
        this.factura.consultas.splice(it, 1);
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
        this.factura.consultas.push({
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
      this.factura.edad = years;
    },

    // async filterFacturas() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getPeg();
    //     this.facturasPeg = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }

    //   try {
    //     const res = await getEmp();
    //     this.facturasEmp = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }

    //   try {
    //     const res = await getMez();
    //     this.facturasMez = res.data;
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

    // async loadFacturas() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getFacturas(this.criterio);
    //     this.seguros = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    fixTime() {
      if (this.factura.fechaEmision) {
        this.factura.fechaEmision = this.formatDateToFix(
          this.factura.fechaEmision,
          false
        );
      }
      if (this.factura.venceNcf) {
        this.factura.venceNcf = this.formatDateToFix(
          this.factura.venceNcf,
          false
        );
      }
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        let out = moment(dateValue).add(0, "hours");
        return moment(out).format("yyyy-MM-DD");
      }
    },

    // async loadReclamosFactura(seguro: string) {
    //   this.toggleLoading();
    //   try {
    //     // const { data } = await getReclamosFactura(seguro);
    //     this.reclamos = data;
    //     // this.fixTime();
    //   } catch (error) {
    //     //console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    // async putReclamosFactura(seguro: string, facturaNo: number) {
    //   this.toggleLoading();
    //   try {
    //     const { data } = await postReclamosFactura(seguro, facturaNo);
    //     this.reclamos = data;
    //     // this.fixTime();
    //   } catch (error) {
    //     //console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    // async loadFactura(id: string) {
    //   this.toggleLoading();
    //   try {
    //     const { data } = await getFactura(id);
    //     this.factura = data;
    //     // this.reclamos0 = await getReclamosFactura2(this.factura.no);
    //     this.reclamos = this.reclamos0.data;
    //     // this.fixTime();
    //   } catch (error) {
    //     //console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    // async handleUpdate() {
    //   this.toggleLoading();
    //   try {
    //     if (typeof this.$route.params.id === "string") {
    //       this.factura.userMod = this.$store.state.user.usuario;
    //       await updateFactura(this.$route.params.id, this.factura);
    //       // this.addMessage();
    //       this.$router.push("/facturas");
    //     }
    //   } catch (error) {
    //     //console.error(error);
    //   }
    //   this.toggleLoading();
    //   // this.toggleAlert();
    // },

    async destroyFactura() {
      if (confirm(this.mensageConfirm)) {
        try {
          if (typeof this.$route.params.id === "string") {
            await destroy(
              this.factura.rncEmisor,
              this.factura.rncRecep + "#" + this.factura.fechaEmision
            );
            // await restartFactura(this.factura.no);
            // this.addMessage();
            this.$router.push("/facturas");
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
    calcFactura() {
      (this.factura.retension = this.factura.bruto * 0.1),
        (this.factura.neto = this.factura.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "hours");
      return moment(out).format("DD/MM/YYYY");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.factura.fechaEmision = new Date();
      this.factura.rncEmisor = "04900722440";
      this.getCont(this.factura.rncEmisor, "rncEmisor");
    },

    // async loadOneFactura() {
    //   try {
    //     const res = await getOneFactura();
    //     this.oneFactura = res.data;
    //     this.one = this.oneFactura[0];
    //     if (typeof this.one.no === "number") {
    //       this.nextNo = this.one.no + 1;
    //     } else {
    //       this.one.no = 0;
    //       this.nextNo = this.one.no + 1;
    //     }
    //     if (this.nextNo == null) {
    //       this.nextNo = 0;
    //     }
    //     this.factura.no = this.nextNo;
    //     this.factura.principal = this.nextNo;
    //     this.factura.principal = this.nextNo;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    // },

    async createFactura() {
      this.toggleLoading();
      this.factura.rncReceptorFechaEmision =
        this.factura.rncRecep + "#" + this.factura.fechaEmision;
      this.factura.subTot = parseFloat(this.factura.subTot).toFixed(2);
      this.factura.isr = parseFloat(this.factura.isr).toFixed(2);
      this.factura.total = parseFloat(this.factura.total).toFixed(2);
      this.factura.fechaEmision = this.formatDate(this.factura.fechaEmision);
      try {
        const res = await create(this.factura);
        this.$store.state.user.factura = res.data.Item;
        let updateKey;
        let updateValue;
        if (this.contRecep.tipoNCFFact == "B01") {
          updateKey = "nextB01";
          updateValue = this.contEmis.nextB01 + 1;
        } else {
          updateKey = "nextB15";
          updateValue = this.contEmis.nextB15 + 1;
        }

        await updatencf({
          rncCedula: this.factura.rncEmisor,
          updateKey: updateKey,
          updateValue: updateValue,
        });

        this.$router.push(`/facturaas2/print`);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
      this.toggleLoading();
    },

    async saveFactura() {
      this.toggleLoading();
      try {
        // try {
        //   const res = await getOneFactura();
        //   this.oneFactura = res.data;
        //   this.one = this.oneFactura[0];
        //   this.nextNo = this.one.no + 1;
        //   this.factura.no = this.nextNo;
        // } catch (error) {
        //   // // console.error(error);
        // }
        this.factura.userReg = this.$store.state.user.usuario;
        // this.factura.aut = this.factura.aut.toUpperCase().trim();
        this.factura.cantTotal = this.reclamos.cantTotal;
        this.factura.montoTotal = this.reclamos.montoTotal;
        // try {
        //   const { data } = await postReclamosFactura(
        //     this.factura.nombARS,
        //     this.factura.no
        //   );
        //   this.reclamos = data;
        //   // this.fixTime();
        // } catch (error) {
        //   //console.error(error);
        // }
        // const res = await createFactura(this.factura).then(
        //   (res) => {
        //     this.error = this.respuesta = res.data.title;
        //     // this.$router.push("/");
        //     this.res = res;
        //     this.respuesta = res.data;
        //     // // this.addMessage();
        //   },
        //   (err) => {
        //     // console.log(err.response);
        //     this.error = err.response.data.error;
        //     this.showMessageMethod();
        //     document.getElementById("btnAcept").focus();
        //   }
        // );
        // this.$router.push("/facturas/");
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

    // async deleteAllFacturas() {
    //   try {
    //     const res = await eliminateFacturas(this.factura);
    //     // // console.log(res);
    //   } catch (error) {
    //     // // console.error(error);
    //   }
    // },

    cleanFields() {
      this.factura.aflNSS = "";
      this.factura.cedu = "";
      this.factura.nombPac = "";
      this.factura.sex = "";
      this.factura.telMed = "";
      this.factura.fechaNacimiento = "";
      this.factura.edad = "";
      this.factura.dir = "";
      this.factura.dx = "";
      this.factura.nombARS = "";
      this.factura.tipServ = "";
      this.factura.montRec = "";
      this.factura.fechAutor = "";
      this.reclamos = [];
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
      if (this.factura.tipo == "cent") {
        this.factura.nombPres = "Clínica Cruz Jiminián";
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

.mycard-body {
  overflow-x: scroll;
  margin-top: 10px;
}
.bold {
  font-weight: bold;
}
.der {
  text-align: right;
}
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
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
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
  z-index: 100;
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
