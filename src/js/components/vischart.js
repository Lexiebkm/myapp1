import React, { useState, useEffect, useRef, useContext } from 'react';
//import Chart from 'chart.js';
import ApexCharts from 'apexcharts'

import {ThemeContext} from "./theme-context";

export default function VisChart(props) {
    const [charttype, setCharttype] = useState("line");
    const chartRef = useRef(null);    
    const theme = useContext(ThemeContext);

    let mychart;
    let chartlib = "apex";
    let chartoptions = null;

    useEffect(() => {
        console.log("charttype :", charttype)

        switch (chartlib) {            
            case "chartjs":
                //const ctx = document.getElementById('myChart');

                /*
                new Chart(chartRef, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                }
                });*/

                /*
                if (mychart !== null) {
                    mychart.destroy()
                }
                mychart = new Chart(chartRef, {
                    type: 'bar',
                    data: {
                        labels: this.chartLabels,
                        datasets: [{
                            label: 'Target',
                            data: this.targetData,
                            borderWidth: 1,
                            bevelWidth: 3,
                            //bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                            //bevelShadowColor: 'rgba(0, 0, 0, 0.5)',
                            backgroundColor: this.targetchartPatterns
                        },{
                            label: 'Realisasi',
                            data: this.realData,
                            borderWidth: 1,
                            bevelWidth: 3,
                            bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                            bevelShadowColor: 'rgba(0, 0, 0, 0.5)',
                            backgroundColor: this.realchartPatterns
                        }]
                    },
            
                    options: {
                        title: {
                            display: true,
                            text: "Grafik Perbandingan Target dan Realisasi"
                        },                
                        scales: {
                            yAxes: [{
                                scaleLabel : {
                                    display: true,
                                    labelString: "Target dan Realisasi",
                                    fontColor: "cornflowerblue" ,
                                    fontStyle: "bold"
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        plugins: {
                            colorschemes: {
                                scheme: 'tableau.Tableau20' //tableau.Tableau10, tableau.MillerStone11, tableau.SuperfishelStone10
                            }
                        },
                        tooplips: {
                            bevelWidth: 3,
                            bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                            bevelShadowColor: 'rgba(0, 0, 0, 0.5)'
            
                        },
                        legend: {
                            position: "right",
                            labels: {
                                fontColor: 'cornflowerblue'
                            }
                        }
                    }
                })
                */
                break;

            case "apex":
            default:
                switch (charttype) {
                    case "bar":
                        chartoptions = {
                            chart: {
                              type: 'bar'
                            },
                            plotOptions: {
                              bar: {
                                horizontal: false
                              }
                            },
                            series: [{
                              data: [{
                                x: 'Front-End',
                                y: 55
                              }, {
                                x: 'Back-End',
                                y: 35
                              }, {
                                x: 'Full-Stack',
                                y: 10
                              }]
                            }],
                            title: {
                                text: "Web Developer Composition",
                                align: 'left',
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize:  '14px',
                                  fontWeight:  'bold',
                                  fontFamily: 'Helvetica, Arial, sans-serif',
                                  color: "rebeccapurple"
                                },
                            }                            
                          };                          
                          break;
                    
                    case "pie":
                        chartoptions = {
                            chart: {
                                type: 'donut' // pie
                            },
                            series: [30, 20, 15, 20, 5, 5, 5],
                            labels: ['Java', 'C#', 'Go', 'PHP', "Python", "Rust", "Javascript"],
                            dataLabels: {
                                enabled: true,
                                style: {
                                    fontSize: '25px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 'bold',
                                },
                            },                            
                            plotOptions: {
                                pie: {
                                    //size: 70,
                                    customScale: 0.7,
                                    donut: {
                                        size: '50%'
                                    }
                                }
                            }                            
                        }
                        break;
                    
                    case "line":
                    default:                    
                        chartoptions = {
                            chart: {
                            type: 'line'
                            },
                            series: [{
                            name: 'sales',
                            data: [15, 20, 25, 30, 30, 37, 40, 60, 75, 85, 88, 120]
                            }],
                            xaxis: {
                            categories: ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"]
                            }
                        }
                        break;
                }
        
                mychart = new ApexCharts(chartRef.current, chartoptions);
                console.log(mychart);
                mychart.render();
                break;            
        }

        return () => {
            if (mychart !== null) {
                mychart.destroy();
            }    
        }
    }, [charttype])

    function handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        if (window.nodeEnv === "development") {
            console.log("event :", event, target, name, value)        
        }
        setCharttype(value);
    }

    return (
        <div className="divblock">
            <div className="form-group row mb-0">
                <label className="col-sm-2 col-form-label-sm ml-3">Chart Type</label>
                <div className="col-sm-2">
                    <select className="form-control col-form-label-sm" 
                        id="charttype" name="charttype"
                        value={charttype}
                        onChange={handleChange}
                        autoFocus
                        required>
                        <option key="1" value="bar">Bar</option>
                        <option key="2" value="line">Line</option>
                        <option key="3" value="pie">Pie</option>
                    </select>
                </div>
                <div ref={chartRef} className="mt-3" style={{width: "800px", height:"200px"}}></div>                                    
            </div>
        </div>
    );
};