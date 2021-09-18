import React from "react";
import * as d3 from "d3";
import * as d3ScaleChromatic from "d3-scale-chromatic";

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}

const BigAssWheel = ({
    data, ...props
}) => {

    const padding = {top:20, right:40, bottom:0, left:0},
        w = 500 - padding.left - padding.right,
        h = 500 - padding.top  - padding.bottom,
        r = Math.min(w, h)/2,
        duration = 250;
    // const color = d3.scaleSequential(d3ScaleChromatic.interpolateMagma).domain([0,11]);
    const color = d3.scaleSequential(d3.interpolateMagma).domain([0,11]);
    const path = d3.arc()
            .outerRadius(r - padding.right)
            .innerRadius((r - padding.right) / 2);
    let rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [];

    function calcTranslate(data, move = 4) {
      const moveAngle = data.startAngle + ((data.endAngle - data.startAngle) / 2);
      return `translate(${- move * Math.cos(moveAngle + Math.PI / 2)}, ${- move * Math.sin(moveAngle + Math.PI / 2)})`;
    }

    // const bigData = [
    //     {year: 1980, efficiency: 24.3, sales: 8949000},
    //     {year: 1985, efficiency: 27.6, sales: 10979000},
    //     {year: 1990, efficiency: 28, sales: 9303000},
    //     {year: 1991, efficiency: 28.4, sales: 8185000},
    //     {year: 1992, efficiency: 27.9, sales: 8213000},
    //     {year: 1993, efficiency: 28.4, sales: 8518000},
    //     {year: 1994, efficiency: 28.3, sales: 8991000},
    //     {year: 1995, efficiency: 28.6, sales: 8620000},
    //     {year: 1996, efficiency: 28.5, sales: 8479000},
    //     {year: 1997, efficiency: 28.7, sales: 8217000},
    //     {year: 1998, efficiency: 28.8, sales: 8085000},
    //     {year: 1999, efficiency: 28.3, sales: 8638000},
    //     {year: 2000, efficiency: 28.5, sales: 8778000},
    //     {year: 2001, efficiency: 28.8, sales: 8352000},
    //     {year: 2002, efficiency: 29, sales: 8042000},
    //     {year: 2003, efficiency: 29.5, sales: 7556000},
    //     {year: 2004, efficiency: 29.5, sales: 7483000},
    //     {year: 2005, efficiency: 30.3, sales: 7660000},
    //     {year: 2006, efficiency: 30.1, sales: 7762000},
    //     {year: 2007, efficiency: 31.2, sales: 7562000},
    //     {year: 2008, efficiency: 31.5, sales: 6769000},
    //     {year: 2009, efficiency: 32.9, sales: 5402000},
    //     {year: 2010, efficiency: 33.9, sales: 5636000},
    //     {year: 2011, efficiency: 33.1, sales: 6093000},
    //     {year: 2012, efficiency: 35.3, sales: 7245000},
    //     {year: 2013, efficiency: 36.4, sales: 7586000},
    //     {year: 2014, efficiency: 36.5, sales: 7708000},
    //     {year: 2015, efficiency: 37.2, sales: 7517000},
    //     {year: 2016, efficiency: 37.7, sales: 6873000},
    //     {year: 2017, efficiency: 39.4, sales: 6081000},
    //   ];

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
        arcs.append("text").attr("transform", function(d){
            d.innerRadius = 0;
            d.outerRadius = r;
            console.log(d);
            d.angle = (d.startAngle + d.endAngle)/2;
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
        })
        .attr("text-anchor", "end")
        .text( function(d, i) {
            return data[i].label;
        });
        container.on("click", spin);
        function spin(d){
            
            container.on("click", null);
            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            // if(oldpick.indexOf(picked) !== -1){
            //     d3.select(this).call(spin);
            //     return;
            // } else {
            //     oldpick.push(picked);
            // }
          console.log(picked);
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    // //mark question as seen
                    // d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                    //     .attr("fill", "#111");
                    // //populate question
                    // d3.select("#question h1")
                    //     .text(data[picked].question);
                    // oldrotation = rotation;
              
                    // /* Get the result value from object "data" */
                    // console.log(data[picked].value)
              
                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                });
        }
        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style("fill", "white")
            .style("cursor", "pointer");
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
            return "rotate(" + i(t) + ")";
          };
        }
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
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
      <svg
        ref={ref}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    );
};

export default BigAssWheel;