import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import GuestLayout from "../layouts/GuestLayout.vue";
import LogIn from "../views/LogInView.vue";
import SignUp from "../views/SignUpView.vue";

import DashboardLayout from "../layouts/DashboardLayout.vue";
import Dashboard from "../views/DashboardView.vue";

// Usuario -------------------------------------------------------------------
import UsuarioComponent from "../components/Usuario/PrincipalComponent.vue";
import UsuarioDetailComponent from "../components/Usuario/DetailComponent.vue";
// ----------------------------------------------------------------------------

// Mejora -------------------------------------------------------------------
import MejoraComponent from "../components/Mejora/PrincipalComponent.vue";
import MejoraDetailComponent from "../components/Mejora/DetailComponent.vue";
import MejoraPrintComponent from "../components/Mejora/PrintComponent.vue";
import MejoraFormComp from "../components/Mejora/FormComp.vue";
// ----------------------------------------------------------------------------

// Factura -------------------------------------------------------------------
import FacturaComponent from "../components/Factura/PrincipalComponent.vue";
import FacturaDetailComponent from "../components/Factura/DetailComponent.vue";
import FacturaPrintComponent from "../components/Factura/PrintComponent.vue";
import FacturaFormComp from "../components/Factura/FormComp.vue";
// ----------------------------------------------------------------------------

// Area -------------------------------------------------------------------
import AreaComponent from "../components/Area/PrincipalComponent.vue";
import AreaDetailComponent from "../components/Area/DetailComponent.vue";
import AreaPrintComponent from "../components/Area/PrintComponent.vue";
import AreaFormComp from "../components/Area/FormComp.vue";
// ----------------------------------------------------------------------------

// Reporte -------------------------------------------------------------------
import ReporteComponent from "../components/Reporte/PrincipalComponent.vue";
import ReporteDetailComponent from "../components/Reporte/DetailComponent.vue";
import ReportePrintComponent from "../components/Reporte/PrintComponent.vue";
import ReporteFormComp from "../components/Reporte/FormComp.vue";
// ----------------------------------------------------------------------------

// Reporte2 -------------------------------------------------------------------
import Reporte2Component from "../components/Reporte2/PrincipalComponent.vue";
import Reporte2DetailComponent from "../components/Reporte2/DetailComponent.vue";
import Reporte2PrintComponent from "../components/Reporte2/PrintComponent.vue";
import Reporte2FormComp from "../components/Reporte2/FormComp.vue";
// ----------------------------------------------------------------------------

// Vitola -------------------------------------------------------------------
import VitolaComponent from "../components/Vitola/PrincipalComponent.vue";
import VitolaDetailComponent from "../components/Vitola/DetailComponent.vue";
import VitolaPrintComponent from "../components/Vitola/PrintComponent.vue";
import VitolaFormComp from "../components/Vitola/FormComp.vue";
// ----------------------------------------------------------------------------

// Funcion -------------------------------------------------------------------
import FuncionComponent from "../components/Funcion/PrincipalComponent.vue";
import FuncionDetailComponent from "../components/Funcion/DetailComponent.vue";
import FuncionPrintComponent from "../components/Funcion/PrintComponent.vue";
import FuncionFormComp from "../components/Funcion/FormComp.vue";
// ----------------------------------------------------------------------------

// Empleado -------------------------------------------------------------------
import EmpleadoComponent from "../components/Empleado/PrincipalComponent.vue";
import EmpleadoPrintComponent from "../components/Empleado/PrintComponent.vue";
import EmpleadoFormComp from "../components/Empleado/FormComp.vue";
// ----------------------------------------------------------------------------

// Liga -------------------------------------------------------------------
import LigaComponent from "../components/Liga/PrincipalComponent.vue";
import LigaPrintComponent from "../components/Liga/PrintComponent.vue";
import LigaFormComp from "../components/Liga/FormComp.vue";
// ----------------------------------------------------------------------------

// Cxp -------------------------------------------------------------------
import CxpComponent from "../components/Cxp/PrincipalComponent.vue";
import CxpPrintComponent from "../components/Cxp/PrintComponent.vue";
import CxpFormComp from "../components/Cxp/FormComp.vue";
// ----------------------------------------------------------------------------

// Rueda -------------------------------------------------------------------
import RuedaComponent from "../components/Rueda/PrincipalComponent.vue";
import RuedaPrintComponent from "../components/Rueda/PrintComponent.vue";
import RuedaFormComp from "../components/Rueda/FormComp.vue";
// ----------------------------------------------------------------------------

// Expediente -------------------------------------------------------------------
import ExpedienteComponent from "../components/Expediente/PrincipalComponent.vue";
import ExpedientePrintComponent from "../components/Expediente/PrintComponent.vue";
import ExpedienteFormComp from "../components/Expediente/FormComp.vue";
import PacienteFormComp from "../components/Expediente/FormPacComp.vue";
// ----------------------------------------------------------------------------
// Licencia -------------------------------------------------------------------
import LicenciaComponent from "../components/Licencia/PrincipalComponent.vue";
import LicenciaPrintComponent from "../components/Licencia/PrintComponent.vue";
import LicenciaFormComp from "../components/Licencia/FormComp.vue";
// ----------------------------------------------------------------------------
// Resclinico -------------------------------------------------------------------
import ResclinicoComponent from "../components/Resclinico/PrincipalComponent.vue";
import ResclinicoPrintComponent from "../components/Resclinico/PrintComponent.vue";
import ResclinicoFormComp from "../components/Resclinico/FormComp.vue";
// ----------------------------------------------------------------------------
// Receta -------------------------------------------------------------------
import RecetaComponent from "../components/Receta/PrincipalComponent.vue";
import RecetaPrintComponent from "../components/Receta/PrintComponent.vue";
import RecetaFormComp from "../components/Receta/FormComp.vue";
// ----------------------------------------------------------------------------

// Reclamo -------------------------------------------------------------------

import ReclamoComponent from "../components/Reclamo/PrincipalComponent.vue";
import ReclamoDetailComponent from "../components/Reclamo/FormComp.vue";
import ReclamoPrintComponent from "../components/Reclamo/PrintComponent.vue";
import ReclamoFormComp from "../components/Reclamo/FormComp.vue";
import ReclamoCiruFormComp from "../components/Reclamo/FormCompCiru.vue";
// ----------------------------------------------------------------------------

// Lote -------------------------------------------------------------------

import LoteComponent from "../components/Lote/PrincipalComponent.vue";
import LoteDetailComponent from "../components/Lote/FormComp.vue";
import LotePrintComponent from "../components/Lote/PrintComponent.vue";
import LoteFormComp from "../components/Lote/FormComp.vue";
import LoteCiruFormComp from "../components/Lote/FormCompCiru.vue";
// ----------------------------------------------------------------------------

// Facturaa -------------------------------------------------------------------

import FacturaaComponent from "../components/Facturaa/PrincipalComponent.vue";
import FacturaaDetailComponent from "../components/Facturaa/FormComp.vue";
import FacturaaPrintComponent from "../components/Facturaa/PrintComponent.vue";
import FacturaaFormComp from "../components/Facturaa/FormComp.vue";
import FacturaaCiruFormComp from "../components/Facturaa/FormCompCiru.vue";
// ----------------------------------------------------------------------------

// Cita -------------------------------------------------------------------
import CitaComponent from "../components/Cita/PrincipalComponent.vue";
import CitaPrintComponent from "../components/Cita/PrintComponent.vue";
import CitaFormComp from "../components/Cita/FormComp.vue";
// ----------------------------------------------------------------------------

// Chat -------------------------------------------------------------------
import ChatComponent from "../components/ChatComponent.vue";
// ----------------------------------------------------------------------------

const routes = [
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "/",
        name: "LogIn",
        component: LogIn,
      },
      {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          roles: ["Power User", "Médico", "Secretaria", "Administrador"],
        },
      },

      // Usuarios --------------------------------------------------------------------
      {
        path: "/usuarios",
        name: "usuarios",
        component: UsuarioComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/usuarios/:id",
        name: "usuario-details",
        component: UsuarioDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      // ----------------------------------------------------------------------------

      // Mejora --------------------------------------------------------------------
      {
        path: "/mejoras",
        name: "mejoras",
        component: MejoraComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/mejoras/:id",
        name: "mejora-details",
        component: MejoraDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/mejoras2/:id",
        name: "mejora-details2",
        component: MejoraPrintComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/mejoras/new",
        name: "mejoras-form",
        component: MejoraFormComp,
        meta: {
          roles: ["Power User"],
        },
      },

      // ----------------------------------------------------------------------------

      // Factura --------------------------------------------------------------------
      {
        path: "/facturas",
        name: "facturas",
        component: FacturaComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/facturas/:id",
        name: "factura-details",
        component: FacturaDetailComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/facturas2/:id",
        name: "factura-details2",
        component: FacturaPrintComponent,
        meta: {
          roles: ["Power User", "Médico", "Encargado"],
        },
      },
      {
        path: "/facturas/new",
        name: "facturas-form",
        component: FacturaFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------

      // Area --------------------------------------------------------------------
      {
        path: "/areas",
        name: "areas",
        component: AreaComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/areas/:id",
        name: "area-details",
        component: AreaDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/areas2/:id",
        name: "area-details2",
        component: AreaPrintComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/areas/new",
        name: "areas-form",
        component: AreaFormComp,
        meta: {
          roles: ["Power User"],
        },
      },

      // ----------------------------------------------------------------------------

      // chat
      {
        path: "/chat",
        name: "chat",
        component: ChatComponent,
        meta: {
          roles: ["Power User"],
        },
      },

      // Reporte --------------------------------------------------------------------
      {
        path: "/reportes",
        name: "reportes",
        component: ReporteComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/reportes/:id",
        name: "reporte-details",
        component: ReporteDetailComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/reportes2/:id",
        name: "reporte-details2",
        component: ReportePrintComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/reportes/new",
        name: "reportes-form",
        component: ReporteFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------

      // Reporte2 --------------------------------------------------------------------
      {
        path: "/reporte2s",
        name: "reporte2s",
        component: Reporte2Component,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/reporte2s/:id",
        name: "reporte2-details",
        component: Reporte2DetailComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/reporte2s2/:id",
        name: "reporte2-details2",
        component: Reporte2PrintComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/reporte2s/new",
        name: "reporte2s-form",
        component: Reporte2FormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------

      // Vitola --------------------------------------------------------------------
      {
        path: "/vitolas",
        name: "vitolas",
        component: VitolaComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/vitolas/:id",
        name: "vitola-details",
        component: VitolaDetailComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/vitolas2/:id",
        name: "vitola-details2",
        component: VitolaPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/vitolas/new",
        name: "vitolas-form",
        component: VitolaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------

      // Funcion --------------------------------------------------------------------
      {
        path: "/funcions",
        name: "funcions",
        component: FuncionComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/funcions/:id",
        name: "funcion-details",
        component: FuncionDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/funcions2/:id",
        name: "funcion-details2",
        component: FuncionPrintComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/funcions/new",
        name: "funcions-form",
        component: FuncionFormComp,
        meta: {
          roles: ["Power User"],
        },
      },

      // ----------------------------------------------------------------------------

      // Empleado --------------------------------------------------------------------
      {
        path: "/empleados",
        name: "empleados",
        component: EmpleadoComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/empleados/:id",
        name: "empleado-details",
        component: EmpleadoFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/empleados2/:id",
        name: "empleado-details2",
        component: EmpleadoPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/empleados/new",
        name: "empleados-form",
        component: EmpleadoFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------

      // Liga --------------------------------------------------------------------
      {
        path: "/ligas",
        name: "ligas",
        component: LigaComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/ligas/:id",
        name: "liga-details",
        component: LigaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/ligas2/:id",
        name: "liga-details2",
        component: LigaPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/ligas/new",
        name: "ligas-form",
        component: LigaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------

      // Cxp --------------------------------------------------------------------
      {
        path: "/cxps",
        name: "cxps",
        component: CxpComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/cxps/:id",
        name: "cxp-details",
        component: CxpFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/cxps2/:id",
        name: "cxp-details2",
        component: CxpPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/cxps/new",
        name: "cxps-form",
        component: CxpFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------

      // Rueda --------------------------------------------------------------------
      {
        path: "/ruedas",
        name: "ruedas",
        component: RuedaComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/ruedas/:id",
        name: "rueda-details",
        component: RuedaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/ruedas2/:id",
        name: "rueda-details2",
        component: RuedaPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/ruedas/new",
        name: "ruedas-form",
        component: RuedaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------

      // Expediente --------------------------------------------------------------------
      {
        path: "/expedientes",
        name: "expedientes",
        component: ExpedienteComponent,
        meta: {
          roles: ["Power User", "Médico", "Administrador"],
        },
      },
      {
        path: "/expedientes/:id",
        name: "expediente-details",
        component: ExpedienteFormComp,
        meta: {
          roles: ["Power User", "Médico", "Administrador"],
        },
      },
      {
        path: "/expedientes2/:id",
        name: "expediente-details2",
        component: ExpedientePrintComponent,
        meta: {
          roles: ["Power User", "Médico", "Administrador"],
        },
      },
      {
        path: "/expedientes/new",
        name: "expedientes-form",
        component: ExpedienteFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/pacientes",
        name: "expedientes-form",
        component: PacienteFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------
      // Licencia --------------------------------------------------------------------
      {
        path: "/licencias",
        name: "licencias",
        component: LicenciaComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/licencias/:id",
        name: "licencia-details",
        component: LicenciaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/licencias2/:id",
        name: "licencia-details2",
        component: LicenciaPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/licencias/new",
        name: "licencias-form",
        component: LicenciaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/pacientes",
        name: "expedientes-form",
        component: PacienteFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------
      // Resclinico --------------------------------------------------------------------
      {
        path: "/resclinicos",
        name: "resclinicos",
        component: ResclinicoComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/resclinicos/:id",
        name: "resclinico-details",
        component: ResclinicoFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/resclinicos2/:id",
        name: "resclinico-details2",
        component: ResclinicoPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/resclinicos/new",
        name: "resclinicos-form",
        component: ResclinicoFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/pacientes",
        name: "expedientes-form",
        component: PacienteFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------
      // Receta --------------------------------------------------------------------
      {
        path: "/recetas",
        name: "recetas",
        component: RecetaComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/recetas/:id",
        name: "receta-details",
        component: RecetaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/recetas2/:id",
        name: "receta-details2",
        component: RecetaPrintComponent,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/recetas/new",
        name: "recetas-form",
        component: RecetaFormComp,
        meta: {
          roles: ["Power User", "Médico"],
        },
      },
      {
        path: "/pacientes",
        name: "expedientes-form",
        component: PacienteFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------

      // Reclamo --------------------------------------------------------------------
      {
        path: "/reclamos",
        name: "reclamos",
        component: ReclamoComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/reclamos/:id",
        name: "reclamo-details",
        component: ReclamoDetailComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/reclamos2/:id",
        name: "reclamo-details2",
        component: ReclamoPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/reclamos/new",
        name: "reclamos-form",
        component: ReclamoFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/reclamosCiru/new",
        name: "reclamos-form",
        component: ReclamoCiruFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------
      // Lote --------------------------------------------------------------------
      {
        path: "/lotes",
        name: "lotes",
        component: LoteComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/lotes/:id",
        name: "lote-details",
        component: LoteDetailComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/lotes2/:id",
        name: "lote-details2",
        component: LotePrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/lotes/new",
        name: "lotes-form",
        component: LoteFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/lotesCiru/new",
        name: "lotes-form",
        component: LoteCiruFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------
      // Facturaa --------------------------------------------------------------------
      {
        path: "/facturaas",
        name: "facturaas",
        component: FacturaaComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/facturaas/:id",
        name: "facturaa-details",
        component: FacturaaDetailComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/facturaas2/:id",
        name: "facturaa-details2",
        component: FacturaaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/facturaas/new",
        name: "facturaas-form",
        component: FacturaaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },
      {
        path: "/facturaasCiru/new",
        name: "facturaas-form",
        component: FacturaaCiruFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Médico"],
        },
      },

      // ----------------------------------------------------------------------------

      // Cita --------------------------------------------------------------------
      {
        path: "/citas",
        name: "citas",
        component: CitaComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/citas/:id",
        name: "cita-details",
        component: CitaFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/citas2/:id",
        name: "cita-details2",
        component: CitaPrintComponent,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },
      {
        path: "/citas/new",
        name: "citas-form",
        component: CitaFormComp,
        meta: {
          roles: ["Power User", "Médico", "Secretaria"],
        },
      },

      // ----------------------------------------------------------------------------

      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          roles: ["Power User", "Médico", "Secretaria", "Administrador"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta?.requiresAuth && store.state.isAuthenticated) {
    // let users enter if authenticated
    if (to.meta?.roles?.includes(store.state.user.type)) {
      next();
    } else {
      // console.log('User is not authorized for route.')
      alert("Usuario no Autorizado.");
    }
  } else if (to.meta?.requiresAuth) {
    // otherwise, route them to /login
    next("/");
  } else {
    next();
  }
});

export default router;
