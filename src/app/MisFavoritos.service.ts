import { Injectable } from "@angular/core";

import { SearchItem } from 'itunes-ionic';

import { Storage } from '@ionic/storage';

@Injectable()
export class MisFavoritos {
    //Servicio para gestionar los favoritos de itunes en tu app
    //Variables locales al servicio
    private misFavoritos: SearchItem[];            //Array de canciones favoritas

    //Constructor e inicializacion del servicio
    //-----------------------------------------//

    constructor(public storage: Storage) {

    }

    setListaFavs(lista_favs: SearchItem[]): void {
        this.misFavoritos = lista_favs;
    }
    getListaFavs(): SearchItem[] {
        return this.misFavoritos;
    }

    public itemsRefresh(): any {
        //Recupera del storage el listado de canciones favoritas
        //Salida: devuelve una promesa con el array de canciones
        return this.storage.get("favoritosDB");
    }



    isFavorita(cancion: SearchItem, lista_canciones?: SearchItem[]): boolean {
        let cancion_fav: boolean = false;
        let indice: number = 0;
        if (lista_canciones == null) {
            lista_canciones = this.misFavoritos;
        }
        while (!cancion_fav && (indice < lista_canciones.length)) {
            cancion_fav = (cancion.trackId == lista_canciones[indice].trackId);
            indice = indice + 1;
        }

        return cancion_fav;
    }

    public itemDelete(miTrackId: number) {
        this.itemsRefresh().then((val) => {
            if (val == null) {               //Si no existe (vacio ya) inicializo misFavoritos
                this.misFavoritos = undefined;
            } else {
                this.misFavoritos = val;
                console.log("Antes tenias " + val.length + " canciones favoritas");

                //Filtro el elemento que se ha elegido elinminar (identificado por su trackId)
                this.misFavoritos = this.misFavoritos.filter(obj => obj.trackId !== miTrackId);

                //Vuelvo a almacenar el listado de favoritos completo (ya sin miTrackId) 
                this.storage.set("favoritosDB", this.misFavoritos);
                console.log("Eliminada en fichero: " + miTrackId);
                console.log("Ahora tienes " + this.misFavoritos.length + " favoritos, solo.");
            }
        });


    }

    public itemAdd(miCancion: SearchItem) {
        console.log("Añadir a favoritos");
        this.storage.get("favoritosDB").then((val) => 
        {
            //Y agrego la nueva cancion al final del array
            if (val == null) {
                this.misFavoritos = [miCancion];
            } else {
                console.log("Ya tenias " + val.length + " canciones favoritas");
                if (!this.isFavorita(miCancion, val)) {
                    this.misFavoritos = val;
                    this.misFavoritos[val.length] = miCancion;
                }
            }
            this.storage.set("favoritosDB", this.misFavoritos);
            console.log("Fichero storage actualizado con: " + miCancion.artistName)
        });

}
}