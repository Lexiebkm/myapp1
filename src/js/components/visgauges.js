import React, { useState, useEffect, useRef, useContext } from 'react';
import {LinearGauge, RadialGauge} from "canvas-gauges"

import {ThemeContext} from "./theme-context";

export default function VisGauge(props) {
    const [gaugetype, setGaugetype] = useState("linear");
    const gaugeRef = useRef(null);
    let mygauge;

    const theme = useContext(ThemeContext);
    
    useEffect(() => {
        console.log(gaugeRef.current);

        if (gaugetype === "linear") {
            mygauge = new LinearGauge({
                renderTo: gaugeRef.current,
                width: 160,
                height: 600,
                borderRadius: 20,
                borders: 0,
                barStrokeWidth: 20,
                minorTicks: 10,
                majorTicks: [0,10,20,30,40,50,60,70,80,90,100],
                value: 22.3,
                units: "°C",
                colorValueBoxShadow: false,
                colorPlate: "dodgerblue",//darkgoldenrod, burlywood , #808080 "#f0fff0",//honeydew, #fafad2 = lightgoldenrodyellow, #222 = default,
                colorMajorTicks: '#f5f5f5',
                colorMinorTicks: '#ddd',
                colorTitle: '#fff',
                colorUnits: '#ccc',
                colorNumbers: 'white',
                //colorNumbers: 'black',
                colorNeedle: 'rgba(240, 128, 128, 1)',
                colorNeedleEnd: 'rgba(255, 160, 122, .9)',
                valueBox: true,
                animationTarget: "needle",
                animationRule: 'cycle',
                animationDuration: 1000,
                animateOnInit: true,
                borders: false,
                borderShadowWidth: 0

            });
        } else {
            mygauge = new RadialGauge({
                renderTo: gaugeRef.current,
                width: 400,
                height: 400,
                units: 'Km/h',
                title: false,
                value: 85,
                minValue: 0,
                maxValue: 220,
                majorTicks: [
                    '0','20','40','60','80','100','120','140','160','180','200','220'
                ],
                minorTicks: 2,
                strokeTicks: false,
                /*highlights: [
                    { from: 0, to: 50, color: 'rgba(0,255,0,.15)' },
                    { from: 50, to: 100, color: 'rgba(255,255,0,.15)' },
                    { from: 100, to: 150, color: 'rgba(255,30,0,.25)' },
                    { from: 150, to: 200, color: 'rgba(255,0,225,.25)' },
                    { from: 200, to: 220, color: 'rgba(0,0,255,.25)' }
                ],*/
                highlights: [
                    { from: 0, to: 50, color: '#ff0000' },
                    { from: 50, to: 100, color: '#c0c0c0' },
                    { from: 100, to: 150, color: '#ffff00' },
                    { from: 150, to: 200, color: '#008000' },
                    { from: 200, to: 220, color: '#0000ff' }
                ],
                colorPlate: "dodgerblue",//darkgoldenrod, burlywood , #808080 "#f0fff0",//honeydew, #fafad2 = lightgoldenrodyellow, #222 = default,
                colorMajorTicks: '#f5f5f5',
                colorMinorTicks: '#ddd',
                colorTitle: '#fff',
                colorUnits: '#ccc',
                colorNumbers: 'white',
                //colorNumbers: 'black',
                colorNeedle: 'rgba(240, 128, 128, 1)',
                colorNeedleEnd: 'rgba(255, 160, 122, .9)',
                valueBox: true,
                animationTarget: "needle",
                animationRule: 'cycle',
                animationDuration: 1000,
                animateOnInit: true,
                borders: false,
                borderShadowWidth: 0
                /*
                colorPlate: '#222',
                colorMajorTicks: '#f5f5f5',
                colorMinorTicks: '#ddd',
                colorTitle: '#fff',
                colorUnits: '#ccc',
                colorNumbers: '#eee',
                colorNeedle: 'rgba(240, 128, 128, 1)',
                colorNeedleEnd: 'rgba(255, 160, 122, .9)',
                valueBox: true,
                animationRule: 'bounce',
                animationDuration: 500
                */
            });
        }
  
        mygauge.draw();
    }, [gaugetype])


    function handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        if (window.nodeEnv === "development") {
            console.log("event :", event, target, name, value)        
        }
        setGaugetype(value);
    }

    return (
        <div className="divblock">
            <div className="form-check form-check-inline mt-3 mb-3">
                <input type="radio" id="lineargauge" name="gaugetype" className="form-check-input" 
                    value="linear"
                    checked={gaugetype === "linear"}
                    onChange={handleChange}                                                        
                />
                <label className="form-check-label" 
                    title="Linear gauge"
                    data-toggle="tooltip" data-placement="right"
                    htmlFor="lineargauge"
                >Linear</label>

            </div>
            <div className="form-check form-check-inline">
                <input type="radio" id="radialgauge" name="gaugetype" 
                    className="form-check-input" 
                    value="radial"
                    checked={gaugetype === "radial"}
                    onChange={handleChange}                                                        
                />
                <label className="form-check-label" htmlFor="radialgauge">Radial</label>

            </div>

            <div className="">
                <canvas ref={gaugeRef} className="pl-10"></canvas>
            </div>
        </div>
    );
};