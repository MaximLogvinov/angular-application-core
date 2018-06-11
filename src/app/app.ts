// outsource
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// app
import { LayoutModule } from './states/layout.module';
import { LayoutComponent } from './states/layout.component';

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
    providers: [],
})
export class AppModule {}
