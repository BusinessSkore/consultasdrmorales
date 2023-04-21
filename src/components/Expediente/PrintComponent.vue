<template>
  <div class="flex-container">
    <div>
      <img style="width: 200px;" src="@/assets/images/logoSQR.png" />
      <p style="margin-top: 40px">
        <label style="font-weight: bold">HISTORIA CLINICA</label>
      </p>
      <!-- <p style="font-size: 80%;">
        ARTROSCOPÍA Y ARTROPLASTÍA
      </p> -->
    </div>
    <div>
      <img
        style="width: 190px; margin-left: 80px"
        src="@/assets/images/signature.jpeg"
      />
      <!-- <p style="font-size: 80%; text-align: right;">
        Dr. Carlos Morales Ángeles
      </p> -->
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
      <br />
      <p style="font-size: 80%;text-align: right;">
        <span class="bold">Expediente No.: </span>
        {{ formatSecuence(expediente.no) }}
      </p>
      <p style="font-size: 80%;text-align: right;">
        <span class="bold">Fecha / Hora: </span>
        {{ formatDate(expediente.fechaActual) }}
      </p>
    </div>
  </div>
  <br />

  <div>
    <div class="form-group">
      <!-- <div class="encabezado">
        <h3>Instituto Avanzado de Artroscopía y Artroplastía</h3>
        <h4>
          Dr. Carlos Morales Ángeles | Ortopedia, Traumatología y Artroscopía
        </h4>
        <h6>Tel.: (809) 770-9215 ♦ E-Mail: dr.moralesangeles@gmail.com</h6>
      </div> -->
      <!-- <label style="font-weight: bold">HISTORIA CLINICA</label> -->
      <!-- <label class="form-label"><b>Datos Generales</b></label> -->
      <label
        v-if="
          expediente.nombre ||
            expediente.fechaNacimiento ||
            expediente.edad ||
            expediente.sexo ||
            expediente.cedula ||
            expediente.telefono ||
            expediente.direccion ||
            expediente.seguro ||
            expediente.oficio ||
            expediente.deporte ||
            expediente.ladoDominante
        "
        class="form-label"
        ><b>Datos del Paciente</b></label
      >
      <div class="grid-2">
        <!-- Start Fields -->
        <p v-if="expediente.nombre" class="field">
          <span class="bold">Nombre y Apellido: </span>{{ expediente.nombre }}
        </p>
        <p v-if="expediente.fechaNacimiento" class="field">
          <span class="bold">Fecha de Nacimiento: </span
          >{{ formatDate2(expediente.fechaNacimiento) }}
        </p>
        <p v-if="expediente.edad" class="field">
          <span class="bold">Edad: </span>{{ expediente.edad }} Años
        </p>
        <p v-if="expediente.sexo" class="field">
          <span class="bold">Sexo: </span>{{ expediente.sexo }}
        </p>
        <p v-if="expediente.cedula" class="field">
          <span class="bold">Cédula: </span>{{ expediente.cedula }}
        </p>
        <p v-if="expediente.telefono" class="field">
          <span class="bold">Teléfono: </span>{{ expediente.telefono }}
        </p>
        <p v-if="expediente.direccion" class="field">
          <span class="bold">Dirección: </span>{{ expediente.direccion }}
        </p>
        <p v-if="expediente.seguro" class="field">
          <span class="bold">Seguro: </span>{{ expediente.seguro }}
        </p>
        <p v-if="expediente.oficio" class="field">
          <span class="bold">Oficio: </span>{{ expediente.oficio }}
        </p>
        <p v-if="expediente.deporte" class="field">
          <span class="bold">Deporte: </span>{{ expediente.deporte }}
        </p>
        <p v-if="expediente.ladoDominante" class="field">
          <span class="bold">Lado Dominante: </span
          >{{ expediente.ladoDominante }}
        </p>
      </div>
      <div
        v-if="
          expediente.app ||
            expediente.habitosToxicos ||
            expediente.antQuirurgicos ||
            expediente.alergias
        "
      >
        <br />
        <label class="form-label"><b>APP y Hábitos Tóxicos</b></label>
        <div class="grid-2">
          <p v-if="expediente.app" class="field">
            <span class="bold">APP: </span>{{ expediente.app }}
          </p>
          <p v-if="expediente.habitosToxicos" class="field">
            <span class="bold">Hábitos Tóxicos: </span
            >{{ expediente.habitosToxicos }}
          </p>
          <p v-if="expediente.antQuirurgicos" class="field">
            <span class="bold">Antecedentes Quirúrgicos: </span
            >{{ expediente.antQuirurgicos }}
          </p>
          <p v-if="expediente.alergias" class="field">
            <span class="bold">Alergias : </span>{{ expediente.alergias }}
          </p>
        </div>
      </div>
      <div
        v-if="
          expediente.mecanismoLesion ||
            expediente.tiempoEvolucion ||
            expediente.elevacionAnteriorActiva ||
            expediente.elevacionAnteriosPasiva ||
            expediente.rotacionInterna ||
            expediente.rotacionExterna ||
            expediente.abd ||
            expediente.jobe ||
            expediente.speed ||
            expediente.obrien ||
            expediente.naponeon ||
            expediente.acromioClavicular ||
            expediente.inestabilidadAnterior ||
            expediente.inestabilidadPosterior ||
            expediente.cajonAnterior ||
            expediente.cajonPosterior ||
            expediente.lachman ||
            expediente.appley ||
            expediente.bostezoLateral ||
            expediente.bostezoMedial ||
            expediente.otraLesion
        "
      >
        <br />
        <label class="form-label"><b>Exámen Físico</b></label>
        <div class="grid-2">
          <p v-if="expediente.mecanismoLesion" class="field">
            <span class="bold">Mecanismo de la Lesión: </span
            >{{ expediente.mecanismoLesion }}
          </p>
          <p v-if="expediente.tiempoEvolucion" class="field">
            <span class="bold">Tiempo de Evolución: </span
            >{{ expediente.tiempoEvolucion }}
          </p>
          <p v-if="expediente.elevacionAnteriorActiva" class="field">
            <span class="bold">Elevación Anterior (Activa): </span
            >{{ expediente.elevacionAnteriorActiva }}
          </p>
          <p v-if="expediente.elevacionAnteriosPasiva" class="field">
            <span class="bold">Elevación Anterior (Pasiva): </span
            >{{ expediente.elevacionAnteriosPasiva }}
          </p>
          <p v-if="expediente.rotacionInterna" class="field">
            <span class="bold">Rotación Interna: </span
            >{{ expediente.rotacionInterna }}
          </p>
          <p v-if="expediente.rotacionExterna" class="field">
            <span class="bold">Rotación Externa: </span
            >{{ expediente.rotacionExterna }}
          </p>
          <p v-if="expediente.abd" class="field">
            <span class="bold">ABD: </span>{{ expediente.abd }}
          </p>
          <p v-if="expediente.jobe" class="field">
            <span class="bold">JOBE: </span>{{ expediente.jobe }}
          </p>
          <p v-if="expediente.speed" class="field">
            <span class="bold">SPEED: </span>{{ expediente.speed }}
          </p>
          <p v-if="expediente.obrien" class="field">
            <span class="bold">OBRIEN: </span>{{ expediente.obrien }}
          </p>
          <p v-if="expediente.naponeon" class="field">
            <span class="bold">NAPONEON: </span>{{ expediente.naponeon }}
          </p>
          <p v-if="expediente.acromioClavicular" class="field">
            <span class="bold">Acromio Clavicular: </span
            >{{ expediente.acromioClavicular }}
          </p>
          <p v-if="expediente.inestabilidadAnterior" class="field">
            <span class="bold">Inestabilidad Anterior: </span
            >{{ expediente.inestabilidadAnterior }}
          </p>
          <p v-if="expediente.inestabilidadPosterior" class="field">
            <span class="bold">Inestabilidad Posterior: </span
            >{{ expediente.inestabilidadPosterior }}
          </p>
          <p v-if="expediente.cajonAnterior" class="field">
            <span class="bold">Cajón Anterior: </span
            >{{ expediente.cajonAnterior }}
          </p>
          <p v-if="expediente.cajonPosterior" class="field">
            <span class="bold">Cajón Posterior: </span
            >{{ expediente.cajonPosterior }}
          </p>
          <p v-if="expediente.lachman" class="field">
            <span class="bold">LACHMAN: </span>{{ expediente.lachman }}
          </p>
          <p v-if="expediente.appley" class="field">
            <span class="bold">APPLEY: </span>{{ expediente.appley }}
          </p>
          <p v-if="expediente.bostezoLateral" class="field">
            <span class="bold">Bostezo Lateral: </span
            >{{ expediente.bostezoLateral }}
          </p>
          <p v-if="expediente.bostezoMedial" class="field">
            <span class="bold">Bostezo Medial: </span
            >{{ expediente.bostezoMedial }}
          </p>
          <p v-if="expediente.otraLesion" class="field">
            <span class="bold">Otra Lesión: </span>{{ expediente.otraLesion }}
          </p>
        </div>
      </div>
      <div v-if="expediente.estudiosSolicitados">
        <br />
        <label class="form-label"><b>Estudios Solicitados</b></label>
        <div class="grid-2">
          <p v-if="expediente.estudiosSolicitados" class="field">
            <span class="bold">Estudios Solicitados: </span
            >{{ expediente.estudiosSolicitados }}
          </p>
        </div>
      </div>
      <div
        v-if="expediente.diagnosticoPresuntivo || expediente.diagnosticoImagen"
      >
        <br />
        <label class="form-label"><b>Diagnósticos</b></label>
        <div class="grid-2">
          <p v-if="expediente.diagnosticoPresuntivo" class="field">
            <span class="bold">Diagnóstico Presuntivo: </span
            >{{ expediente.diagnosticoPresuntivo }}
          </p>
          <p v-if="expediente.diagnosticoImagen" class="field">
            <span class="bold">Diagnóstico Por Imagen: </span
            >{{ expediente.diagnosticoImagen }}
          </p>
        </div>
      </div>
      <div
        v-if="
          expediente.medicamentos ||
            expediente.terapiaFisica ||
            expediente.cirugia
        "
      >
        <br />
        <label class="form-label"><b>Tratamiento Efectuado</b></label>
        <div class="grid-2">
          <p v-if="expediente.medicamentos" class="field">
            <span class="bold">Medicamentos: </span
            >{{ expediente.medicamentos }}
          </p>
          <p v-if="expediente.terapiaFisica" class="field">
            <span class="bold">Terapia Física: </span
            >{{ expediente.terapiaFisica }}
          </p>
          <p v-if="expediente.cirugia" class="field">
            <span class="bold">Cirugía: </span>{{ expediente.cirugia }}
          </p>
        </div>
        <p v-if="expediente.referidoPor" class="field">
          <span class="bold">Referido Por: </span>{{ expediente.referidoPor }}
        </p>
      </div>
      <!-- <label class="form-label"><b>Consultas</b></label>
      <div class="grid">
        <p
          class="field"
          v-for="(consulta, index) in expediente.consultas"
          :key="index"
        >
          No. {{ index + 1 }} - {{ formatDate(consulta.date) }}<br />
          {{ consulta.description }}
        </p>
      </div> -->
      <br />
      <br />
    </div>
  </div>
  <div>
    <!-- <img
      style="width: 300px; position: fixed; top: 250px;  right: 0px"
      src="@/assets/images/logoSQRGray.png"
    /> -->
    <p
      style="position: fixed; bottom: 60px; right: 0; text-align: right; font-size: 80%; font-weight: bold"
    >
      _______________________________
    </p>
    <p
      style="position: fixed; bottom: 35px; right: 12px; text-align: right; margin-top: 10px; font-size: 80%; margin-right: 65px;"
    >
      Firma
    </p>
  </div>
  <!-- <hr /> -->
  <div>
    <p
      style="position: fixed; bottom: 17px; text-align: center; font-size: 80%; font-weight: bold; "
    >
      ____________________________________________________________________________________________________________________________________________
    </p>
    <p
      style="position: fixed; bottom: 0; font-size: 80%; margin-top: 0px; text-align: center"
    >
      e-mail dr.moralesangeles@gmail.com / consultasdrmorales@gmail.com, C/ Luis
      F. Thomen, casi Av. Nuñez de Cáceres, Suite 402
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Expediente } from "@/interfaces/Expediente";
import {
  deleteExpediente,
  getExpediente,
  updateExpediente,
} from "@/services/expedientesclinicos/Expediente";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "expediente-list",
  data() {
    return {
      cargando: false,
      expediente: {} as Expediente,
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
      return moment(out).format("D/MM/yyyy HH:mm");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy");
    },

    async loadExpediente(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getExpediente(id);
        this.expediente = data;
      } catch (error) {
        //console.error(error);
      }
      await this.toggleLoading();
      this.toPrint();

      if (this.$store.state.ids.length == 0) {
        this.$router.push(`/expedientes/${this.expediente._id}`);
      } else {
        this.$router.push(`/expedienteslot/new`);
      }

      // this.$router.push(`/expedientes/${this.expediente._id}`);
    },
    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateExpediente(this.$route.params.id, this.expediente);
          this.$router.push("/expedientes");
        }
      } catch (error) {
        //console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteExpediente(this.$route.params.id);
          this.$router.push("/expedientes");
        }
      } catch (error) {
        //console.error(error);
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadExpediente(this.$route.params.id);
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
  justify-content: space-between;
}

.encabezado {
  background-color: rgb(47, 164, 231);
  margin-bottom: 7px;
}

h3,
h4,
h5,
h6 {
  text-align: center;
  color: white;
  margin: 0;
  font-size: 95%;
}
.field {
  font-size: 80%;
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

.localIMG {
  /* display: block; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 165px;
  /* margin-bottom: 10px; */
}

img {
  /* display: block; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  width: 25px;
  /* margin-bottom: 10px; */
}

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
  /* background-color: rgb(220, 220, 220); */
  width: 100%;
  color: black;
  text-align: left;
  /* color: rgb(47, 164, 231); */
  border-radius: 7px;
  font-size: 80%;
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

p {
  font-size: 130%;
  margin: 0;
}

.bold {
  font-weight: bold;
}
</style>
