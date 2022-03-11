import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  isList = true;
  isCreate = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Se realiza el control para presentar las listas en el componente
  constructor(private route: Router) {

    this.route.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      if (res.url.includes('crear-usuario')) {
        this.isCreate = true;
        this.isList = false;
      }else {
        this.isCreate = false;
        this.isList = true;
      }
    })
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
