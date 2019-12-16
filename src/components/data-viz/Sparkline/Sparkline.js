import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
//import styles from './Sparkline.module.scss'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  sparkline: {
    strokeWidth: '1px',
    stroke: '#5c737f',
    fill: 'none',
  },

  sparkcircle: {
    fill: '#DB812C'
  }
    
});

const Sparkline = (props) => {
  const spakeStyles = {
    // stroke: '#5c737f',
    // strokeWidth: 1,
    // fill: 'none',
  }
    let data=[[0,0]];
    let highlightIndex=-1;
    if(props.data.length > 0) {
	data=props.data
	highlightIndex=props.highlightIndex || props.data.length-1;
    }
    
    
    console.debug(props);
  const elemRef = useRef(null)
    const classes=useStyles();
    
  useEffect(() => {

		    
      let width = 70
    let height = 20
    let x = d3.scaleLinear().range([0, width - 3])
    let y = d3.scaleLinear().range([height - 4, 0])
    let line = d3.line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return x(d[0])
      })
      .y(function (d) {
        return y(d[1])
      })

    x.domain(d3.extent(data, function (d) {
      return +d[0]
    }))
    y.domain(d3.extent(data, function (d) {
      return +d[1]
    }))

    d3.select(elemRef.current).selectAll('*').remove()

    let svg = d3.select(elemRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('height', (height + 2))
      .append('g')
      .attr('transform', 'translate(0, 2)')
    svg.append('path')
      .datum(data)
      .attr('class', classes.sparkline)
      .attr('d', line)

      console.debug(data);
      if(highlightIndex >= 0) {
	  svg.append('circle')
	      .attr('class', classes.sparkcircle)
	      .attr('cx', x(data[highlightIndex][0]))
	      .attr('cy', y(data[highlightIndex][1]))
	      .attr('r', 2.3)
      }
  })
    
  return (
    <div  ref={elemRef}></div>
  )
}

export default Sparkline