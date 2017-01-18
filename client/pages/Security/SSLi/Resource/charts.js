import Highcharts from 'highcharts';
import addFunnel from 'highcharts/modules/funnel';

export const chart1 = (id) => {
  addFunnel(Highcharts);
  Highcharts.chart(id, {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Wind speed during two days'
    },
    subtitle: {
      text: 'October 6th and 7th 2009 at two locations in Vik i Sogn, Norway'
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      }
    },
    yAxis: {
      title: {
        text: 'Wind speed (m/s)'
      },
      min: 0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: [ { // Light air
        from: 0.3,
        to: 1.5,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'Light air',
          style: {
            color: '#606060'
          }
        }
      }, { // Light breeze
        from: 1.5,
        to: 3.3,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: 'Light breeze',
          style: {
            color: '#606060'
          }
        }
      }, { // Gentle breeze
        from: 3.3,
        to: 5.5,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'Gentle breeze',
          style: {
            color: '#606060'
          }
        }
      }, { // Moderate breeze
        from: 5.5,
        to: 8,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: 'Moderate breeze',
          style: {
            color: '#606060'
          }
        }
      }, { // Fresh breeze
        from: 8,
        to: 11,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'Fresh breeze',
          style: {
            color: '#606060'
          }
        }
      }, { // Strong breeze
        from: 11,
        to: 14,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: 'Strong breeze',
          style: {
            color: '#606060'
          }
        }
      }, { // High wind
        from: 14,
        to: 15,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: 'High wind',
          style: {
            color: '#606060'
          }
        }
      } ]
    },
    tooltip: {
      valueSuffix: ' m/s'
    },
    plotOptions: {
      spline: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        },
        pointInterval: 3600000, // one hour
        pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
      }
    },
    series: [ {
      name: 'Hestavollane',
      data: [ 4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
        7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
        8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
        7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2,
        3.0, 3.0 ]
    }, {
      name: 'Voll',
      data: [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0,
        0.0, 0.4, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.6, 1.2, 1.7, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3,
        3.0, 3.3, 4.8, 5.0, 4.8, 5.0, 3.2, 2.0, 0.9, 0.4, 0.3, 0.5, 0.4 ]
    }  ],
    navigation: {
      menuItemStyle: {
        fontSize: '10px'
      }
    }
  });
};

export const chart2 = (id) => {
  Highcharts.chart(id, {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Snow depth at Vikjafjellet, Norway'
    },
    subtitle: {
      text: 'Irregular time data in Highcharts JS'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Snow depth (m)'
      },
      min: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },

    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },

    series: [ {
      name: 'Winter 2012-2013',
      // Define the data points. All series have a dummy year
      // of 1970/71 in order to be compared on the same x axis. Note
      // that in JavaScript, months start at 0 for January, 1 for February etc.
      data: [
        [ Date.UTC(1970, 9, 21), 0 ],
        [ Date.UTC(1970, 10, 4), 0.28 ],
        [ Date.UTC(1970, 10, 9), 0.25 ],
        [ Date.UTC(1970, 10, 27), 0.2 ],
        [ Date.UTC(1970, 11, 2), 0.28 ],
        [ Date.UTC(1970, 11, 26), 0.28 ],
        [ Date.UTC(1970, 11, 29), 0.47 ],
        [ Date.UTC(1971, 0, 11), 0.79 ],
        [ Date.UTC(1971, 0, 26), 0.72 ],
        [ Date.UTC(1971, 1, 3), 1.02 ],
        [ Date.UTC(1971, 1, 11), 1.12 ],
        [ Date.UTC(1971, 1, 25), 1.2 ],
        [ Date.UTC(1971, 2, 11), 1.18 ],
        [ Date.UTC(1971, 3, 11), 1.19 ],
        [ Date.UTC(1971, 4, 1), 1.85 ],
        [ Date.UTC(1971, 4, 5), 2.22 ],
        [ Date.UTC(1971, 4, 19), 1.15 ],
        [ Date.UTC(1971, 5, 3), 0 ]
      ]
    }, {
      name: 'Winter 2013-2014',
      data: [
        [ Date.UTC(1970, 9, 29), 0 ],
        [ Date.UTC(1970, 10, 9), 0.4 ],
        [ Date.UTC(1970, 11, 1), 0.25 ],
        [ Date.UTC(1971, 0, 1), 1.66 ],
        [ Date.UTC(1971, 0, 10), 1.8 ],
        [ Date.UTC(1971, 1, 19), 1.76 ],
        [ Date.UTC(1971, 2, 25), 2.62 ],
        [ Date.UTC(1971, 3, 19), 2.41 ],
        [ Date.UTC(1971, 3, 30), 2.05 ],
        [ Date.UTC(1971, 4, 14), 1.7 ],
        [ Date.UTC(1971, 4, 24), 1.1 ],
        [ Date.UTC(1971, 5, 10), 0 ]
      ]
    }, {
      name: 'Winter 2014-2015',
      data: [
        [ Date.UTC(1970, 10, 25), 0 ],
        [ Date.UTC(1970, 11, 6), 0.25 ],
        [ Date.UTC(1970, 11, 20), 1.41 ],
        [ Date.UTC(1970, 11, 25), 1.64 ],
        [ Date.UTC(1971, 0, 4), 1.6 ],
        [ Date.UTC(1971, 0, 17), 2.55 ],
        [ Date.UTC(1971, 0, 24), 2.62 ],
        [ Date.UTC(1971, 1, 4), 2.5 ],
        [ Date.UTC(1971, 1, 14), 2.42 ],
        [ Date.UTC(1971, 2, 6), 2.74 ],
        [ Date.UTC(1971, 2, 14), 2.62 ],
        [ Date.UTC(1971, 2, 24), 2.6 ],
        [ Date.UTC(1971, 3, 2), 2.81 ],
        [ Date.UTC(1971, 3, 12), 2.63 ],
        [ Date.UTC(1971, 3, 28), 2.77 ],
        [ Date.UTC(1971, 4, 5), 2.68 ],
        [ Date.UTC(1971, 4, 10), 2.56 ],
        [ Date.UTC(1971, 4, 15), 2.39 ],
        [ Date.UTC(1971, 4, 20), 2.3 ],
        [ Date.UTC(1971, 5, 5), 2 ],
        [ Date.UTC(1971, 5, 10), 1.85 ],
        [ Date.UTC(1971, 5, 15), 1.49 ],
        [ Date.UTC(1971, 5, 23), 1.08 ]
      ]
    } ]
  });
};
