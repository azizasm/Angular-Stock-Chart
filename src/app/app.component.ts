import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Jsonp, JsonpModule } from '@angular/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  name = 'Angular 5 Highstock';
  @ViewChild("container", { read: ElementRef }) container: ElementRef;

  constructor(jsonp: Jsonp) {
    jsonp.request('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=JSONP_CALLBACK').subscribe(res => {


      Highcharts.stockChart(this.container.nativeElement, {
        rangeSelector: {
          buttons: [{
            type: 'month',
            count: 1,
            text: '1m',
            events: {
              click: function (e) {
                console.log('button clickd');
              }
            }
          }, {
            type: 'month',
            count: 3,
            text: '3m'
          }, {
            type: 'month',
            count: 6,
            text: '6m'
          }, {
            type: 'ytd',
            text: 'YTD'
          }, {
            type: 'year',
            count: 1,
            text: '1y'
          }, {
            type: 'all',
            text: 'All1'
          }]
        },
        chart: {
          zoomType: 'x'
        },
        series: [{
          name: 'AAPL',
          data: res.json(),
          tooltip: {
            valueDecimals: 2
          }
        }],
        xAxis: {
          events: {
            afterSetExtremes: (e) => {
              // console.log(e);
              // this.button = e.rangeSelectorButton.count;

            }
          }
        },
      })
    })
  }

}