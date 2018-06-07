// outsource
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// app
import { LayoutModule } from './states/layout.module';
import { LayoutComponent } from './states/layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/**
 * Root application module
 *
 *
 */
@NgModule({
    bootstrap: [ LayoutComponent ],
    imports: [
        LayoutModule,
        BrowserModule,
        NgbModule.forRoot()
    ],
    providers: [],
})
export class AppModule { }
