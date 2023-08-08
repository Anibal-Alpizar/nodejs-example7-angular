import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { VideojuegoModule } from './videojuego/videojuego.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrdenModule } from './orden/orden.module';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //Modulos de la aplicación
    CoreModule,
    ShareModule,
    //Todos los demás modulos
    HomeModule,
    UserModule,
    VideojuegoModule,
    OrdenModule,
    //Siempre de último
    AppRoutingModule   
   
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
