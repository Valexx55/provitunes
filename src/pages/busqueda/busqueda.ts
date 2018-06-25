import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { SearchItem, BusquedaInterface } from 'itunes-ionic';
import { MisFavoritos } from '../../app/MisFavoritos.service';

/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
  providers: [MisFavoritos]
})
export class BusquedaPage implements AfterViewInit {

  static LIMITE : number = 20;
  private termino:string;
  private lista_canciones : SearchItem[];

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;
  tabBarElement : any;

  constructor(public navCtrl: NavController,@Inject('BusquedaInterface') public itunes_service:BusquedaInterface, public fav_service : MisFavoritos)   {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.selectedSegment = 'cards';
    this.slides = [
      {
        id: "cards",
        title: "Second Slide"
      },
      {
        id: "cubos",
        title: "Third Slide"
      },
      {
        id: "desliz",
        title: "First Slide"
      },
    ];
    
  }

  ngAfterViewInit() 
  {
    this.slider.lockSwipes(true);
  }

  onSegmentChanged(segmentButton) {
    this.selectedSegment = segmentButton.value;
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
    //para evitar el conflicto
   /* if (this.selectedSegment=="desliz")
    {
      this.slider.lockSwipes(true);
    }
    else {
      this.slider.lockSwipes(false);
    }*/
    
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
        this.lista_canciones.forEach(cancion => 
          {
            cancion.seleccionada = false;
            cancion.favorita= false;//this.fav_service.isFavorita(cancion);
            cancion.estado="play";//se ve el play
            cancion.estadofav= cancion.favorita ? "star":"star-outline";//se ve el iocono vacío
          }
        );
      }
    );
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
      this.fav_service.itemDelete(cancion.trackId);
        cancion.favorita = false;
        cancion.estadofav = 'star-outline';
    }
    else {
        this.fav_service.itemAdd(cancion);
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

