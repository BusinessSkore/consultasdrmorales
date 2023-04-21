<template>
  <div class="general">
    <div class="flex-container">
      <img class="timbrado" src="@/assets/images/logoSQR.png" />
      <div class="encabezado">
        <h3 class="titulocentro">
          Clínica Cruz Jiminián
        </h3>
        <h5 class="titulocentro">
          Av. Ortega y Gasset, No. 90, Santo Domingo, Rep. Dom.
        </h5>
        <h5 class="titulocentro">
          809-566-2271
        </h5>
        <h5 class="titulocentro">
          RNC: 101149868
        </h5>
      </div>
      <div class="encabezado" style="margin-top: 18px">
        <h4 class="titulocentro">Fecha: {{ formatDate(this.fechaActual) }}</h4>
        <h4 class="titulocentro">Hora: {{ formatTime(this.fechaActual) }}</h4>
        <h4 class="titulocentro">Factura No.: {{ this.reclamo.facNo }}</h4>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label"><b>Reclamación por Servicios</b></label>

      <label class="form-label2"><b>Datos del Prestador</b></label>
      <div class="grid">
        <!-- <p class="field">
          <span class="bold">Factura No.: </span>{{ reclamo.facNo }}
        </p> -->
        <p class="field">
          <span class="bold">Nombre: </span>{{ reclamo.nombPres }}
        </p>
        <p class="field">
          <span class="bold">Código: </span>{{ reclamo.codPres }}
        </p>
        <p class="field"><span class="bold">Médico: </span>{{ reclamo.med }}</p>
        <p class="field"><span class="bold">NAF: </span>{{ reclamo.naf }}</p>
      </div>
      <label class="form-label2"><b>Datos de la Reclamación</b></label>
      <div class="grid">
        <p class="field">
          <span class="bold">Autorización: </span>{{ reclamo.aut }}
        </p>
        <p class="field">
          <span class="bold">Fecha: </span>{{ formatDate(reclamo.fechAutor) }}
        </p>
        <p class="field">
          <span class="bold">Nombre de la ARS: </span>{{ reclamo.nombARS }}
        </p>
        <p class="field">
          <span class="bold">Autorizado Por: </span>{{ reclamo.autPor }}
        </p>
        <p class="field">
          <span class="bold">Monto Reclamado: </span
          >{{ formatNumber(reclamo.montRec) }}
        </p>
      </div>
      <label class="form-label2"><b>Datos del Caso</b></label>
      <div class="grid">
        <p class="field">
          <span class="bold">Nombre del Paciente: </span>{{ reclamo.nombPac }}
        </p>
        <p class="field">
          <span class="bold">Cédula: </span>{{ reclamo.cedu }}
        </p>
        <p class="field">
          <span class="bold">Afiliado o NSS: </span>{{ reclamo.aflNSS }}
        </p>
        <p class="field"><span class="bold">Sexo: </span>{{ reclamo.sex }}</p>
        <p class="field"><span class="bold">Edad: </span>{{ reclamo.edad }}</p>
        <p class="field">
          <span class="bold">Ingreso: </span>{{ formatDate(reclamo.ing) }}
        </p>
        <p class="field">
          <span class="bold">Egreso: </span>{{ formatDate(reclamo.egr) }}
        </p>
        <p class="field">
          <span class="bold">Dirección: </span>{{ reclamo.dir }}
        </p>
        <p class="field">
          <span class="bold">Diagnóstico: </span>{{ reclamo.dx }}
        </p>
        <!-- <p class="field">
          <span class="bold">Tipo de Servicio: </span>{{ reclamo.tipServ }}
        </p> -->
        <!-- <p class="field">
          <span class="bold">Descripción de Servicio: </span
          >{{ reclamo.descServ }}
        </p> -->
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="flex-container2">
        <div>
          <p class="field bold">________________________________</p>
          <p class="field bold">Firma y Sello del PSS</p>
        </div>
        <div>
          <p class="field bold">________________________________</p>
          <p class="field bold">Firma del Familiar o Paciente</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Reclamo } from "@/interfaces/Reclamo";
import {
  deleteReclamo,
  getReclamo,
  updateReclamo,
} from "@/services/expedientesclinicos/Reclamo";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "reclamo-list",
  data() {
    return {
      fechaActual: new Date(),
      cargando: false,
      reclamo: {} as Reclamo,
    };
  },
  methods: {
    toPrint() {
      window.print();
    },
    toggleLoading() {
      this.cargando = !this.cargando;
    },
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    formatNumber2(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy");
    },

    formatTime(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("hh:mm a");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy");
    },

    async loadReclamo(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getReclamo(id);
        this.reclamo = data;
      } catch (error) {
        //console.error(error);
      }
      await this.toggleLoading();
      this.toPrint();

      if (this.$store.state.ids.length == 0) {
        this.$router.push(`/reclamos/${this.reclamo._id}`);
      } else {
        this.$router.push(`/reclamoslot/new`);
      }

      this.$router.push(`/reclamos/${this.reclamo._id}`);
    },
    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateReclamo(this.$route.params.id, this.reclamo);
          this.$router.push("/reclamos");
        }
      } catch (error) {
        //console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteReclamo(this.$route.params.id);
          this.$router.push("/reclamos");
        }
      } catch (error) {
        //console.error(error);
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadReclamo(this.$route.params.id);
    }
  },

  // beforeUnmount() {
  //   this.toPrint();
  // }
});
</script>

<style lang="css" scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-container2 {
  justify-content: space-between;
  display: flex;
}

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
  margin-left: 10px;
  margin-right: 10px;
  /* margin-right: auto; */
  width: 80px;
  height: 80px;
  /* height: 10%; */
  margin-bottom: 10px;
  margin-top: 10px;
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
  /* margin-bottom: 7px; */
  padding: 10px;
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
  /* font-size: 150%; */
  text-align: left;
}
.field {
  font-size: 80%;
  margin-left: 10px;
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
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
}
/* .grid-timbrado {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 0px;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
} */

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
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
  /* background-color: #cfd0d1; */
  /* text-align: left; */
  color: rgb(4, 0, 102);
  /* border-radius: 7px; */
  font-size: 110%;
  margin-top: 20px;
  /* padding-left: 10px; */
}

.form-label2 {
  /* background-color: rgb(220, 220, 220); */
  width: 100%;
  background-color: #cfd0d1;
  text-align: left;
  /* color: rgb(4, 0, 102); */
  /* border-radius: 7px; */
  /* font-size: 110%; */
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
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
  /* left: 50%; */
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
</style>
