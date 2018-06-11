import { Component } from '@angular/core';

@Component({
    selector: '[id="header"]',
    templateUrl: './header.html',
})
export class HeaderComponent {
    /**
     * using vm to define publick data of the page
     * and deleagate prepared properties
     *
     */
    public vm = {
        isNavbarCollapsed: true
    };

}
