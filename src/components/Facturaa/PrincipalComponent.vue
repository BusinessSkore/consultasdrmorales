<template v-show="!cargando">
  <!-- <p>Original: {{this.facturaasFiltradas}}</p><br/><br/> -->
  <!-- <p>Filtrado: {{this.facturaas}}</p><br/><br/> -->

  <!-- {{ this.criterio }} -->
  <div class="backgrnd">
    <!-- Spinner -->
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition>
    <Navbar />
    <!------------------------------------------------ General ------------------------------------------------->

    <div v-show="!cargando" class="general">
      <!-- The flexible grid (content) -->
      <div class="row">
        <div class="side">
          <!-- <div class="card bg-secondary cardOpciones"> -->
          <!-- <div class="card-body"> -->
          <div>
            <h4 class="subTitle">
              Facturas
            </h4>
            <div class="line"></div>

            <nav :class="navMenuClas2">
              <a
                class="navbar-option"
                href="#"
                @click="this.$router.push('/facturaas/new')"
                ><i class="fas fa-file"></i> Registrar Factura</a
              >
              <!-- <a
                class="navbar-option"
                href="#"
                @click="this.$router.push('/facturaas/new')"
                ><i class="fas fa-print"></i> Imprimir Factura</a
              > -->
              <!-- <a
                class="navbar-option"
                href="#"
                @click="this.$router.push('/facturaasciru/new')"
                ><i class="fas fa-file"></i> Registrar Cirugía</a
              > -->
            </nav>
          </div>
          <!-- </div> -->
          <!-- </div> -->
        </div>
        <div class="main">
          <!-- Modal -->

          <div v-if="showModal" class="modal">
            <div class="contenedor">
              <header>Filtros</header>
              <div class="contenido">
                <label @click="this.showModalMethod()" for="btn-modal">X</label>
                <div class="contenido">
                  <Filters
                    :filterFacturaas="filterFacturaas"
                    :search="search"
                    :filteredFacturaas="filteredFacturaas"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Cuerpo -->
          <div class="card">
            <div class="card-body">
              <div>
                <!-- <div class="line"></div> -->
                <div class="grid">
                  <div class="facturaas">
                    <div>
                      <h4>
                        Facturas
                      </h4>
                    </div>
                    <div class="grid-fields">
                      <!-- <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="desde"
                          >Desde:</label
                        ><input
                          id="desde"
                          type="date"
                          @change="loadFacturaas()"
                          v-model="criterio.desde"
                          class="form-control"
                        />
                      </div>
                      <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="desde"
                          >Hasta:</label
                        ><input
                          id="desde"
                          type="date"
                          @change="loadFacturaas()"
                          v-model="criterio.hasta"
                          class="form-control"
                        />
                      </div> -->
                      <!-- <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="especialidad"
                          >Nombre de Paciente:</label
                        ><input
                          id="especialidad"
                          type="especialidad"
                          @change="filtrarEsp()"
                          v-model="criterio.paciente"
                          class="form-control"
                        />
                      </div> -->
                      <!-- <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="especialista"
                          >Nombre Aseguradoras:</label
                        ><select
                          id="especialista"
                          type="especialidad"
                          @change="loadServsByEsp()"
                          v-model="criterio.especialista"
                          class="form-select"
                        >
                          <option
                            v-for="(especialista, index) in especialistas"
                            :key="index"
                            >{{ especialista.nombre }}</option
                          >
                        </select>
                      </div> -->
                      <!-- <div>
                        <label
                          class="ta-l col-form-label col-form-label-sm"
                          for="hasta"
                          >Hasta:</label
                        ><input
                          id="hasta"
                          type="date"
                          v-model="criterio.hasta"
                          class="form-control"
                        />
                      </div> -->
                      <!-- <button
                        class="btn btn-success"
                        @click.prevent="loadFacturaas()"
                        :disabled="
                          !criterio.desde ||
                            !criterio.hasta
                        "
                      >
                        <i class="fas fa-search"></i> Buscar
                      </button> -->
                    </div>
                    <div class="mycard-body">
                      <ListadoComponent
                        :facturaas="facturaas"
                        v-show="!cargando"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------------------------------------------->
</template>

<script lang="ts">
import Filters from "@/components/Facturaa/FiltersComponent.vue";
import ListadoComponent from "@/components/Facturaa/ListComponent.vue";
import Navbar from "@/components/Navbar.vue";
import moment from "moment";
import { Facturaa } from "@/interfaces/Facturaa";
// import { Especialista } from "@/interfaces/Especialista";
import {
  getFacturaas,
  getServsByEsp,
} from "@/services/expedientesclinicos/Facturaa";
import { create, destroy, get } from "@/services/facturas/Factura";
// import { getEspecialistas } from "@/services/expedientesclinicos/Especialista";
import Pusher from "pusher-js";

export default {
  name: "App",

  components: {
    Filters,
    ListadoComponent,
    Navbar,
  },

  data() {
    return {
      criterio: {} as any,
      navMenuClas2: ["menu-navegacion2"],
      song: {
        title: "Notification",
        src: require("@/assets/sounds/notification.mp3"),
      },
      player: new Audio(),
      showModal: false,
      cargando: false,
      facturaas: [] as Facturaa[],
      facturaasFiltradas: [] as Facturaa[],
      // especialistas: [] as Especialista[],
      str: "",
      type: "",
    };
  },

  methods: {
    // async loadEspecialistas() {
    //   this.toggleLoading();
    //   try {
    //     const res = await getEspecialistas();
    //     this.especialistas = res.data;
    //   } catch (error) {
    //     // console.error(error);
    //   }
    //   this.toggleLoading();
    // },

    async loadServsByEsp() {
      this.toggleLoading();
      try {
        const res = await getServsByEsp(this.criterio);
        this.facturaas = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    filtrarEsp() {
      this.facturaas = this.facturaasFiltradas.filter((facturaa: Facturaa) => {
        return facturaa.nombPac
          .toLowerCase()
          .includes(this.criterio.paciente.toLowerCase());
      });
    },

    fixTime() {
      if (this.criterio.desde) {
        this.criterio.desde = this.formatDateToFix(this.criterio.desde, false);
      }
      if (this.criterio.hasta) {
        this.criterio.hasta = this.formatDateToFix(this.criterio.hasta, false);
      }
    },

    formatDateToFix(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("yyyy-MM-DD");
    },

    hamburger(texto: string) {
      switch (texto) {
        case "Aseguradoras":
          this.$router.push("/aseguradoras");
          break;
        case "Especialistas":
          this.$router.push("/especialistas");
          break;
        case "Facturaas":
          this.$router.push("/facturaas");
          break;
        case "Productos":
          this.$router.push("/productos");
          break;
        case "Dashboard":
          this.$router.push("/dashboard");
          break;
        case "Usuarios":
          this.$router.push("/usuarios");
          break;
        case "Mejoras":
          this.$router.push("/mejoras");
          break;
        case "Cerrar Sesión":
          this.salir();
          break;
      }
      if (this.navMenuClas.length == 1) {
        this.navMenuClas.push("spread");
        this.desplegar = "fas fa-caret-up";
      } else {
        this.navMenuClas.pop();
        this.desplegar = "fas fa-caret-down";
      }
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("d7b50b87118775ed0b11", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadFacturaas2();
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },

    showModalMethod() {
      this.showModal = !this.showModal;
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },
    async filterFacturaas(catName: string) {
      try {
        const res = await getFacturaas(this.criterio);
        this.facturaas = res.data;
        this.facturaasFiltradas = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (catName !== "Todos") {
        this.facturaas = this.facturaas.filter((facturaa: Facturaa) => {
          return facturaa.aflNSS === catName;
        });
      }
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getFacturaas(this.criterio);
        this.facturaas = res.data;
        this.facturaasFiltradas = res.data;
      } catch (error) {
        // console.error(error);
      }
      if (term !== "Todos") {
        this.facturaas = this.facturaas.filter((facturaa: Facturaa) => {
          return facturaa.aflNSS.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
    },

    async loadFacturaas() {
      this.toggleLoading();
      try {
        const res = await get();
        this.facturaas = res.data;
        this.facturaasFiltradas = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadFacturaas2() {
      this.toggleLoading();
      try {
        const res = await getFacturaas(this.criterio);
        this.facturaas = res.data;
        this.facturaasFiltradas = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },
  },

  mounted() {
    this.criterio.desde = new Date();
    this.criterio.hasta = new Date();
    this.fixTime();
    this.loadFacturaas();
    // this.loadEspecialistas();
    // this.pusherSubscribe();
  },
};
</script>

<style lang="css" scoped>
.btn {
  width: 100%;
  height: 45%;
  font-size: 75%;
}
.mycard-body {
  overflow-x: scroll;
  margin-top: 10px;
}

.grid-fields {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}

.line {
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;
  height: 2px;
  background: rgb(147, 147, 147);
  /* background: rgb(226, 165, 38); */
  /* margin-bottom: 60px; */
}

.cardOpciones {
  position: fixed;
  /* width: 15%; */
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.side {
  flex: 15%;
  /* background-color: #f1f1f1; */
  /* padding: 20px; */
}

/* Main column */
.main {
  flex: 85%;
  /* background-color: white; */
  /* padding: 20px; */
}

@media screen and (max-width: 700px) {
  .row {
    flex-direction: column;
  }

  .cardOpciones {
    position: fixed;
    /* z-index: 100; */
    /* top: 0; */
  }
}

* {
  box-sizing: border-box;
}

.equis {
  position: absolute;
  top: 7px;
  right: 10px;
  color: rgb(0, 0, 0);
  font-size: 12px;
  cursor: pointer;
}

/* Responsiveness */
/* @media screen and (max-width: 800px) {
  .menu-navegacion2 {
    width: 50vw;
  }
} */

/* @media screen and (max-width: 500px) {
  .menu-navegacion2 {
    width: 65vw;
  }
} */

.navbar-option:hover {
  color: rgb(47, 164, 231);
}

.navbar-option {
  color: #545b64;
  text-decoration: none;
  margin: 7px;
  font-size: 13px;
}

/* Menú Lateral Fijo*/

.menu-navegacion2 {
  /* position: fixed; */
  /* top: 34px; */
  /* left: 0; */
  /* width: 15vw; */
  /* height: 100%; */
  /* background-image: linear-gradient(
    180deg,
    rgb(255, 255, 255) 0%,
    rgb(255, 255, 255) 100%
  ); */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  /* transition: transform 0.3s ease-in-out; */
  /* transform: translate(0%); */
  /* box-shadow: 0 0 6px rgba(35, 47, 62, 0.5); */
  z-index: 100;
  /* padding-left: 10px; */
  padding-top: 0px;
  /* overflow-y: scroll; */
}

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

.general {
  width: 100%;
  flex: 70%;
  max-width: 1500px;
  margin: 0px auto;
  padding-top: 45px;
  background-color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto auto;
  gap: 1em;
  grid-template-areas:
    "filters filters filters filters filters filters filters"
    "facturaas facturaas facturaas facturaas facturaas facturaas facturaas";
}

.grid .filters {
  grid-area: filters;
  background-color: rgb(250, 250, 250);
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  border-radius: 7px;
}

.grid .facturaas {
  grid-area: facturaas;
  /* background-color: rgb(255, 255, 255); */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
  /* border-radius: 7px; */
  padding-top: 0px;
}

h4 {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  /* font-size: 75%; */
  /* text-align: center; */
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
}

.subTitle {
  /* background-color: rgb(100, 100, 100); */
  /* border-radius: 7px; */
  color: rgb(65, 65, 65);
  font-size: 75%;
  text-align: center;
  /* box-shadow: 2px 2px 10px rgb(199, 199, 199); */
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

.yellow {
  background-color: orange;
}

/* <!----------------------------------------------------------------------------------------------------------> */

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
  width: 400px;
  height: 300;
  margin: auto;
  background: #fff;
  box-shadow: 1px 7px 25px rgba(5, 24, 250, 0.6);
  transition: all 500ms ease;
  position: relative;
}

.contenedor header {
  padding: 10px;
  background: rgb(147, 147, 147);
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

.backgrnd {
  background-color: rgb(242, 243, 243);
}
</style>
