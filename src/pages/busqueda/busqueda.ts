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
export class BusquedaPage {private termino:string;
  private resultados : SearchItem[];

  @ViewChild('mySlider') slider: Slides;
  selectedSegment: string;
  slides: any;


  constructor(public navCtrl: NavController,@Inject('BusquedaInterface') public itunes_service:BusquedaInterface) {
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
    console.log("Segment changed to", segmentButton.value);
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged(slider) {
    console.log('Slide changed');
    const currentSlide = this.slides[slider.activeIndex];
    this.selectedSegment = currentSlide.id;
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
