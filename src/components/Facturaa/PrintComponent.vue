<template>
  <div class="verticalLine"></div>
  <div class="bodyFactura">
    <img
      style="width: 200px; position: fixed; margin-top: 20px; margin-left: 90px;"
      src="@/assets/images/logoSQR.png"
    />
    <div class="nameTittle">
      <h1>DR. CARLOS MORALES</h1>
      <h3>ORTOPEDA - TRAUMATOLOGO</h3>
      <div class="nameSubTittle">
        <p>EXQ 473-10</p>
        <p>RNC: {{ this.$store.state.user.factura.rncEmisor }}</p>
      </div>
      <div class="horizantalLine"></div>
    </div>
    <br />
    <p class="date">
      Santo Domingo, {{ this.$store.state.user.factura.fechaEmision }}
    </p>
    <p class="label">NCF:</p>
    <p>{{ this.$store.state.user.factura.ncf }}</p>
    <p>
      Válido hasta el {{ formatDate(this.$store.state.user.factura.venceNcf) }}
    </p>
    <br />
    <p class="label">NOMBRE:</p>
    <p>{{ this.$store.state.user.factura.razSocRecep }}</p>
    <p class="label">RNC:</p>
    <p>{{ this.$store.state.user.factura.rncRecep }}</p>
    <br />
    <h4>FACTURA CON CREDITO FISCAL</h4>
    <br />
    <table id="customers">
      <tr>
        <th>Descripción</th>
        <th>Monto</th>
      </tr>
      <tr>
        <td>{{ this.$store.state.user.factura.conc }}</td>
        <td class="der">
          {{ formatNumber(this.$store.state.user.factura.subTot) }}
        </td>
      </tr>
    </table>

    <!-- 
    <br />
    <br />
    <br />
    <br />
    <br />
    <br /> -->
    <div class="horizantalLineOut"></div>

    <div class="grayBox">
      <table style="width: 100%">
        <tr>
          <td :style="this.trStyle1">TOTAL:</td>
          <td :style="this.trStyle1">$</td>
          <td :style="this.trStyle1" class="der">
            {{ formatNumber(this.$store.state.user.factura.subTot) }}
          </td>
        </tr>
        <tr>
          <td :style="this.trStyle">ISR (10%):</td>
          <td :style="this.trStyle">$</td>
          <td :style="this.trStyle" class="der">
            {{ formatNumber(this.$store.state.user.factura.isr) }}
          </td>
        </tr>
        <tr>
          <td :style="this.trStyle">TOTAL:</td>
          <td :style="this.trStyle">$</td>
          <td :style="this.trStyle" class="der">
            {{ formatNumber(this.$store.state.user.factura.total) }}
          </td>
        </tr>
      </table>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>NOTA: {{ this.$store.state.user.factura.nota }}</p>
    <div>
      <p
        style="position: fixed; bottom: 70px; right: 70px; text-align: right; font-size: 80%; font-weight: bold"
      >
        _______________________________
      </p>
      <p
        style=" font-weight: bold; position: fixed; bottom: 50px; right: 70px; text-align: right; margin-top: 10px; font-size: 80%; margin-right: 65px;"
      >
        Firma
      </p>
    </div>
    <div>
      <p
        style="position: fixed; bottom: 70px; right: 524px; text-align: right; font-size: 80%; font-weight: bold"
      >
        _______________________________
      </p>
      <p
        style="font-weight: bold; position: fixed; bottom: 50px; right: 524px; text-align: right; margin-top: 10px; font-size: 80%; margin-right: 65px;"
      >
        Recibido Por
      </p>
    </div>
    <div>
      <p
        style="position: fixed; left: 90px; bottom: 22px; text-align: center; font-size: 80%; font-weight: bold; "
      >
        __________________________________________________________________________________________________________________________
      </p>
      <p
        style="position: fixed; left: 90px; bottom: 5px; font-size: 70%; margin-top: 0px; text-align: center"
      >
        e-mail dr.moralesangeles@gmail.com / consultasdrmorales@gmail.com, C/
        Luis F. Thomen, casi Av. Nuñez de Cáceres, Suite 402
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import numeral from "numeral";
import moment from "moment";

export default defineComponent({
  name: "lotes-form",
  components: {},
  data() {
    return {
      trStyle: "color: rgb(217, 217, 217); padding:0; margin: 0;",
      trStyle1: "padding:0; margin: 0;"
    };
  },

  async mounted() {
    this.fixTime();
    // this.toPrint();
    // this.$router.push(`/facturaas/new`);
  },

  methods: {
    formatNumber(value: number) {
      return numeral(value).format("0,0.00");
    },

    fixTime() {
      this.$store.state.user.factura.fechaEmision = this.formatDateToFix(
        this.$store.state.user.factura.fechaEmision,
        false
      );

      this.toPrint();
      this.$router.push(`/facturaas/new`);

      // if (this.factura.venceNcf) {
      //   this.factura.venceNcf = this.formatDateToFix(
      //     this.factura.venceNcf,
      //     false
      //   );
      // }
    },
    formatSecuence(value: number) {
      return numeral(value).format("00000000");
    },

    toPrint() {
      window.print();
    },

    newFormatDate(dateValue: Date) {
      // let out = moment(dateValue).add(0, "h");
      // return moment(out).format("DD/MM/YYYY");
      moment.locale("es");
      return moment(dateValue).calendar();
      // .startOf("hour")
      // .fromNow();
    },

    formatDateToFix(dateValue: Date, incTime: boolean) {
      if (incTime == true) {
        let out = moment(dateValue).add(0, "days");
        return moment(out).format("yyyy-MM-DDTHH:mm");
      } else {
        // alert("formatting");
        let out = moment(dateValue).add(0, "hours");
        return moment(out).format("D-MMMM-YYYY");
      }
    },

    formatDateText(dateValue: Date) {
      let out = moment(dateValue).add(0, "hours");
      return moment(out).format("MMMM Do YYYY");
    },

    formatDate2(dateValue: Date) {
      let out = moment(dateValue).add(0, "hours");
      return moment(out).format("DD MM YYYY");
    },

    formatDate(dateValue: Date) {
      let out = moment(dateValue).add(4, "hours");
      return moment(out).format("DD/MM/YYYY");
    },

    formatDatePlus(dateValue: Date) {
      let out = moment(dateValue).add(30, "days");
      return moment(out).format("yyyy-MM-DTHH:mm");
    },
  },
});
</script>

<style lang="css" scoped>
.grayBox {
  background-color: rgb(217, 217, 217);
  left: 350px;
  top: 130px;
  position: relative;
  width: 300px;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
}
.label {
  color: rgb(15, 72, 113);
  font-weight: bold;
}
.date {
  text-align: right;
}
.nameTittle {
  margin-top: 20px;
  left: 280px;
  position: relative;
  width: 420px;
}

.nameSubTittle {
  text-align: right;
  position: relative;
  left: -63px;
  color: rgb(15, 72, 113);
}

.der {
  text-align: right;
}

p {
  margin: 0;
}

/* START Tabla */
#customers {
  /* font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse; */
  width: 100%;
}

#customers td,
#customers th {
  /* border: 1px solid rgb(221, 221, 221); */
  padding: 30px;
  /* cursor: pointer; */
}

#customers tr:nth-child(even) {
  background-color: white;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 70px;
  /* text-align: center; */
  background-color: rgb(15, 72, 113);
  color: white;
}

td {
  padding-top: 80px;
  padding-bottom: 80px;
  margin: 50px;
}

/* td,
th {
  font-size: 75%;
} */

/* END Tabla */

.bodyFactura {
  position: fixed;
  top: 0;
  left: 90px;
  width: 645px;
}

.horizantalLineOut {
  background-color: rgb(15, 72, 113);
  width: 645px;
  height: 2px;
  position: fixed;
  top: 720px;
  left: 90px;
}

.horizantalLine {
  background-color: rgb(15, 72, 113);
  width: 645px;
  height: 2px;
  position: fixed;
  top: 170px;
  left: 90px;
}

.verticalLine {
  background-color: rgb(15, 72, 113);
  height: 100vh;
  width: 25px;
  position: fixed;
  top: 0;
  left: 20px;
}

h1 {
  color: rgb(15, 72, 113);
  font-size: bold;
}

h3 {
  color: rgb(15, 72, 113);
  font-size: bold;
}

h4 {
  color: rgb(15, 72, 113);
  font-size: bold;
}
</style>
