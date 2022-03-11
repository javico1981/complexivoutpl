import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { CitasMedicasCalificacionComponent } from './citas-medicas-calificacion.component';


//RUTAS DEL COMPONENTE CITAS MEDICAS
const routes: Routes = [
  { 
    path: '', component: CitasMedicasCalificacionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasMedicasRoutingModule { }
