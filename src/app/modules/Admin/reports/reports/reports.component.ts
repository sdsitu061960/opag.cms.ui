import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  Highcharts: typeof Highcharts = Highcharts;  // Required for the chart to work
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Historic World Population by Region',
      align: 'left'
    },
    subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population" target="_blank">Wikipedia.org</a>',
      align: 'left'
    },
    xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe'],
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      },
      gridLineWidth: 0
    },
    tooltip: {
      valueSuffix: ' millions'
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.1
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Year 1990',
      type: 'bar',
      data: [632, 727, 3202, 721]
    }, {
      name: 'Year 2000',
      type: 'bar',
      data: [814, 841, 3714, 726]
    }, {
      name: 'Year 2021',
      type: 'bar',
      data: [1393, 1031, 4695, 745]
    }]
  };
}
