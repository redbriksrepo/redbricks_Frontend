import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/service/authentication/authentication.service";
import { LocationService } from "src/app/service/location/location.service";
import { ProposalService } from "src/app/service/proposal/proposal.service";
import Swal from "sweetalert2";

@Component({
    selector: 'location-location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss']
})
export class LocationLocationDetailComponent implements OnInit {

    location: any;
    center: any;

    constructor(
        private locationService: LocationService,
        private proposalService: ProposalService,
        private authService: AuthenticationService,
        private router: Router
    ) { }

    getCenterData = () => {
        this.location = this.locationService.selectedLocation;
        this.center = this.locationService.selectedCenter;
    }

    ngOnInit(): void {
        this.getCenterData();
    }

    addProposal = () => {
        Swal.fire({
            title: 'Initialized Proposal',
            text: 'Once you initialized proposal it cannot be undone',
            icon: 'question',
            showConfirmButton: true,
            confirmButtonText: 'Initialized',
            confirmButtonColor: '#C3343A',
            showCancelButton: true,
            cancelButtonColor: '#7D7E80'
        }).then((confirmation) => {
            if (confirmation.isConfirmed) {
                this.initiateProposal();
            }
        })
    }

    initiateProposal = () => {
        let data = {
            location: this.location,
            center: this.center
        }
        console.log(data)
        this.proposalService.initializeProposal(data).subscribe({
            next: (result: any) => {
                if (result.Message === "Proposal Initiated Successfully") {
                    // this.router.navigate(['/new-proposal/add', this.location, result.Id]);
                    this.router.navigate(['/sales','new-proposal', 'client-info',result.Id]);
                }
            },
            error: (err: any) => {
                this.authService.handleAuthError(err);
            }
        });
    }
}