<template>
  <div class="unique">
    <div class="flex-container">
      <div>
        <p style="font-size: 80%; text-align: left;">
          <span class="bold">No.: </span>{{ formatSecuence(lote.no) }}
        </p>
        <p style="font-size: 80%;text-align: left;">
          <span class="bold">Fecha: </span>{{ formatDate(lote.fechAutor) }}
        </p>
        <p style="font-size: 80%;text-align: left;">
          <span class="bold">Aseguradora: </span>{{ lote.nombARS }}
        </p>
        <p style="font-size: 80%;text-align: left;">
          <span class="bold">Código PSS: </span>
        </p>
        <p style="font-size: 80%;text-align: left;">
          <span class="bold">Centro Médico:: </span>
        </p>
      </div>
      <div>
        <p style="font-size: 80%; text-align: right;">
          Dr. Carlos Morales Ángeles
        </p>
        <p style="font-size: 80%;text-align: right;">
          Exq 473-10
        </p>
        <p style="font-size: 80%;text-align: right;">
          Ortopedia, Traumatología,
        </p>
        <p style="font-size: 80%;text-align: right;">
          Artroscopia y Medicina Deportiva
        </p>
        <p style="font-size: 80%;text-align: right;">
          Tel: (809) 770-9215 / Cel: (809) 603-6463
        </p>
      </div>
    </div>
    <br />
    <label style="font-weight: bold">Detalle de Reclamaciones</label>
    <div>
      <table id="customers">
        <tr>
          <th>Autorización</th>
          <th>Fecha</th>
          <th>Paciente</th>
          <th>Afiliado o NSS</th>
          <th>Monto Reclamado</th>
        </tr>
        Consultas
        <tr
          @click="this.$router.push(`/reclamos/${reclamo._id}`)"
          v-for="(reclamo, index) in reclamos.cons"
          :key="index"
        >
          <td>{{ reclamo.aut }}</td>
          <td class="der">
            {{ formatDate(reclamo.fechAutor, false) }}
          </td>
          <td>{{ reclamo.nombPac }}</td>
          <td>{{ reclamo.aflNSS }}</td>
          <td class="der">
            {{ formatNumber(reclamo.montRec, true) }}
          </td>
        </tr>
        <tr>
          <td class="bold">Total Consultas</td>
          <td></td>
          <td></td>
          <td class="der bold">{{ this.reclamos.cantCons }}</td>
          <td class="der bold">
            {{ formatNumber(this.reclamos.montoCons) }}
          </td>
        </tr>
        <br />
        Cirugías
        <tr
          @click="this.$router.push(`/reclamos/${reclamo._id}`)"
          v-for="(reclamo, index) in reclamos.ciru"
          :key="index"
        >
          <td>{{ reclamo.aut }}</td>
          <td class="der">
            {{ formatDate(reclamo.fechAutor, false) }}
          </td>
          <td>{{ reclamo.nombPac }}</td>
          <td>{{ reclamo.aflNSS }}</td>
          <td class="der">
            {{ formatNumber(reclamo.montRec, true) }}
          </td>
        </tr>
        <tr>
          <td class="bold">Total Cirugías</td>
          <td></td>
          <td></td>
          <td class="der bold">{{ this.reclamos.cantCiru }}</td>
          <td class="der bold">
            {{ formatNumber(this.reclamos.montociru) }}
          </td>
        </tr>

        <br />
        Servicios
        <tr>
          <td class="bold">Total Servicios</td>
          <td></td>
          <td></td>
          <td class="der bold">{{ this.reclamos.cantTotal }}</td>
          <td class="der bold">
            {{ formatNumber(this.reclamos.montoTotal) }}
          </td>
        </tr>
      </table>
    </div>
    <div>
      <Transition>
        <div v-if="cargando" class="spin">
          <img class="img" src="@/assets/images/logo.png" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Lote } from "@/interfaces/Lote";
import {
  createLote,
  eliminateLotes,
  createLotea,
  getOneLote,
  deleteLote,
  getLote,
  updateLote,
} from "@/services/expedientesclinicos/Lote";
import {
  getReclamosLote2,
  postReclamosLote,
  restartLote,
} from "@/services/expedientesclinicos/Reclamo";
import { GetByAflNSS } from "@/services/expedientesclinicos/Expediente";
import { createMensaje } from "@/services/expedientesclinicos/ChatService";
import { getLotes } from "@/services/expedientesclinicos/Lote";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "lotes-form",
  components: {},
  data() {
    return {
      reclamos: [] as any[],
      lotes: [] as Lote[],
      subs: [],
      preSubs: [],

      num1: 0,
      num2: 0,
      fechaActual: "",
      search: "",
      seguros2: [],
      campoFocus: "fechAutor",
      encabezado: "",
      modoForm: "",
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
      lote: {} as Lote,
      oneLote: {} as Lote,
      one: {},
      nextNo: Number,
      loteSelected: [],
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
    // this.loadLotes();
    // this.seguros = [
    //   "Victor Osiris Alcántara Castro",
    //   "Abel David Ventura Rivas",
    // ];
    if (this.$route.fullPath == "/lotes/new") {
      this.modoForm = "add";
      this.encabezado = "Nuevo Lote de Reclamaciones";
    } else {
      this.modoForm = "show";
    }

    if (this.modoForm == "add") {
      this.lote.no = 1;
      this.lote.consultas = [];
      this.fillFields();
      this.fixTime();
    } else {
      this.showDeleteMethod();
      if (typeof this.$route.params.id === "string") {
        await this.loadLote(this.$route.params.id);

        this.toPrint();

        // if (this.$store.state.ids.length == 0) {
        //   this.$router.push(`/lotes/${this.reclamo._id}`);
        // } else {
        //   this.$router.push(`/loteslot/new`);
        // }

        this.$router.push(`/lotes/${this.lote._id}`);
      }
      this.fixTime();
    }

    this.focus();
    // this.loadLotes();
    // this.loadLigas();
    // this.loadVitolas();
    // this.filterLotes();
  },

  methods: {
    verSiEsMenorEdad(edad: number){
      if (edad >= 18) {
        alert('MAYOR DE EDAD')
      } else {
        alert('MENOR DE EDAD')
      }
    },
    
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    toPrint() {
      window.print();
    },
    showMessageMethod() {
      this.showMessage = !this.showMessage;
    },
    setService() {
      if (this.lote.tipServ == "Consulta") {
        this.lote.descServ = "Consulta";
      } else {
        this.lote.descServ = "";
      }
    },

    showModalAseguradorasMethod() {
      this.seguros2 = this.seguros;
      this.showModalAseguradoras = !this.showModalAseguradoras;
    },

    async redirect(id: string) {
      // alert("Redirecting");
      this.$router.push(`/lotes/${id}`);

      // Remounted
      this.modoForm = "show";
      this.encabezado = "Detalles de Lote";
      this.showDeleteMethod();
      await this.loadLote(id);
      this.defSubs();

      // this.lote.finVac = new Date();
      // this.lote.fechaNac = new Date();
      // this.lote.fechaCont = new Date();
      this.fixTime();
      this.focus();

      this.showModalMethod7();
    },

    async buscando() {
      this.toggleLoading();
      try {
        const res = await getLotes(this.criterio);
        this.lotes = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (this.lote.barcode !== "Todos") {
        this.lotes = this.lotes.filter((lote: Lote) => {
          return lote.nombPac
            .toLowerCase()
            .includes(this.lote.barcode.toLowerCase());
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
      this.lote.mesVenc = moment(date).format("MM");
      this.lote.anoVenc = moment(date).format("YYYY");
    },

    // defSubs() {
    //   this.preSubs = this.almacenes.filter((almacen: Lote) => {
    //     return almacen.desc
    //       .toLowerCase()
    //       .includes(this.lote.almacn.toLowerCase());
    //   });
    //   this.subs = this.preSubs[0].subs;
    // },

    async setSeguro(seguro: string) {
      this.lote.nombARS = seguro;
      this.showModalAseguradorasMethod();
      this.search = "";
      document.getElementById("fechAutor").focus();
      await this.loadReclamosLote(seguro);
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
        this.lote.consultas.splice(it, 1);
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
        this.lote.consultas.push({
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
      this.lote.edad = years;
    },

    async loadLotes() {
      this.toggleLoading();
      try {
        const res = await getLotes(this.criterio);
        this.seguros = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    fixTime() {
      if (this.lote.fechAutor) {
        this.lote.fechAutor = this.formatDateToFix(this.lote.fechAutor, false);
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
        this.lote.cedu = data.cedula;
        this.lote.nombPac = data.nombre;
        this.lote.fechAutor = this.formatDateToFix(data.updatedAt, false);
        this.lote.nombARS = data.seguro;
        this.lote.sex = data.sexo;
        this.lote.telMed = data.telefono;
        this.lote.dx = data.diagnosticoPresuntivo;
        this.lote.fechaNacimiento = this.formatDateToFix(
          data.fechaNacimiento,
          false
        );
        this.lote.edad = data.edad;
        this.lote.dir = data.direccion;
        document.getElementById("aut").focus();
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
      this.toggleSpinner();
    },

    async loadLote(id: string) {
      try {
        const { data } = await getLote(id);
        this.lote = data;
        this.reclamos0 = await getReclamosLote2(this.lote.no);
        this.reclamos = this.reclamos0.data;
        // this.fixTime();
      } catch (error) {
        //console.error(error);
      }
    },

    async handleUpdate() {
      this.toggleLoading();
      try {
        if (typeof this.$route.params.id === "string") {
          this.lote.userMod = this.$store.state.user.usuario;
          await updateLote(this.$route.params.id, this.lote);
          // this.addMessage();
          this.$router.push("/lotes");
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
            await deleteLote(this.$route.params.id);
            await restartLote(this.lote.no);
            // this.addMessage();
            this.$router.push("/lotes");
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
    calcLote() {
      (this.lote.retension = this.lote.bruto * 0.1),
        (this.lote.neto = this.lote.bruto * 0.9);
    },
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("DD/MM/YYYY");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },

    fillFields() {
      this.lote.instit = "Instituto Avanzado de Artroscopía y Artroplastía";
      this.lote.nombPres = "Dr. Carlos Morales Ángeles";
      // this.lote.tipServ = "Consulta";
      // this.lote.descServ = "Consulta";
      this.lote.tipo = "med";
      this.lote.lote = 0;
      // this.lote.montRec = 500;

      this.lote.fechAutor = new Date();
      // this.lote.fechaCont = new Date();
    },

    async loadOneLote() {
      try {
        const res = await getOneLote();
        this.oneLote = res.data;
        this.one = this.oneLote[0];
        if (typeof this.one.no === "number") {
          this.nextNo = this.one.no + 1;
        } else {
          this.one.no = 0;
          this.nextNo = this.one.no + 1;
        }
        if (this.nextNo == null) {
          this.nextNo = 0;
        }
        this.lote.no = this.nextNo;
        this.lote.principal = this.nextNo;
        this.lote.principal = this.nextNo;
      } catch (error) {
        // console.error(error);
      }
    },

    async saveLotea() {
      await this.loadOneLote();
      try {
        const res = await createLotea(this.lote);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    async saveLote() {
      this.toggleLoading();
      try {
        try {
          const res = await getOneLote();
          this.oneLote = res.data;
          this.one = this.oneLote[0];
          this.nextNo = this.one.no + 1;
          this.lote.no = this.nextNo;
        } catch (error) {
          // // console.error(error);
        }
        this.lote.userReg = this.$store.state.user.usuario;
        // this.lote.aut = this.lote.aut.toUpperCase().trim();
        this.lote.cantTotal = this.reclamos.cantTotal;
        this.lote.montoTotal = this.reclamos.montoTotal;
        try {
          const { data } = await postReclamosLote(
            this.lote.nombARS,
            this.lote.no
          );
          this.reclamos = data;
          // this.fixTime();
        } catch (error) {
          //console.error(error);
        }
        const res = await createLote(this.lote).then(
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
        // this.$router.push("/lotes/");
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

    async deleteAllLotes() {
      try {
        const res = await eliminateLotes(this.lote);
        // // console.log(res);
      } catch (error) {
        // // console.error(error);
      }
    },

    cleanFields() {
      this.lote.aflNSS = "";
      this.lote.cedu = "";
      this.lote.nombPac = "";
      this.lote.sex = "";
      this.lote.telMed = "";
      this.lote.fechaNacimiento = "";
      this.lote.edad = "";
      this.lote.dir = "";
      this.lote.dx = "";
      this.lote.nombARS = "";
      this.lote.tipServ = "";
      this.lote.montRec = "";
      this.lote.fechAutor = "";
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
      if (this.lote.tipo == "cent") {
        this.lote.nombPres = "Clínica Cruz Jiminián";
        return false;
      } else {
        return true;
      }
    },
  },
});
</script>

<style lang="css" scoped>
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

/* .unique {
  background-color: rgb(243, 242, 242);
} */
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

.firma {
  display: block;
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 250px;
  /* height: 25%; */
  margin-bottom: 10px;
}

.timbrado {
  display: block;
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 150px;
  /* height: 10%; */
  margin-bottom: 10px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  /* background-color: rgb(4, 0, 102); */
  margin-bottom: 7px;
  /* color: white; */
  text-align: center;
}

.encabezado {
  /* background-color: rgb(4, 0, 102); */
  margin-bottom: 7px;
}

h3,
h4,
h5,
h6 {
  text-align: center;
  color: rgb(4, 0, 102);
  margin: 0;
  font-size: 95%;
}

.titulocentro {
  font-size: 80%;
}
.field {
  font-size: 80%;
}

.field-grande {
  font-size: 95%;
}
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
  max-width: 750px;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
}
.grid-timbrado {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 0px;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
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

/* h5 {
  font-size: 90%;
  color: rgb(147, 147, 147);
  font-weight: bold;
  text-align: center;
} */

form {
  /* text-align:center;   */
  /* background-color: white; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 4px; */
  padding: 2%;
}

legend {
  color: rgb(4, 0, 102);
  text-align: center;
}

input,
select,
textarea {
  border-radius: 7px;
  margin-bottom: 3px;
  width: 100%;
  padding: 10px;
  font-size: 75%;
}

legend {
  margin: 0;
}

.form-label {
  /* background-color: rgb(220, 220, 220); */
  width: 100%;
  color: rgb(4, 0, 102);
  border-radius: 7px;
  font-size: 110%;
  margin-top: 20px;
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
  border-bottom-color: rgb(4, 0, 102);
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

p {
  font-size: 130%;
  margin: 0;
}

.bold {
  font-weight: bold;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}
</style>
