// outsource
import { Component } from '@angular/core';
import { StateService } from '@uirouter/angular';
// app

/**
 * Root application component
 *
 *
 */
@Component({
    selector: '[id="home"]',
    templateUrl: './home.html',
})
export class HomePage {
    /**
     * using vm to define publick data of the page
     * and deleagate prepared properties
     *
     */
    public vm = {

    }

    /**
     * constructor holder to define what exactly past in public vm object
     *
     *
     */
    constructor ( private state: StateService ) {

    }

    /**
     * example of programmatically redirect
     *
     *
     */
    private goLogin () {
        this.state.go('login');
    }

};
