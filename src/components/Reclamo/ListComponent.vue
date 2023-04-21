<template>
  <table v-if="this.totales.reclamos" id="customers">
    <!-- <th>Factura No.</th> -->
    <!-- <th>Nombre del Prestador</th> -->
    <!-- <th>Código del Prestador</th> -->
    <!-- <th>Médico</th> -->
    <!-- <th>NAF</th> -->
    <th>Autorización</th>
    <th>Fecha</th>
    <th>Nombre de la ARS</th>
    <!-- <th>Autorizado Por</th> -->
    <th>Paciente</th>
    <!-- <th>Cédula</th> -->
    <th>Afiliado o NSS</th>
    <!-- <th>Sexo</th> -->
    <!-- <th>Edad</th> -->
    <!-- <th>Ingreso</th> -->
    <!-- <th>Egreso</th> -->
    <!-- <th>Dirección</th> -->
    <!-- <th>Diagnóstico</th> -->
    <th>Tipo de Servicio</th>
    <!-- <th>Descripción de Servicio</th> -->
    <th>Monto Reclamado</th>

    <tr
      @click="this.$router.push(`/reclamos/${reclamo._id}`)"
      v-for="(reclamo, index) in reclamos"
      :key="index"
    >
      <!-- <td>{{ reclamo.facNo }}</td> -->
      <!-- <td>{{ reclamo.nombPres }}</td> -->
      <!-- <td>{{ reclamo.codPres }}</td> -->
      <!-- <td>{{ reclamo.med }}</td> -->
      <!-- <td>{{ reclamo.naf }}</td> -->
      <td>{{ reclamo.aut }}</td>
      <td>{{ formatDate(reclamo.fechAutor, false) }}</td>
      <td>{{ reclamo.nombARS }}</td>
      <!-- <td>{{ reclamo.autPor }}</td> -->
      <td>{{ reclamo.nombPac }}</td>
      <!-- <td>{{ reclamo.cedu }}</td> -->
      <td>{{ reclamo.aflNSS }}</td>
      <!-- <td>{{ reclamo.sex }}</td> -->
      <!-- <td>{{ reclamo.edad }}</td> -->
      <!-- <td>{{ formatDate(reclamo.ing, false) }}</td> -->
      <!-- <td>{{ formatDate(reclamo.egr, false) }}</td> -->
      <!-- <td>{{ reclamo.dir }}</td> -->
      <!-- <td>{{ reclamo.dx }}</td> -->
      <td>{{ reclamo.tipServ }}</td>
      <!-- <td>{{ reclamo.descServ }}</td> -->
      <td class="der">{{ formatNumber(reclamo.montRec, true) }}</td>
    </tr>
    <tr>
      <td>Total: {{ formatNumber(this.totales.reclamos, false) }}</td>
      <!-- <td></td> -->
      <!-- <td></td> -->
      <!-- <td></td> -->
      <!-- <td></td> -->
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <!-- <td></td> -->
      <!-- <td></td> -->
      <td></td>
      <td class="der">{{ formatNumber(this.totales.valor, true) }}</td>
    </tr>
  </table>

  <h6 class="noRegist" v-if="!this.totales.reclamos">
    No se Encontraron Registros.
  </h6>
</template>

<script lang="ts">
import numeral from "numeral";
import moment from "moment";
import { updateOne } from "@/services/expedientesclinicos/Reclamo";
import { Reclamo } from "@/interfaces/Reclamo";

export default {
  props: ["reclamos"],
  data() {
    return {
      fechaActual: "",
      data: false,
      totales: {},
    };
  },
  mounted() {
    this.fechaActual = new Date();
  },
  methods: {
    calcularEdad(date: any) {
      let years = 0;
      let edad = Math.floor(
        moment(new Date()).diff(moment(date, "YYYY-MM-DD"), "month", true)
      );
      // if (edad > 120 || edad < 0) {
      //   years = 0;
      // } else {
      // years = edad;
      //   }
      years = edad - 1;
      // this.activo.edad = years;
      return years;
    },

    diffDate(dateValue: Date) {
      var NowMoment = moment().format("DD/MM/YYYY");
      // var Date = "2022-06-07";
      var Date = dateValue;

      return moment().diff(moment(Date), "days");
    },

    newFormatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(out).format("MMMM YYYY");
      // .startOf("hour")
      // .fromNow();
    },

    toColor(type: string) {
      if (type == "0") {
        return "valor1";
      } else if (type == "1") {
        return "valor2";
      } else {
        return "valor3";
      }
    },

    toColorDate(type: string) {
      if (type >= "6") {
        return "valor1";
      } else if (type >= "5") {
        return "valor2";
      } else if (type >= "4") {
        return "valor3";
      } else if (type >= "3") {
        return "valor4";
      } else if (type >= "2") {
        return "valor5";
      } else if (type >= "1") {
        return "valor6";
      } else if (type >= "0") {
        return "valor7";
      }
    },

    toColorNumber(type: number) {
      if (type >= 500000) {
        return "valor1";
      } else if (type >= 350000) {
        return "valor2";
      } else if (type >= 225000) {
        return "valor3";
      } else if (type >= 63000) {
        return "valor4";
      } else if (type >= 28000) {
        return "valor5";
      } else if (type >= 7000) {
        return "valor6";
      } else if (type >= 0) {
        return "valor7";
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

    async marcarListo(reclamo: Reclamo) {
      alert("Reclamo Lista.");
      try {
        const res = await updateOne(reclamo);
      } catch (error) {
        // console.error(error);
      }
    },

    toColor2(type: string) {
      if (type == "Error") {
        return "table-danger";
      } else if (type == "Función") {
        return "table-success";
      } else if (type == "Reclamo") {
        return "table-warning";
      }
    },
    valorTotal() {
      this.totales.reclamos = this.reclamos.length;
      this.totales.valor = this.reclamos.reduce(
        (accum: any, item: any) => accum + item.montRec,
        0
      );
    },

    formatNumber(value: number, decimal: boolean) {
      if (decimal == true) {
        return numeral(value).format("0,0.00");
      } else {
        return numeral(value).format("0,0");
      }
    },

    // formatNumber2(value: number) {
    //   return numeral(value).format("0,0");
    // },

    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "h");
      return moment(out).format("D/MM/yyyy");
    },

    formatDateNumber(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("MM");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "h");
      return moment(out).format("D/MM/yyyy");
    },
  },

  updated() {
    this.valorTotal();
    // this.data = !this.data;
  },
};
</script>

<style lang="css" scoped>
.valor1 {
  /* text-align: center; */
  /* background-color: rgb(255, 0, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.valor2 {
  /* text-align: center; */
  /* background-color: rgb(255, 64, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor3 {
  /* text-align: center; */
  /* background-color: rgb(255, 128, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 0, 0);
}

.valor4 {
  /* text-align: center; */
  /* background-color: rgb(255, 192, 0); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(255, 192, 0);
}

.valor5 {
  /* text-align: center; */
  /* background-color: rgb(171, 187, 26); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(171, 187, 26);
}

.valor6 {
  /* text-align: center; */
  /* background-color: rgb(86, 182, 53); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(86, 182, 53);
}

.valor7 {
  /* text-align: center; */
  /* background-color: rgb(0, 176, 80); */
  /* margin: 1px; */
  font-weight: bold;
  color: rgb(0, 176, 80);
}

.bold {
  font-weight: bold;
}

.gridlistareclamos {
  display: grid;
  grid-auto-flow: dense;
  grid-template-rows: auto auto;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  margin-bottom: 10px;
}

.ta-c {
  text-align: center;
}

p {
  margin: 0px;
}

.red {
  color: red;
}

.blue {
  color: blue;
}

.green {
  color: green;
}

td,
th {
  font-size: 75%;
}

.mith {
  background-color: rgb(47, 164, 231);
}

.cwhite {
  color: white;
}

.der {
  text-align: right;
}

.noRegist {
  font-weight: bold;
  color: rgb(255, 85, 85);
  text-align: center;
  /* background-color: rgb(255, 85, 85); */
  font-size: 75%;
}

/* Tabla */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td {
  border: 1px solid #ddd;
  padding: 3px;
  cursor: pointer;
}

#customers th {
  border: 1px solid #ddd;
  padding: 3px;
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
</style>
