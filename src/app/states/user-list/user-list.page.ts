// outsource
import { Component, OnInit  } from '@angular/core';

// services
import { AuthService } from '../../services/authentication.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

/**
 * Root application component
 *
 *
 */
@Component({
    selector: '[id="user-list"]',
    templateUrl: './user-list.html',
    providers: [NgbPaginationConfig]
})
export class UserListPage implements OnInit {
    public userList;
    public pagination;
    public page: number;
    constructor( private authService: AuthService, config: NgbPaginationConfig ) {
        config.boundaryLinks = true;
    }
    getList( page ) {
        this.authService.getUserData( page ).subscribe(
            response => this.userList = response,
            () => this.userList = null );
    }
    ngOnInit () {
        if ( this.authService.isAuthorized() ) {
            this.authService.getUserData(1).subscribe(
                response => {
                    this.userList = response;
                    this.pagination = response;
                },
                () => this.userList = null);
        }
    }
}
