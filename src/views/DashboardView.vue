<template v-show="!cargando">
  <!-- {{ this.expedientes }} -->
  <!-- <button @click="showModalMethod()">
    Mostrar Modal
  </button> -->
  <div>
    <!-- {{ this.gpedByVitola }} -->
    <Navbar />
    <Transition>
      <div v-if="cargando" class="spin">
        <img class="img" src="@/assets/images/logo.png" />
      </div>
    </Transition>
    <div v-show="!cargando" class="general">
      <form>
        <!---------------------------------------- Start Dashboard por Usuario ---------------------------------------->
        <fieldset>
          <!-- <h4>
          <i class="fas fa-file-spreadsheet" _mstvisible="2"></i> Dashboard
        </h4> -->
          <div class="form-group">
            <div class="grid">
              <!------------------------------------------ Campo ------------------------------------------>
              <div
                v-show="!cargando"
                v-if="this.$store.state.user.type == 'Power User'"
                class="card bg-secondary"
                style="max-width: 20rem;"
              >
                <div class="card-header">
                  <p>Cantidad de Usuarios por Rol</p>
                </div>
                <div class="card-body">
                  <p
                    v-for="(item, index) in usuariosCant"
                    :key="index"
                    class="card-text"
                  >
                    {{ item._id.role }} : {{ item.count }}
                  </p>
                </div>
              </div>
              <!------------------------------------------ ***** ------------------------------------------>
              <!------------------------------------------ Campo ------------------------------------------>
              <div
                v-show="!cargando"
                v-if="this.$store.state.user.type == 'Power User'"
                class="card bg-secondary"
                style="max-width: 20rem;"
              >
                <div class="card-header">
                  <p>Cantidad de Mejoras por Estatus</p>
                </div>
                <div class="card-body">
                  <p
                    v-for="(tipoMejora, index) in mejorasPend"
                    :key="index"
                    class="card-text"
                  >
                    {{ tipoMejora._id.estatus }} : {{ tipoMejora.count }}
                  </p>
                </div>
              </div>

              <!------------------------------------------ ***** ------------------------------------------>
              <!------------------------------------------ Campo ------------------------------------------>

              <!-- <div class="card-body">
                <p style="font-weight: bold">Ruedas por Vitola</p>
                <table id="customers">
                  <tr>
                    <th>Vitola</th>
                    <th>Cant.</th>
                    <th>Cigarros</th>
                  </tr>
                  <tr v-for="(item, index) in gpedByVitola" :key="index">
                    <td>
                      {{ item._id.vitola }}
                    </td>
                    <td class="ta-r">
                      {{ formatNumber(item.count) }} ({{
                        formatNumber((item.count / this.totales.ruedas) * 100)
                      }}%)
                    </td>
                    <td class="ta-r">
                      {{ formatNumber(item.cantidad, false) }} ({{
                        formatNumber(
                          (item.cantidad / this.totales.cantidad) * 100
                        )
                      }}%)
                    </td>
                  </tr>
                  <tr style="font-weight: bold">
                    <td>Total</td>
                    <td class="ta-r">
                      {{ formatNumber(this.totales.ruedas) }}
                    </td>
                    <td class="ta-r">
                      {{ formatNumber(this.totales.cantidad, false) }}
                    </td>
                  </tr>
                </table>
              </div> -->

              <!-- <div
                v-show="!cargando"
                v-if="
                  this.$store.state.user.type == 'Power User' ||
                    this.$store.state.user.type == 'Médico'
                "
                class="card bg-secondary"
                style="max-width: 20rem;"
              >
                <div class="card-header">
                  <p>Cantidad de Ruedas por Vitola</p>
                </div>
                <div class="card-body">
                  <p
                    v-for="(item, index) in gpedByVitola"
                    :key="index"
                    class="card-text"
                  >
                    {{ item._id.vitola }} : {{ item.count }} ({{
                      item.cantidad
                    }}
                    Cigarros)
                  </p>
                </div>
              </div> -->
              <!------------------------------------------ ***** ------------------------------------------>
              <div>
                <label
                  class="closeSesion"
                  @click="this.hamburger('Cerrar Sesión')"
                  for="btn-modal"
                  ><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</label
                >
              </div>
            </div>
            <div class="grid">
              <div v-if="this.$store.state.user.type == 'Power User'">
                <a
                  class="navbar-option"
                  @click="this.hamburger('Mejoras')"
                  href="#"
                  ><i class="fas fa-check"></i> Mejoras</a
                >
              </div>
              <div v-if="this.$store.state.user.type == 'Power User'">
                <a
                  class="navbar-option"
                  @click="this.hamburger('Usuarios')"
                  href="#"
                  ><i class="fas fa-users"></i> Usuarios</a
                >
              </div>
              <div
                v-if="
                  this.$store.state.user.type == 'Power User' ||
                    this.$store.state.user.type == 'Médico' ||
                    this.$store.state.user.type == 'Administrador'
                "
              >
                <a
                  class="navbar-option"
                  @click="this.hamburger('Expedientes')"
                  href="#"
                  ><i class="fas fa-file"></i> Expedientes</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico' ||
                      this.$store.state.user.type == 'Secretaria'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Citas')"
                  href="#"
                  ><i class="fas fa-calendar-plus"></i> Citas</a
                >
              </div>
              <div
                v-if="
                  this.$store.state.user.type == 'Power User' ||
                    this.$store.state.user.type == 'Secretaria'
                "
              >
                <a
                  class="navbar-option"
                  @click="this.hamburger('Pacientes')"
                  href="#"
                  ><i class="fas fa-solid fa-id-badge"></i> Nuevo Paciente</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Recetas')"
                  href="#"
                  ><i class="fas fa-file-prescription"></i> Recetas</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Licencias')"
                  href="#"
                  ><i class="fas fa-file"></i> Licencias</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Resclinicos')"
                  href="#"
                  ><i class="fas fa-file-alt"></i> Resumenes</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico' ||
                      this.$store.state.user.type == 'Administrador'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Reclamos')"
                  href="#"
                  ><i class="fas fa-file-invoice-dollar"></i> Reclamos</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico' ||
                      this.$store.state.user.type == 'Administrador'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Lotes')"
                  href="#"
                  ><i class="fas fa-file-alt"></i> Lotes</a
                >
              </div>
              <div>
                <a
                  v-if="
                    this.$store.state.user.type == 'Power User' ||
                      this.$store.state.user.type == 'Médico' ||
                      this.$store.state.user.type == 'Administrador'
                  "
                  class="navbar-option"
                  @click="this.hamburger('Facturas')"
                  href="#"
                  ><i class="fas fa-file-invoice-dollar"></i> Facturas</a
                >
              </div>
            </div>
            <div>
              <div>
                <br />
                <div class="form-floating mb-3">
                  <input
                    id="search"
                    type="buscar"
                    placeholder="Buscar"
                    class="form-control"
                    autofocus
                    v-model="term"
                    @keypress.enter.prevent="search(term)"
                  /><label for="buscar">Buscar Expediente por Nombre:</label>
                </div>
              </div>
              <ListadoComponent :expedientes="expedientes" v-show="!cargando" />
            </div>
          </div>
        </fieldset>
        <!---------------------------------------- Finish Dashboard por Usuario ---------------------------------------->
      </form>
      <!-- <div
      v-show="!cargando"
      v-if="
        this.$store.state.user.type == 'Power User' ||
          this.$store.state.user.type == 'Médico'
      "
      class="card bg-secondary"
      style="max-width: 30rem;"
    > -->
      <!-- <div class="card-header">
        <p>Cantidad de Facturas por Estatus</p>
      </div> -->
      <!-- <div class="card-body">
        <p style="font-weight: bold">Facturas por Ubicación</p>
        <table id="customers">
          <tr>
            <th>Ubicación</th>
            <th>Cant.</th>
            <th>Total</th>
          </tr>
          <tr v-for="(item, index) in facturasCant" :key="index">
            <td :class="toColor(item._id.status)">
              {{ item._id.status }}
            </td>
            <td :class="toColor(item._id.status)" class="ta-r">
              {{ formatNumber(item.count) }} ({{
                formatNumber((item.count / this.totales.facturas) * 100)
              }}%)
            </td>
            <td :class="toColor(item._id.status)" class="ta-r">
              {{ formatNumber(item.cobertura, true) }} ({{
                formatNumber((item.cobertura / this.totales.cobertura) * 100)
              }}%)
            </td>
          </tr>
          <tr style="font-weight: bold">
            <td>Total</td>
            <td class="ta-r">
              {{ formatNumber(this.totales.facturas) }}
            </td>
            <td class="ta-r">
              {{ formatNumber(this.totales.cobertura, true) }}
            </td>
          </tr>
        </table>
      </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { getMejPend } from "@/services/expedientesclinicos/MejoraService";
import { getUsuariosCant } from "@/services/expedientesclinicos/UsuarioService";
import ListadoComponent from "@/components/Expediente/ListComponent.vue";
import {
  getfacturasCant,
  getfactsGpedByCli,
} from "@/services/expedientesclinicos/FacturaService";
import { getGpedByVitola } from "@/services/expedientesclinicos/Rueda";
import { Expediente } from "@/interfaces/Expediente";
import { getExpedientes } from "@/services/expedientesclinicos/Expediente";
import numeral from "numeral";
import Pusher from "pusher-js";
export default {
  name: "DashboardView",
  components: {
    Navbar,
    ListadoComponent,
  },

  data() {
    return {
      gpedByVitola: [] as any,
      usuariosCant: [] as any,
      facturasCant: [] as any,
      factsGpedByCli: [] as any,
      mejorasPend: [] as any,
      totales: {} as any,
      cargando: false,
      expedientes: [] as Expediente[],
      showModal: false,
    };
  },

  methods: {
    showModalMethod() {
      this.showModal = !this.showModal;
    },

    async search(term: string) {
      this.toggleLoading();
      try {
        const res = await getExpedientes(this.$store.state.user.puedeVer);
        this.expedientes = res.data;
      } catch (error) {
        // console.error(error);
      }

      if (term !== "Todos") {
        this.expedientes = this.expedientes.filter((expediente: Expediente) => {
          return expediente.nombre.toLowerCase().includes(term.toLowerCase());
        });
      }
      this.toggleLoading();
      // this.showModalMethod();
    },

    salir() {
      if (confirm("¿Está Seguro que desea Cerrar Sesión?")) {
        this.$router.push("/");
        this.$store.dispatch("logoutAction");
      }
    },

    hamburger(texto: string) {
      switch (texto) {
        case "Facturas":
          this.$router.push("/facturaas");
          break;
        case "Reclamos":
          this.$router.push("/reclamos");
          break;
        case "Lotes":
          this.$router.push("/lotes");
          break;
        case "Resclinicos":
          this.$router.push("/resclinicos");
          break;
        case "Licencias":
          this.$router.push("/licencias");
          break;
        case "Recetas":
          this.$router.push("/recetas");
          break;
        case "Citas":
          this.$router.push("/citas");
          break;
        case "Pacientes":
          this.$router.push("/pacientes");
          break;
        case "Expedientes":
          this.$router.push("/expedientes");
          break;
        case "Ruedas":
          this.$router.push("/ruedas");
          break;
        case "Cxp":
          this.$router.push("/cxps");
          break;
        case "Ligas":
          this.$router.push("/ligas");
          break;
        case "Empleados":
          this.$router.push("/empleados");
          break;
        case "Funciones":
          this.$router.push("/funcions");
          break;
        case "Mejoras":
          this.$router.push("/mejoras");
          break;
        case "Usuarios":
          this.$router.push("/usuarios");
          break;
        case "Dashboard":
          this.$router.push("/dashboard");
          break;
        case "Vitolas":
          this.$router.push("/vitolas");
          break;
        case "Cerrar Sesión":
          this.salir();
          break;
      }
      if (this.navMenuClas.length == 1) {
        this.navMenuClas.push("spread");
      } else {
        this.navMenuClas.pop();
      }
    },

    getARS(id_ars: string) {
      switch (id_ars) {
        case "5":
          return "ARS CMD";
        case "14":
          return "MAPFRE SALUD ARS, S.A.";
        case "8":
          return "FUTURO";
        case "12":
          return "META SALUD";
        case "23":
          return "YUNEN";
        case "17":
          return "RESERVAS";
        case "13":
          return "MONUMENTAL";
        case "4":
          return "ASEMAP";
        case "1":
          return "ARS APS S A";
        case "21":
          return "SIMAG";
        case "16":
          return "RENACER";
        case "59":
          return "GRUPO MEDICO ASOCIADO";
        case "24":
          return "PRIMERA  ARS DE HUMANO";
        case "22":
          return "UNIVERSAL";
        case "29":
          return "ALBA GAS S.R.L.";
        case "10":
          return "HUMANO SEGUROS";
        case "20":
          return "SENASA CONTRIBUTIVO";
        case "61":
          return "SENASA SUBSIDIADO";
        case "18":
          return "SEMMA";
        case "65":
          return "IDOPPRIL";
        default:
          return "ARS Descripcion";
      }
    },

    toColor(type: string) {
      if (type == "1 - Recibido por Auditoría Interna") {
        return "valor1";
      } else if (type == "2 - Verificado por Auditoría Interna") {
        return "valor2";
      } else if (type == "3 - Verificado por Auditoría Externa") {
        return "valor3";
      } else if (type == "4 - Recibido por Reclamaciones Médicas") {
        return "valor4";
      } else if (type == "5 - Verificado por Reclamaciones Médicas") {
        return "valor5";
      } else if (type == "6 - Cargado a Lote") {
        return "valor6";
      } else if (type == "7 - Enviado a la Aseguradora") {
        return "valor7";
      } else if (type == "Todos") {
        return "Todos";
      }
    },

    valorTotal() {
      this.totales.ruedas = this.gpedByVitola.reduce(
        (accum: any, item: any) => accum + item.count,
        0
      );

      this.totales.cantidad = this.gpedByVitola.reduce(
        (accum: any, item: any) => accum + item.cantidad,
        0
      );

      this.totales.gpedByVitola = this.gpedByVitola.length;
    },

    pusherSubscribe() {
      // Start pusher subscribe
      var pusher = new Pusher("d7b50b87118775ed0b11", {
        cluster: "us2",
      });

      var channel = pusher.subscribe("my-channel");
      channel.bind("my-event", (data: any) => {
        this.loadfacturasCant2();
        this.loadfactsGpedByCli2();
        this.loadGpedByVitola();
        // this.player.src = this.song.src;
        // this.player.play();
      });
      // End pusher subscribe
    },

    toggleLoading() {
      this.cargando = !this.cargando;
    },

    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    async loadMejorasPendientes() {
      // this.toggleLoading();
      try {
        const res = await getMejPend();
        this.mejorasPend = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadUsuariosCant() {
      // this.toggleLoading();
      try {
        const res = await getUsuariosCant();
        this.usuariosCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadfacturasCant() {
      this.toggleLoading();
      try {
        const res = await getfacturasCant();
        this.facturasCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadGpedByVitola() {
      // this.toggleLoading();
      try {
        const res = await getGpedByVitola();
        this.gpedByVitola = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },

    async loadfactsGpedByCli() {
      this.toggleLoading();
      try {
        const res = await getfactsGpedByCli();
        this.factsGpedByCli = res.data;
      } catch (error) {
        // console.error(error);
      }
      this.toggleLoading();
    },

    async loadfactsGpedByCli2() {
      try {
        const res = await getfactsGpedByCli();
        this.factsGpedByCli = res.data;
      } catch (error) {
        // console.error(error);
      }
    },

    async loadfacturasCant2() {
      // this.toggleLoading();
      try {
        const res = await getfacturasCant();
        this.facturasCant = res.data;
      } catch (error) {
        // console.error(error);
      }
      // this.toggleLoading();
    },
  },

  mounted() {
    this.loadMejorasPendientes();
    this.loadUsuariosCant();
    this.loadGpedByVitola();
    // this.loadfacturasCant();
    // this.loadfactsGpedByCli();
    this.pusherSubscribe();
  },

  updated() {
    this.valorTotal();
  },
};
</script>

<style lang="css" scoped>
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

.closeSesion {
  position: absolute;
  bottom: 0;
  right: 10px;
  /* color: #fff; */
  font-size: 15px;
  cursor: pointer;
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

.valor1 {
  text-align: left;
  /* background-color: rgb(255, 0, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 0, 0);
}

.valor2 {
  text-align: left;
  /* background-color: rgb(255, 64, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 64, 0);
}

.valor3 {
  text-align: left;
  /* background-color: rgb(255, 128, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 128, 0);
}

.valor4 {
  text-align: left;
  /* background-color: rgb(255, 192, 0); */
  margin: 1px;
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor5 {
  text-align: left;
  /* background-color: rgb(171, 187, 26); */
  margin: 1px;
  font-weight: bold;
  color: rgb(171, 187, 26);
}

.valor6 {
  text-align: left;
  /* background-color: rgb(86, 182, 53); */
  margin: 1px;
  font-weight: bold;
  color: rgb(86, 182, 53);
}

.valor7 {
  text-align: left;
  /* background-color: rgb(0, 176, 80); */
  margin: 1px;
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.ta-r {
  text-align: right;
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
  background-color: rgb(147, 147, 147);
  color: white;
}

td,
th {
  font-size: 75%;
}

p {
  font-size: 75%;
  margin: 0;
}
/* -------------------------------Structure... -------------------------------*/
h4 {
  text-align: center;
}
* {
  margin: 0;
}

.general {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

.grid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}

.grid-2 {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 3px;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
}
/* -------------------------------**********-------------------------------*/
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
  width: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* -------------------------------**********-------------------------------*/

.navbar-option {
  margin: 7px;
  font-size: 25px;
  /* color: white; */
  /* font-family: "Agency FB Bold"; */
  text-decoration: none;
}
</style>
