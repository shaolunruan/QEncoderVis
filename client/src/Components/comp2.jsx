
import React, { useState, useEffect } from 'react';
import { Checkbox } from "antd";
import * as d3 from 'd3';
import Module_draw_2dplot from "../Functions/module_draw_2dplot";
import PropTypes from 'prop-types';




function Comp2(props) {


    // dataset
    let dataset = props.dataset
    let boundary=props.boundary


    let onDatasetClick = props.onDatasetClick
    const handleDatasetClick = (e) => {
        onDatasetClick(e);
    };



    let {comp2_width, comp2_height, comp2_left, comp2_top, vis_width} = props
    let [class_color, color_comp2_bg] = props.colors
    let [color_class1, color_class2] = class_color



    let comp2_paddingLeft = vis_width*0.01
    let comp2_paddingTop = vis_width*0.01
    let comp2_dataOption_distanceX = vis_width*0.059
    let comp2_dataOption_distanceY = vis_width*0.06


    let default_circuit = props.default_circuit
    const [selectedDataOption, setSelectedDataOption] = useState(default_circuit);
    // let {showBoundary, setShowBoundary} = useState('visible')


    function onChange(e){

        if(e.target.checked){
            d3.selectAll('.boundary-line')
                .style('visibility', 'hidden')
        }
        else{
            d3.selectAll('.boundary-line')
                .style('visibility', 'visible')
        }

    }


    //////////////////////////////////////////////

    // mount 的时候渲染一次
    useEffect(() => {

        // console.log('comp2 mount')
        // console


    }, [])




    return (

        <div  className={'component'}
              style={{width: comp2_width, height:comp2_height, left:comp2_left, top: comp2_top}}>
            <span className="comp_title">Data Selector</span>

            {/*svg for one data selector*/}
            <svg id="comp1_data_selector" width={comp2_width} height={comp2_height} style={{ marginTop: '10px' }}>
                <rect x={0} y={0} width={comp2_width} height={comp2_height} fill={color_comp2_bg} rx="10" ry="10" />

                <g transform={`translate(${comp2_paddingLeft}, ${comp2_paddingTop})`}>
                    {/* Iteration to generate 6 option datasets in a 2x3 grid */}
                    {Array.from({ length: 6 }, (_, i) => {

                        return (
                            <g transform={`translate(${i % 3 * comp2_dataOption_distanceX+4}, ${Math.floor(i / 3) * comp2_dataOption_distanceY+4})`}
                               className={default_circuit.split('_')[1][0] == `${i}` ? 'data-option-selected' : 'data-option-unselected'}
                               key={i}
                               id={`circuit_${i}`}
                               onClick={(e) => {
                                   setSelectedDataOption(e.currentTarget.id);
                                   handleDatasetClick(e.currentTarget.id);
                               }}  // Set the selected module on click
                            >
                                <image
                                    href={`/thumbnails/circuit_${i}.png`}
                                    x={0}
                                    y={0}
                                    width={comp2_dataOption_distanceX-12}
                                    height={comp2_dataOption_distanceY-12}
                                />
                                <rect
                                    x={0}
                                    y={0}
                                    width={comp2_dataOption_distanceX-12}
                                    height={comp2_dataOption_distanceY-12}
                                    strokeWidth={2.3} // Border width
                                    className={`data-option-border`}
                                    rx={'2px'}
                                    ry={'2px'}
                                />
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>



    );
}

export default Comp2