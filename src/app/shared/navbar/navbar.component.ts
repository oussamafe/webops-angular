import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, NavigationStart, ActivatedRoute} from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import {FriendsService} from '../../services/friends.service';
import {Candidate} from '../../models/Candidate';
import {AuthService} from '../../services/auth.service';



@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    FriendsRequest: Candidate  [] = [];
    userID = this.Actrouter.snapshot.params['uid'];
    constructor(public location: Location, private router: Router , private authService: AuthService, private friend: FriendsService , private Actrouter: ActivatedRoute) {
    this.getCandidates();
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url !== this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (event instanceof NavigationEnd) {
                if (event.url === this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });

    }

    isHome() {
        const titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '#/home') {
            return true;
        } else {
            return false;
        }
    }
    isDocumentation() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '#/documentation') {
            return true;
        } else {
            return false;
        }
    }
    getCandidates() {

            this.friend.getFriendsRequest().subscribe((data) => {
                this.FriendsRequest = data;

            }); }

    AcceptFriend(idSender, idReciever) {
        this.friend.AcceptFriendsRequest(idSender, idReciever).subscribe(data => {
            this.friend.getFriendsRequest().subscribe((dataa) => {
                this.FriendsRequest = dataa;
                document.getElementById('Accept').hidden = true;
             }); });
    }
    RejectFriend(idSender, idReciever) {
        this.friend.RejectFriendsRequest(idSender, idReciever).subscribe(data => {
            this.friend.getFriendsRequest().subscribe((dataa) => {
                this.FriendsRequest = dataa;
                document.getElementById('Reject').hidden = true;
            }); });
    }
    logout() {

        this.authService.logout().subscribe();
    }
}
