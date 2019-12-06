import {Component, OnInit} from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';
import {OnlineTestStatisticalService} from '../../../../services/Interview/online-test-statistical.service';


@Component({
    selector: 'app-stat-test',
    templateUrl: './stat-test.component.html',
    styleUrls: ['./stat-test.component.css']
})
export class StatTestComponent implements OnInit {


    tyear = new Date().getFullYear();
    lyear = this.tyear - 1;
    nbaccepted: number;
    nbrejected: number;
    nbaccepted1: number;
    nbrejected1: number;
    rej: number[];
    acc: number[];
    rej1: number[];
    acc1: number[];

    constructor(private svc: OnlineTestStatisticalService) {
    }

    ngOnInit() {
        this.svc.AcceptedTestPerYear(this.tyear).subscribe(
            (data) => this.nbaccepted = data,
            (err) => console.log(err),
            () => this.svc.RejectedTestPerYear(this.tyear).subscribe(
                (dodo) => {
                    this.nbrejected = dodo;
                    this.thisyear(this.tyear);
                }
            )
        );
        this.svc.AcceptedTestPerYear(this.lyear).subscribe(
            (data) => this.nbaccepted1 = data,
            (err) => console.log(err),
            () => this.svc.RejectedTestPerYear(this.lyear).subscribe(
                (dodo) => {
                    this.nbrejected1 = dodo;
                    this.lastyear(this.lyear);
                }
            )
        );
        this.svc.AcceptedTestPerMonth(this.lyear).subscribe(
            (data) => {
                this.acc = data;
                this.svc.RejectedTestPerMonth(this.lyear).subscribe(
                    (dodo) => {
                        this.rej = dodo;
                        this.lastyearmonths(this.lyear);
                    });
            });
        this.svc.AcceptedTestPerMonth(this.tyear).subscribe(
            (data) => {
                this.acc1 = data;
                this.svc.RejectedTestPerMonth(this.tyear).subscribe(
                    (dodo) => {
                        this.rej1 = dodo;
                        this.thisyearmonths(this.tyear);
                    });
            });
    }

    thisyearmonths(year) {
        const dataPoints = [];
        const dataPoints2 = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < 12; i++) {
            dataPoints.push({y: this.acc1[i], label: months[i]});
            dataPoints2.push({y: this.rej1[i], label: months[i]});
        }
        const chart1 = new CanvasJS.Chart('thisyearmonths', {
            zoomEnabled: true,
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: year + 'Months'
            },
            data: [
                {
                    type: 'line',
                    dataPoints: dataPoints
                }, {
                    type: 'line',
                    dataPoints: dataPoints2
                }]
        });
        chart1.render();
    }

    lastyearmonths(year) {
        const dataPoints = [];
        const dataPoints2 = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < 12; i++) {
            dataPoints.push({y: this.acc[i], label: months[i]});
            dataPoints2.push({y: this.rej[i], label: months[i]});
        }
        const chart1 = new CanvasJS.Chart('lastyearmonths', {
            zoomEnabled: true,
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: year + 'Months'
            },
            data: [
                {
                    type: 'line',
                    dataPoints: dataPoints
                }, {
                    type: 'line',
                    dataPoints: dataPoints2
                }]
        });
        chart1.render();
    }

    thisyear(year) {
        const chart = new CanvasJS.Chart('piethisyear', {
            theme: 'light2',
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: year
            },
            data: [{
                type: 'pie',
                showInLegend: true,
                toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
                indexLabel: '{name} - #percent%',
                dataPoints: [
                    {y: this.nbrejected, name: 'Invalid', color: '#b61a1a'},
                    {y: this.nbaccepted, name: 'Valid'}
                ]
            }]
        });
        chart.render();
    }

    lastyear(year) {
        const chart = new CanvasJS.Chart('pietlastyear', {
            theme: 'light2',
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: year
            },
            data: [{
                type: 'pie',
                showInLegend: true,
                toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
                indexLabel: '{name} - #percent%',
                dataPoints: [
                    {y: this.nbrejected1, name: 'Invalid', color: '#b61a1a'},
                    {y: this.nbaccepted1, name: 'Valid'}
                ]
            }]
        });
        chart.render();
    }

}
