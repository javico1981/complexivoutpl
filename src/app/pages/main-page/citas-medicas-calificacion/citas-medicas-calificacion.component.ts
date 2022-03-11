import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CitaMedica } from './citas-medicas-calificacion.model';
import { filter, takeUntil } from 'rxjs/operators';
import { CitasMedicasService } from './citas-medicas-calificacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-citas-medicas-calificacion',
  templateUrl: './citas-medicas-calificacion.component.html',
  styleUrls: ['./citas-medicas-calificacion.component.css']
})
export class CitasMedicasCalificacionComponent implements OnInit, OnDestroy {


  userData: any;
  citasMedicas: CitaMedica[]=[];
  medicosCalificacion: any[] =[];
  isReporteGeneral = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private route: Router, private citasMedicasService: CitasMedicasService) {

  }

  ngOnInit(): void {
   
    this.userData = this.citasMedicasService.getUserData();
    this.citasMedicasService.getCitasMedicasList().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.citasMedicas = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as CitaMedica;
      });

      this.medicosCalificacion = this.calcularData(this.citasMedicas);
    });
    
  }

  toggleReporte(): void {
    this.isReporteGeneral = !this.isReporteGeneral;
  }

  calcularData(arrayCitas: CitaMedica[]): any[] {

    let medicos: any[] = [];


    arrayCitas.forEach((cita) => {

      if (!medicos.find(x => x.uid === cita.medicoUID)) {
          let  medico = cita.medico
          medico.calificaciones = [];
          medico.pacientes = 0;
          medicos.push(medico);
      }
    });


    medicos.forEach((medico) => {

      arrayCitas.forEach((cita) => {
        if (medico.uid === cita.medicoUID) {
            medico.pacientes = medico.pacientes + 1;
            if(cita.calificacionNumber) {
              medico.calificaciones.push(cita.calificacionNumber);
            }
        }
      });

    })

    medicos.forEach((medico) => {

      medico.promedio = this.sacarPromedio(medico.calificaciones);
   
    })
    console.log(medicos)
    return medicos;
  }

  sacarPromedio(calificaciones: number[]): number | string {

    let sumaTotal = 0;

    if (calificaciones.length <= 0) {
      return 'Sin notas';
    }

    calificaciones.forEach((x) => {
      sumaTotal = sumaTotal + x;
    })

    return sumaTotal / calificaciones.length;

  }

  imprimir(): void {
    window.print();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  mapCalificacionTitle(calificacion: string): string {

    switch (calificacion) {
      case '1':
        {
          return 'Deficiente'
        }
      case '2':
        {
          return 'Regular'
        }
      case '3':
        {
          return 'Bueno'
        }
      case '4':
        {
          return 'Muy bueno'
        }
      case '5':
        {
          return 'Excelente'
        }
      default:
        {
          return 'Sin nota'
        }
      
    }
  }
}
