import React, { Component } from "react";
import * as d3 from "d3";
import thisData from "../../data/20180907DOLMeanVsEliteMean.csv";
import "./style/Chart.css";

class BarChart extends Component {
  state = {
    currentState: "AK"
  };

  componentDidMount() {
    // if (!this.state.currentState.length) {
    this.allStates();
    // } else {
    //   this.oneState(this.state.currentState);
    // }
  }
  oneState = state => {
    var svg = d3.select(this.refs.bar),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(thisData)
      .then(data => {
        console.log(data);
        const index = data.findIndex(e => e.Abbreviation === state);
        x.domain(
          [data[index]["Elite Calculated Mean"], data[index]["US DOL Mean"]]
          // data[index].
          //   data.map(function(d) {
          //     return d.Abbreviation;
          //   })
        );
        y.domain([
          0,
          d3.max(data, function(d) {
            console.log(+d["Elite Calculated Mean"].trim().slice(1));
            return +d["Elite Calculated Mean"].trim().slice(1);
          })
        ]);

        g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

        g.selectAll(".bar")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", function(d) {
            return x(data[index]["US DOL Mean"]);
          })
          .attr("y", function(d) {
            return y(+d["Elite Calculated Mean"].trim().slice(1));
          })
          .attr("width", x.bandwidth())
          .attr("height", function(d) {
            return height - y(+d["Elite Calculated Mean"].trim().slice(1));
          });
      })
      .catch(error => console.log(error));
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  allStates = () => {
    var svg = d3.select(this.refs.bar),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(thisData)
      .then(data => {
        x.domain(
          data.map(function(d) {
            return d.Abbreviation;
          })
        );
        y.domain([
          0,
          d3.max(data, function(d) {
            console.log(+d["Elite Calculated Mean"].trim().slice(1));
            return +d["Elite Calculated Mean"].trim().slice(1);
          })
        ]);

        g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Frequency");

        g.selectAll(".bar")
          .data(data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", function(d) {
            return x(d.Abbreviation);
          })
          .attr("y", function(d) {
            return y(+d["Elite Calculated Mean"].trim().slice(1));
          })
          .attr("width", x.bandwidth())
          .attr("height", function(d) {
            return height - y(+d["Elite Calculated Mean"].trim().slice(1));
          });
      })
      .catch(error => console.log(error));
  };
  render() {
    return <svg ref="bar" width="960" height="500" />;
  }
}
export default BarChart;
