// outsource
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// app
import { LayoutModule } from './states/layout.module';
import { LayoutComponent } from './states/layout.component';
import { AuthService } from './services/authentication.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

/**
 * Root application module
 *
 *
 */
@NgModule({
    bootstrap: [ LayoutComponent ],
    imports: [
        LayoutModule,
        BrowserModule
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        }
    ],
})
export class AppModule {}
