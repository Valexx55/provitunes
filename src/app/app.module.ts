import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CreditosComponent } from '../pages/creditos/creditos';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { BusquedaPage } from '../pages/busqueda/busqueda';
import { ItemDetailsPage } from '../pages/item-details-favs/item-details';
//import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreditosComponent,
    FavoritosPage,
    BusquedaPage,
    ItemDetailsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreditosComponent,
    FavoritosPage,
    BusquedaPage,
    ItemDetailsPage
  ],
  providers: [
    StatusBar,
   // SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
