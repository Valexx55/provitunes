import { Component, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BusquedaObservableService, BusquedaInterface, SearchItemReducido, SearchItem } from 'itunes-ionic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [{provide: 'BusquedaInterface', useClass: BusquedaObservableService}]
})
export class HomePage {

  private termino:string;
  private resultados : SearchItem[];

  constructor(public navCtrl: NavController, @Inject('BusquedaInterface') private itunes_service:BusquedaInterface) {

  }

  buscar(evento)
  {
    console.log ("evento" + evento);
    console.log ("termino" + this.termino);
    this.itunes_service.busca(this.termino).subscribe (
      ok => {
        console.log (ok);
        this.resultados = <SearchItem[]>ok.results;
        console.log (this.resultados);
          }
    )
  }



}
