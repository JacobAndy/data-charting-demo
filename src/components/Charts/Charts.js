import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import dol from "../../data/DOL_data.tsv";
import rates from "../../data/20180907DOLMeanVsEliteMean.csv";
import "./style/Chart.css";
import axios from "axios";

class Charts extends Component {
  state = { newArray: [] };

  componentDidMount() {
    const svg = d3.select(this.refs.svg),
      path = d3.geoPath();
    Promise.all([
      axios.get("https://d3js.org/us-10m.v1.json"),
      d3.tsv(dol),
      d3.csv(rates)
    ])
      .then(data => {
        console.log(data[0], data[1], data[2]);
        svg
          .append("g")
          .attr("class", "states")
          .selectAll("path")
          .data(
            topojson.feature(data[0].data, data[0].data.objects.states).features
          )
          .enter()
          .append("path")
          // .data(data[1])
          .attr("fill", (d, i) => {
            if (data[1][i].STATE === "Alabama") return "blue";
            return "red";
          })
          .attr("d", path);
        svg
          .append("path")
          .attr("class", "state-borders")
          .attr(
            "d",
            path(
              topojson.mesh(data[0].data, data[0].data.objects.states, function(
                a,
                b
              ) {
                return a !== b;
              })
            )
          );

        //     data[1] === dol resolved
        //      data[2] === rates resolved
        console.log(data);
      })

      .catch(err => console.log(err));
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <svg ref="svg" width="960" height="600">
        <g className="states">{this.state.newArray}</g>
      </svg>
    );
    //
    //<svg width="960" height="600">
    //  <g className="states">{this.state.paths}</g>
    // </svg>
    //
  }
}
export default Charts;
