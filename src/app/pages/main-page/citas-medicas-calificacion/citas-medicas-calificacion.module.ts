import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasMedicasCalificacionComponent } from './citas-medicas-calificacion.component';
import { CitasMedicasRoutingModule } from './citas-medicas-calificacion-routing.module';


@NgModule({
  declarations: [CitasMedicasCalificacionComponent,],
  imports: [
    CommonModule,
    CitasMedicasRoutingModule,
  ]
})
export class CitasMedicasCalificacionModule { }
