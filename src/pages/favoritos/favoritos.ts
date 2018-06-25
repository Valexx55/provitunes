import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details-favs/item-details';
import { SearchItem } from 'itunes-ionic';
import { MisFavoritos } from '../../app/MisFavoritos.service';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
  providers: [MisFavoritos]
})
export class FavoritosPage {

  //Variables globales a la clase
  //----------------------------------------------//


  private flagBorrar: boolean = false;  //marco si se ha borrado la cancion
  private lista_favoritos: SearchItem[];      //Mi lista de favoritos
  private loading: Loading;


  //constructor e inicializacion de variables
  //---------------------------------------------//

  //Cargo el listado existente en el storage para inicializar mis favoritos
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private servicioListaFavoritos: MisFavoritos,
    public loadingCtrl: LoadingController) {

    //Inicializo la lista la lista de nuevo
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();
  }

  //Funciones y metodos locales a este componente
  //---------------------------------------------//
  ionViewDidLoad() {
    this.servicioListaFavoritos.itemsRefresh().then(
      lista_favs => {
        this.lista_favoritos = lista_favs;
        this.loading.dismiss();
        this.servicioListaFavoritos.setListaFavs(this.lista_favoritos);
      }
    );
  }



  itemTapped(event, item) {
    //Voy a una pagina con la ficha para escuchar la cancion favorita seleccionada
    if (!this.flagBorrar && item.id !== 0) {  //si flag is true es porque he pinchado en borrar y borrado el elemento
      //Voy al componente ItemDEtailsPage al que le paso la cancion (item) como input
      this.navCtrl.push(ItemDetailsPage, { item: item });
    } else {
      this.flagBorrar = false;    //Lo vuelvo a su valor por defecto tras haber borrado e ignorado el click
    }
  }


  itemDeleted(event, item) {
    //Borro el elemento elegido del listado y del fichero
    console.log("Eliminada la cancion: " + item.titulo);
    this.flagBorrar = true;    //Este flag impide que luego se llama tamiben a itemTapped e intente elegir esta cancion 

    //Recreo el array menos el objeto que quiero quitar (la pagina se actualizara)
    this.lista_favoritos = this.lista_favoritos.filter(obj => obj !== item);

    //Elimino del storage el trackId seleccionado
    this.servicioListaFavoritos.itemDelete(item.id);

  }

} // Fin class ListPage
