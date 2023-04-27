<template>
  <div class="flex-container">
    <div>
      <img style="width: 150px;" src="@/assets/images/logo.png" />
      <!-- <p style="font-size: 80%; width: 70%">
        INSTITUTO AVANZADO DE ARTROSCOPÍA Y ARTROPLASTÍA
      </p> -->
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
    </div>
  </div>
  <br />

  <div class="flex-container">
    <div style="width: 60%">
      <label style="font-weight: bold">RECETA</label>
      <div>
        <ol
          style="margin-bottom: 0px"
          v-for="(rx, index) in receta.rxs"
          :key="index"
        >
          <!-- <li> -->
          <!-- <p style="font-size: 80%">{{ rx.titu }}</p> -->
          <textarea id="licencia" rows="12" type="licencia" v-model="rx.titu" />
          <!-- </li> -->
          <!-- <p style="font-size: 95%">{{ rx.desc }}</p> -->

          <!-- <p style="font-size: 80%">
            {{ rx.desc }}
          </p> -->
        </ol>
      </div>
    </div>
    <div class="flex-container">
      <div style="margin-right: 7.5px; left: 450px; position: absolute">
        <p style="font-size: 80%; text-align: left; font-weight : bold">
          Nombre:
        </p>
        <p style="font-size: 80%; text-align: left; font-weight : bold">
          Cédula:
        </p>
        <p style="font-size: 80%; text-align: left; font-weight : bold">
          Edad:
        </p>
        <p style="font-size: 80%; text-align: left; font-weight : bold">
          Fecha:
        </p>
      </div>
      <div>
        <p style="font-size: 80%; text-align: right;">
          {{ receta.seguro }}
        </p>
        <p style="font-size: 80%; text-align: right;">
          {{ receta.cedula }}
        </p>
        <p style="font-size: 80%; text-align: right;">{{ receta.edad }} años</p>
        <p style="font-size: 80%; text-align: right;">
          {{ formatDate2(receta.fechaActual) }}
        </p>
      </div>
    </div>
  </div>
  <div style="position: fixed; top: 400px;  right: 0px">
    <img
      style="width: 300px; position: fixed; top: 250px;  right: 0px"
      src="@/assets/images/logoSQRGray.png"
    />
    <p style="text-align: right; font-size: 80%; font-weight: bold">
      _______________________________
    </p>
    <p
      style="text-align: right; margin-top: 10px; font-size: 80%; margin-right: 65px;"
    >
      Firma
    </p>
  </div>
  <!-- <hr /> -->
  <div style="position: fixed; top: 45%">
    <p style="text-align: center; font-size: 80%; font-weight: bold; ">
      ____________________________________________________________________________________________________________________________________________
    </p>
    <p style="font-size: 80%; margin-top: 0px; text-align: center">
      e-mail dr.moralesangeles@gmail.com / consultasdrmorales@gmail.com, C/ Luis
      F. Thomen, casi Av. Nuñez de Cáceres, Suite 402
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Receta } from "@/interfaces/Receta";
import {
  deleteReceta,
  getReceta,
  updateReceta,
} from "@/services/expedientesclinicos/Receta";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "receta-list",
  data() {
    return {
      rxs: [
        { titu: "Analgésico", desc: "1 diario x 8 días" },
        { titu: "Antinflamatorio", desc: "2 al día cada 8 hrs x 12 días" },
      ],
      cargando: false,
      receta: {} as Receta,
    };
  },
  methods: {
    auto_grow(element: { style: { height: string }; scrollHeight: string }) {
      element.style.height = "5px";
      element.style.height = element.scrollHeight + "px";
    },
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

    async loadReceta(id: string) {
      this.toggleLoading();
      try {
        const { data } = await getReceta(id);
        this.receta = data;
      } catch (error) {
        //console.error(error);
      }
      await this.toggleLoading();
      // this.toPrint();

      // if (this.$store.state.ids.length == 0) {
      //   this.$router.push(`/recetas/${this.receta._id}`);
      // } else {
      //   this.$router.push(`/recetaslot/new`);
      // }

      // this.$router.push(`/recetas/${this.receta._id}`);
    },

    async handleUpdate() {
      try {
        if (typeof this.$route.params.id === "string") {
          await updateReceta(this.$route.params.id, this.receta);
          this.$router.push("/recetas");
        }
      } catch (error) {
        //console.error(error);
      }
    },
    async handleDelete() {
      try {
        if (typeof this.$route.params.id === "string") {
          deleteReceta(this.$route.params.id);
          this.$router.push("/recetas");
        }
      } catch (error) {
        //console.error(error);
      }
    },
  },
  mounted() {
    if (typeof this.$route.params.id === "string") {
      this.loadReceta(this.$route.params.id);
    }
  },

  // beforeUnmount() {
  //   this.toPrint();
  // }
});
</script>

<style lang="css" scoped>
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
/* textarea {
  border-radius: 7px;
  margin-bottom: 3px;
  width: 100%;
  padding: 10px;
  font-size: 75%;
} */

textarea {
  /* border-radius: 7px; */
  /* margin-bottom: 3px; */
  width: 100%;
  /* padding: 10px; */
  font-size: 75%;
  border: none;
  overflow: hidden;
  outline: none;
  resize: none;
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
