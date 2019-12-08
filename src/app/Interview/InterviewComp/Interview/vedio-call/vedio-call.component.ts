import {Component, OnInit} from '@angular/core';
import {NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent} from 'ngx-agora';
import {AppliCandService} from '../../../../services/Interview/appli-cand.service';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InterviewService} from '../../../../services/Interview/interview.service';

@Component({
    selector: 'app-vedio-call',
    templateUrl: './vedio-call.component.html',
    styleUrls: ['./vedio-call.component.css']
})
export class VedioCallComponent implements OnInit {

    title = 'angular-video';
    localCallId = 'agora_local';
    remoteCalls: string[] = [];
    interid = this.actRoute.snapshot.params['iid'];
    private client: AgoraClient;
    private localStream: Stream;
    private uid: number;
    // tslint:disable-next-line:max-line-length
    caa: { id: number, first_Name: string, last_Name: string, email: string, skills: string, experiences: string, activities: string, studyLevel: string, profilIntro: string, phoneNumber: number, certifications: string } =
        // tslint:disable-next-line:max-line-length
        { id: null, first_Name: '', last_Name: '', email: '', skills: '', experiences: '', activities: '', studyLevel: '', profilIntro: '', phoneNumber: null, certifications: '' };
    // tslint:disable-next-line:max-line-length
    emm: { id: number, first_Name: string, last_Name: string, email: string, skills: string, experiences: string, activities: string, studyLevel: string, profilIntro: string, phoneNumber: number, certifications: string } =
        // tslint:disable-next-line:max-line-length
        { id: null, first_Name: '', last_Name: '', email: '', skills: '', experiences: '', activities: '', studyLevel: '', profilIntro: '', phoneNumber: null, certifications: '' };
    intertype = {type: '', hours_number: null, roleOfEmploye: ''};
    // tslint:disable-next-line:max-line-length
    constructor(private ngxAgoraService: NgxAgoraService, private authService: AuthService, private router: Router, private actRoute: ActivatedRoute, private svc: InterviewService) {
        this.uid = Math.floor(Math.random() * 100);
        this.svc.getTypeByidInterview(this.interid).subscribe(
            (data) => {
                this.intertype = data;
            }
        );
        this.svc.getEmployeByidInterview(this.interid).subscribe((data) => {
            this.emm = data;
        });
        this.svc.getCandidateByidInterview(this.interid).subscribe((data) => {
            this.caa = data;
        });
    }

    ngOnInit() {
        this.client = this.ngxAgoraService.createClient({mode: 'rtc', codec: 'h264'});
        this.assignClientHandlers();

        // Added in this step to initialize the local A/V stream
        this.localStream = this.ngxAgoraService.createStream({streamID: this.uid, audio: true, video: true, screen: false});
        this.assignLocalStreamHandlers();
        this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    }

    /**
     * Attempts to connect to an online chat room where users can host and receive A/V streams.
     */
    join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
        this.client.join(null, 'foo-bar', this.uid, onSuccess, onFailure);
    }

    /**
     * Attempts to upload the created local A/V stream to a joined chat room.
     */
    publish(): void {
        this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
    }

    private assignLocalStreamHandlers(): void {
        this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
            console.log('accessAllowed');
        });

        // The user has denied access to the camera and mic.
        this.localStream.on(StreamEvent.MediaAccessDenied, () => {
            console.log('accessDenied');
        });
    }

    private initLocalStream(onSuccess?: () => any): void {
        this.localStream.init(
            () => {
                // The user has granted access to the camera and mic.
                this.localStream.play(this.localCallId);
                if (onSuccess) {
                    onSuccess();
                }
            },
            err => console.error('getUserMedia failed', err)
        );
    }

    private assignClientHandlers(): void {
        this.client.on(ClientEvent.LocalStreamPublished, evt => {
            console.log('Publish local stream successfully');
        });

        this.client.on(ClientEvent.Error, error => {
            console.log('Got error msg:', error.reason);
            if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this.client.renewChannelKey(
                    '',
                    () => console.log('Renewed the channel key successfully.'),
                    renewError => console.error('Renew channel key failed: ', renewError)
                );
            }
        });

        this.client.on(ClientEvent.RemoteStreamAdded, evt => {
            const stream = evt.stream as Stream;
            this.client.subscribe(stream, {audio: true, video: true}, err => {
                console.log('Subscribe stream failed', err);
            });
        });

        this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
            const stream = evt.stream as Stream;
            const id = this.getRemoteId(stream);
            if (!this.remoteCalls.length) {
                this.remoteCalls.push(id);
                setTimeout(() => stream.play(id), 1000);
            }
        });

        this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
            const stream = evt.stream as Stream;
            if (stream) {
                stream.stop();
                this.remoteCalls = [];
                console.log(`Remote stream is removed ${stream.getId()}`);
            }
        });

        this.client.on(ClientEvent.PeerLeave, evt => {
            const stream = evt.stream as Stream;
            if (stream) {
                stream.stop();
                this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
                console.log(`${evt.uid} left from this channel`);
            }
        });
    }

    private getRemoteId(stream: Stream): string {
        return `agora_remote-${stream.getId()}`;
    }

    leave() {
        this.client.leave(function () {
            console.log('Leave channel successfully');
            window.location.reload();
        }, function (err) {
            console.log('Leave channel failed');
        });
        this.router.navigate(['/Interview/' + this.authService.getUserID()]);
    }
}
