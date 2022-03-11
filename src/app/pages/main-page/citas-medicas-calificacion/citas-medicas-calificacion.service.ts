import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CitaMedica } from './citas-medicas-calificacion.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
//Funciones utilizadas para la gestion de la coleccion citas medicas
export class CitasMedicasService {

  constructor(private angularFirestore: AngularFirestore, private loginService: LoginService ) { }

  getCitaMedicaDoc(id:string){
    return this.angularFirestore
    .collection('citas-medicas')
    .doc(id)
    .valueChanges()
  }

  getCitasMedicasList() {
    return this.angularFirestore
    .collection('citas-medicas')
    .snapshotChanges()
  }


  getUserData() {
    return this.loginService.getDataUserLogged();
  }


  


}
