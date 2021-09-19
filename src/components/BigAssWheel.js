import React, { useState } from 'react';
import * as d3 from "d3";
import * as d3ScaleChromatic from "d3-scale-chromatic";

import RestaurantCard from "./RestaurantCard";

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}

const BigAssWheel = ({
    data, setAngle, ...props
}) => {
    const [restaurant, setRestaurant] = useState("");

    const padding = {top:0, right:40, bottom:0, left:0},
        w = 500 - padding.left - padding.right,
        h = 500 - padding.top  - padding.bottom,
        r = Math.min(w, h)/2,
        duration = 250;
    // const color = d3.scaleSequential(d3ScaleChromatic.interpolateMagma).domain([0,11]);
    const color = d3.scaleSequential(d3.interpolateMagma).domain([0,11]);
    const path = d3.arc()
            .outerRadius(r - padding.right)
            .innerRadius((r - padding.right) * 0.3);
    let rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [];

    props.spinning = false;

    function calcTranslate(data, move = 4) {
      const moveAngle = data.startAngle + ((data.endAngle - data.startAngle) / 2);
      return `translate(${- move * Math.cos(moveAngle + Math.PI / 2)}, ${- move * Math.sin(moveAngle + Math.PI / 2)})`;
    }
    
    function textColor(d) {
        return d3.hsl(color(d)).l > 0.5 ? "#000" : "#fff";
    }

    const ref = useD3(
      (svg) => {
        // const height = 500;
        // const width = 500;
        // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  
        // const x = d3
        //   .scaleBand()
        //   .domain(bigData.map((d) => d.year))
        //   .rangeRound([margin.left, width - margin.right])
        //   .padding(0.1);
  
        // const y1 = d3
        //   .scaleLinear()
        //   .domain([0, d3.max(bigData, (d) => d.sales)])
        //   .rangeRound([height - margin.bottom, margin.top]);
  
        // const xAxis = (g) =>
        //   g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        //     d3
        //       .axisBottom(x)
        //       .tickValues(
        //         d3
        //           .ticks(...d3.extent(x.domain()), width / 40)
        //           .filter((v) => x(v) !== undefined)
        //       )
        //       .tickSizeOuter(0)
        //   );
  
        // const y1Axis = (g) =>
        //   g
        //     .attr("transform", `translate(${margin.left},0)`)
        //     .style("color", "steelblue")
        //     .call(d3.axisLeft(y1).ticks(null, "s"))
        //     .call((g) => g.select(".domain").remove())
        //     .call((g) =>
        //       g
        //         .append("text")
        //         .attr("x", -margin.left)
        //         .attr("y", 10)
        //         .attr("fill", "currentColor")
        //         .attr("text-anchor", "start")
        //         .text(bigData.y1)
        //     );
  
        // svg.select(".x-axis").call(xAxis);
        // svg.select(".y-axis").call(y1Axis);
  
        // svg
        //   .select(".plot-area")
        //   .attr("fill", "steelblue")
        //   .selectAll(".bar")
        //   .data(bigData)
        //   .join("rect")
        //   .attr("class", "bar")
        //   .attr("x", (d) => x(d.year))
        //   .attr("width", x.bandwidth())
        //   .attr("y", (d) => y1(d.sales))
        //   .attr("height", (d) => y1(0) - y1(d.sales));

        // svg.select(".plot-area")
        //     .data(data)
        //     .attr("width",  w + padding.left + padding.right)
        //     .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
        
        var pie = d3.pie().sort(null).value(function(d){return 1;});
        // select paths, use arc generator to draw
        // var arcs = svg.selectAll("g.slice")
        var arcs = vis.selectAll("g.slice")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "slice")
            .style('cursor', 'pointer')
            .on('mouseover', (event, v) => {
                d3.select(event.currentTarget)
                .transition()
                .duration(duration)
                .attr('transform', calcTranslate(v, 6));
                d3.select(event.currentTarget).select('path')
                .transition()
                .duration(duration)
                .attr('stroke', 'rgba(100, 100, 100, 0.2)')
                .attr('stroke-width', 4);
                d3.select('.card-back text').text(v.data.type);
            })
            .on('mouseout', (event, v) => {
                d3.select(event.currentTarget)
                .transition()
                .duration(duration)
                .attr('transform', 'translate(0, 0)');
                d3.select(event.currentTarget).select('path')
                .transition()
                .duration(duration)
                .attr('stroke', 'white')
                .attr('stroke-width', 1);
        });
        arcs.append("path")
            .attr('d', path)
            .attr("fill", function(d, i){
              return color(i);
            })
            .attr('stroke', 'white');
            // .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text")
        .attr("transform", function(d){
            d.innerRadius = (r - padding.right)*0.5;
            d.outerRadius = (r - padding.right)*0.9;
            d.angle = (d.startAngle + d.endAngle)/2;
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
        })
        .attr("text-anchor", "end")
        .text( function(d, i) {
            return data[i].name;
        })
        .style("fill", (d, i) => {
            return textColor(i);
        });

        container.on("click", spin);
        function spin(d){
            if (props.spinning) {
              return;
            } else {
              props.spinning = true;
            }
            //all slices have been seen, all done
            // console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                // console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 720);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            // if(oldpick.indexOf(picked) !== -1){
            //     d3.select(this).call(spin);
            //     return;
            // } else {
            //     oldpick.push(picked);
            // }
            // rotation += 90 - Math.round(ps/2);
            console.log(rotation);
            rotation -= 0.5*ps // for artificial offset
            console.log(rotation);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .on("end", function(){
                    // //mark question as seen
                    // d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                    //     .attr("fill", "#111");
                    // //populate question
                    // d3.select("#question h1")
                    //     .text(data[picked].question);
                    oldrotation = rotation;
              
                    // /* Get the result value from object "data" */
                    // console.log(data[picked].value)
              
                    /* Comment the below line for restrict spin to sngle time */
                    // container.on("click", spin);
                    props.spinning = false;
                });
        }
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.05) + ",0L0," + (r*.15) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        // container.append("circle")
        //     .attr("cx", 0)
        //     .attr("cy", 0)
        //     .attr("r", r*0.3)
        //     .style("fill", "white")
        //     .style("cursor", "pointer");
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style("font-weight", "bold")
            .style("font-size", "30px");
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            setAngle(i(t));
            return "rotate(" + i(t) + ")";
          };
        }
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }
      },
      [data.length]
    );
  
    return (
      <>
        <svg
          ref={ref}
          style={{
            height: h+"px",
            width: w+"px",
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
        <RestaurantCard name={restaurant}/>
      </>
    );
};

export default BigAssWheel;