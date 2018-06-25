import { Component,ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Companeros } from "./creditos.model";
import { List } from "ionic-angular";

@Component({
  selector: "creditos",
  templateUrl: "creditos.html",
})
export class CreditosComponent {

  private visible_pascua : boolean;

  private caltongif : string;

  private foto_empresa : string;
  
  private gente : Companeros [];
  private clicks : number;
  constructor( ) {

    console.log ("constructor");
    this.clicks = 0;
    this.visible_pascua = false;
    this.foto_empresa = "assets/imgs/logo_CAS_noBackground.JPG";
    //this.caltongif = "assets/imgs/iTunes.gif"
    this.gente = [
      {
        nombre: "Angel J. Cachón",
        github: "https://github.com/acachon",
        linkedin: "https://www.linkedin.com/in/angelcachon/",
        image: "https://avatars0.githubusercontent.com/u/36812721?s=460&v=4"
      },
      {
        nombre: "Angel Fernandez Alvarez",
        github: "https://github.com/antroxu",
        linkedin: "https://www.linkedin.com/in/ángel-fernández-álvarez-60083521",
        image: "https://media.licdn.com/dms/image/C5603AQEvFRqszVsoqw/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=Odz7zsutS6mciHhvxn5ekF3vjmzB3GgMpJhe9201_oE"
      },
      {
        nombre: "Amaya Valdiviejas Ruiz",
        github: "https://github.com/amaya1234",
        linkedin: "https://es.linkedin.com/in/amaya-valdiviejas-ruiz-3696869b",
        image: "assets/imgs/foto_amaya.png"
      },
      {
        nombre: "Carlos Moreno",
        github: "https://github.com/cmcarlos",
        linkedin:'https://www.linkedin.com/in/carlos-moreno-c%C3%A1mara-70222a48/',
        image: "assets/imgs/foto_carlos.jpg"
      },
      {
        nombre: "Daniel Adrián Durán",
        github: "https://github.com/DanielFrontEnd19",
        linkedin: "https://www.linkedin.com/in/frontenddanieladri%C3%A1n/",
        image: "https://media.licdn.com/dms/image/C4E03AQHPqGALqxTwzQ/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=Kf0ygqyygOOsQVqqkDcyi-ZH_yWWI6rFzte9Tn_P-ro"
      },
      {
        nombre: "David Herrera Torrado",
        github: "https://github.com/daher7",
        linkedin: "https://www.linkedin.com/in/david-herrera-torrado-771083166/",
        image: "https://media.licdn.com/dms/image/C4E03AQFpGKoWWU9EJw/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=E8XZ_shSfMsgz-krnMBFoQytZzFmwKWUWDFLl_QPseY"
      },
      {
        nombre: "Elena Jarabo",
        github: "https://github.com/keova",
        linkedin: "https://www.linkedin.com/in/elena-jarabo-ruiz/",
        image: "https://avatars1.githubusercontent.com/u/39187399?s=400&v=4"
      },
      {
        nombre: "Jose Carlos Calzada",
        github: "https://github.com/ixtab/",
        linkedin: "www.linkedin.com/in/jose-carlos-calzada-gomez",
        image: "https://media.licdn.com/dms/image/C5603AQHzaoQq6EMGCw/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=DkNydaWa63DSbxG5kIhDoQKZIonzVO9xFYfVprDY1EU"
      },
      {
        nombre: "Juan Madrigal Vergel",
        github: "https://github.com/Skattspa",
        linkedin: "https://www.linkedin.com/in/jmvergel/",
        image: "assets/imgs/foto_juan.png"
      },
      {
        nombre: "Luis Martinez",
        github: "https://github.com/ITLuisMC",
        linkedin: "https://www.linkedin.com/in/itluismc/",
        image: "https://avatars1.githubusercontent.com/u/26518294?s=400&v=4"
      },
      {
        nombre: "Manuel Jesús Moreno Arévalo",
        github: "https://github.com/manuelazo30",
        linkedin: "https://www.linkedin.com/in/manuelazo/",
        image: "https://media.licdn.com/dms/image/C5603AQFzXcSswWcDsw/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=AwbKiokk8XPgeZInfP_qjbDAgvosCFvMwW9u9j_FNC8"
      },
      {
        nombre: "Oscar  Rivera Yunquera",
        github: "https://github.com/Oscarriveragit",
        linkedin: "https://www.linkedin.com/oscarriverayunquera",
        image: "https://avatars2.githubusercontent.com/u/28908264?s=400&v=4"
      },
      {
        nombre: "Obdulia Zamora Doménech",
        github: "https://github.com/ozamgmam",
        linkedin: "https://www.linkedin.com/in/obdulia-zamora-dom%C3%A9nech-081a4742/",
        image: "https://media.licdn.com/dms/image/C5603AQG_xhKpDTQeIA/profile-displayphoto-shrink_800_800/0?e=1534982400&v=beta&t=hUabZttXiTHKToU3_Igl1Oe2B62VcefppPTeQ7H0ENE"
      }      
];
    
    this.mostrar(this.gente);
  }
  
  mostrar (gente){
    console.log(gente);
    
  }

  huevoPascua(){
    console.log("click logo");
    this.clicks = this.clicks + 1;
    if (this.clicks == 3){
      console.log("logo visible logo");
      this.mostrarGif();
      this.cleanClicks();
    } 
  }

  cleanClicks(){
    this.clicks = 0;
    
  }

  mostrarGif() {
    this.visible_pascua = true;
    let audioElement = document.getElementById('carlton');
    console.log("audioElement " + audioElement);
    //this.caltongif="https://raw.githubusercontent.com/Valexx55/AngularItunes/master/iTunes.gif?"+new Date().getTime();
    this.caltongif="assets/imgs/iTunes.gif?"+new Date().getTime();
    audioElement['play']();
    audioElement.onended = () => {
      this.caltongif="";//assets/imgs/iTunes.gif
      this.visible_pascua = false;

    }

  }

}