import { Component, Inject, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { SearchItem, BusquedaInterface } from 'itunes-ionic';

/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  static LIMITE : number = 20;
  private termino:string;
  private lista_canciones : SearchItem[];

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  tabBarElement : any;

  constructor(public navCtrl: NavController,@Inject('BusquedaInterface') public itunes_service:BusquedaInterface) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.selectedSegment = 'cards';
    this.slides = [
      {
        id: "cards",
        title: "First Slide"
      },
      {
        id: "cubos",
        title: "Second Slide"
      },
      {
        id: "desliz",
        title: "Third Slide"
      }
    ];
  }

  onSegmentChanged(segmentButton) {
    this.selectedSegment = segmentButton.value;
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  cambioSlide() {
    console.log('Slide changed');
    let currentSlide = this.slider.getActiveIndex();
    this.selectedSegment =this.slides[currentSlide].id;
}

cerrarTeclado() {
  let activeElement = <HTMLElement>document.activeElement;
  activeElement && activeElement.blur && activeElement.blur();
}
  buscar(evento)
  {
    this.cerrarTeclado();
    console.log ("evento" + evento);
    console.log ("termino" + this.termino);
    this.itunes_service.busca(this.termino, BusquedaPage.LIMITE).subscribe (
      ok => {
        console.log ("RESULTADO BUSQEUDA =" + ok);
        this.lista_canciones = <SearchItem[]>ok.results;
        console.log ("RESULTADO cacniones =" +this.lista_canciones);
          }
    )
  }

  playMuestra( cancion: SearchItem) {
    //    document.getElementById("muestra").src = muestraCancion;
    if (cancion.seleccionada)
    {
        let audioElement = document.getElementById(''+cancion.trackId);
        console.log("audioElement " + audioElement );
        audioElement['pause']();
        cancion.seleccionada = false;
        cancion.estado='play';

    } else // canción no seleccionada
    {
        let audioElement = document.getElementById(''+cancion.trackId);
        console.log("audioElement " + audioElement );
        audioElement['play']();
        audioElement.onended = function() {
            cancion.seleccionada = false;
            cancion.estado='play';
        };
        cancion.seleccionada = true;
        cancion.estado='pause';

    }
    
   //  previewUr
    }

  favorito (cancion : SearchItem) {
    console.log ("HA DADO A FAVORITO")
    if (cancion.favorita)
    {
        cancion.favorita = false;
        cancion.estadofav = 'star-outline';
    }
    else {
        cancion.favorita = true;
        cancion.estadofav = 'star';

    }
}

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  takeMeBack() {
    this.navCtrl.parent.select(0);
  }
}

