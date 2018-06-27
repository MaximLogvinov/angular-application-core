// outsource
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// services
import { AuthService } from '../services/authentication.service';

/**
 * layout component
 *
 *
 */
@Component({
    selector: '[id="layout"]',
    templateUrl: './layout.html',
})
export class LayoutComponent implements OnInit {
    constructor( private authService: AuthService, private toastr: ToastrService ) {}
    ngOnInit() {
        // validation of the session
        if ( !this.authService.restoreSession() ) {
            setTimeout( () => {
                this.toastr.info( 'You can authorize to have more capabilities.' );
            });
        } else {
            setTimeout( () => {
                this.toastr.success( 'Hello user!' );
            });
        }
    }
}
