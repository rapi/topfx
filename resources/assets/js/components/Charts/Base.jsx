import React from 'react'
import {scaleLinear} from 'd3-scale'
import {transition} from 'd3-transition'
import {select} from 'd3-selection'
import {max,min} from 'd3-array'
import {axisBottom,axisLeft} from 'd3-axis'
import 'components/chart.sass'

export default class Base extends React.Component{
  constructor(props){
    super(props);
    this.state={}
    // console.log(props.data);
    this.state.margin= {top: 20, right: 0, bottom: 30, left: 10};
    this.state.width=320-this.state.margin.left-this.state.margin.right;
    this.state.height=150-this.state.margin.top-this.state.margin.bottom;
  }
  //group of root elements
  root=false
  //path of line element
  linePath=false
  lineColor='#fff'
  strokeSize=3
  make_x_gridlines=()=>axisBottom(this.x())
                          .ticks(5)

  // gridlines in y axis function
  make_y_gridlines=()=>axisLeft(this.y())
                          .ticks(5)
  x=()=>scaleLinear()
      .domain([this.props.data[0].time,this.props.data.slice(-1)[0].time])
      .rangeRound([0,this.state.width])

  y=()=>scaleLinear()
    .domain([min(this.props.data,(e)=>e.close),max(this.props.data,(e)=>e.close)])
    .rangeRound([this.state.height,0])
  path=()=>()=>console.log('Please setup path method For base')
  redraw=()=>{}
  setUpGrid=()=>{
    this.gridG=select(this.nodeGroup)
      .append('g')
      .attr('class','grid')
    this.gridG
      .append('g')
      .attr('class','x')
      .attr("transform", "translate(0," + this.state.height + ")")
      .call(this.make_x_gridlines()
            .tickSize(-this.state.height)
            .tickFormat(""))
    this.gridG
      .append('g')
      .attr('class','y')
      .call(this.make_y_gridlines()
            .tickSize(-this.state.width)
            .tickFormat("")
          )
  }
  draw=()=>{
    this.setUpGrid()
  }
  setWidth=()=>{
    this.setState({
      ...this.state,
      width:this.node.parentNode.offsetWidth-this.state.margin.left-this.state.margin.right
    })
  }
  componentDidUpdate=()=>{

    this.setPath()
  }
  componentDidMount=()=>{

    this.setWidth()
    window.addEventListener("resize", ()=>this.setWidth());
    this.draw()
    this.setPath()
  }
  setPath(){
    select(this.nodePath)
    .transition()
    .attr('d',this.path()(this.props.data))
  }
  render(){
      return <svg
          className={"chart "+(this.props.className?this.props.className:'')}
          width = '100%'
          height = {this.state.height+this.state.margin.top+this.state.margin.bottom}
          ref = {(ref)=>this.node=ref}
      >
      <g
        transform={"translate(" + this.state.margin.left + "," + this.state.margin.top + ")"}
        ref = {(ref)=>this.nodeGroup=ref}

        >

        <path
          strokeWidth={this.strokeSize}
          stroke={this.lineColor}
          fill='none'
          ref = {(ref)=>this.nodePath=ref}

         >
        </path>
      </g>
    </svg>;
  }
}
