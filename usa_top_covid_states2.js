
			var w = 1200;
			var h = 500;
			var padding = 100;
             var bool = false;

			var dataset, nestedData, xScale, yScale, xAxis, yAxis;  

			var newdata = function(d) {
				return {
					state: d.state,
					Month: d.month,
					Confirmed_cases: parseFloat(d.Confirmed_cases),
					death: parseFloat(d.death),
					diabetes: parseFloat(d.diabetesper),
					heartdisease: parseFloat(d.heartdiseaseper),
					hypertension: parseFloat(d.hypertensionper)					

				};
			}

      var svg;
     
       var Confirmed_cases = d3.line()
        .x( function(d){ return xScale(d.Month) } )
        .y( function(d){ return yScale(d.Confirmed_cases) } );
    
      var stateScale = d3.scaleOrdinal(d3.states);

      var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
	


		
			d3.csv("USA_top_covid_states.csv", newdata, function(data) {

        nestedData = d3.nest().key( function(d) { return d.state } )
						      .entries(data);

		
        dataset = data;

			
				xScale = d3.scaleLinear()
							   .domain(d3.extent(dataset, function(d) { return d.Month; }))
							   .range([padding, w - padding]);

				yScale = d3.scaleLinear()
							   .domain(d3.extent(dataset, function(d) { return d.Confirmed_cases; }))
							   .range([h - padding, padding]);


			
				xAxis = d3.axisBottom().scale(xScale);

			
				yAxis = d3.axisLeft().scale(yScale);

         Confirmed_cases = d3.line()
					.x( function(d){ return xScale(d.Month) } )
					.y( function(d){ return yScale(d.Confirmed_cases) } );

          death = d3.line()
 					.x( function(d){ return xScale(d.Month) } )
 					.y( function(d){ return yScale(d.death) } );

          diabetes = d3.line()
 					.x( function(d){ return xScale(d.Month) } )
 					.y( function(d){ return yScale(d.diabetes) } );
					
		heartdisease = d3.line()
 					.x( function(d){ return xScale(d.Month) } )
 					.y( function(d){ return yScale(d.heartdisease) } );
					
					
		hypertensionline = d3.line()
 					.x( function(d){ return xScale(d.Month) } )
 					.y( function(d){ return yScale(d.hypertension) } );

	
		  
				 svg = d3.select("#graph")
							.append("svg")
							.attr("width", w)
							.attr("height", h);

		  

       svg.selectAll("circle")
                       				   .data(data)
                       				   .enter()
                       				   .append("circle")
                                       .attr("fill", function(d) { return colorScale( d.state ); } )
                       				   .attr("cx", function(d) {
                       				   		return xScale(d.Month);
                       				   })
                       				   .attr("cy", function(d) {
                       				   		return yScale(d.Confirmed_cases);
                       				   })
                       				   .attr("r", 3)
                                         .on("mouseover", function(d) {
																	 d3.select(this).attr("r", 5);

                        					
                        					var xPosition = parseFloat(d3.select(this).attr("cx")) +250 ;
                        					var yPosition = parseFloat(d3.select(this).attr("cy")) +250;

                        				
                        					d3.select("#tooltip")
                        						.style("left", xPosition + "px")
                        						.style("top", yPosition + "px")
                        						.select("#value")
                        						.html(" State: "+d.state +"<br/>"+
												      "Confirmed cases:"+ d.Confirmed_cases +"<br/>" +
													  "Deaths:"+ d.death +"<br/>"  +
													  "Diabetes:"+ d.diabetes+ "%"+ "<br/>"  +
													  "heartdisease: "+ d.heartdisease+ "%"+ "<br/>"+
													  "hypertension: "+ d.hypertension+ "%");
                        					
                        					d3.select("#tooltip").classed("hidden", false);

                        			   })
                        			   .on("mouseout", function() {
																  d3.select(this).attr("r", 3);
                        				
                        					d3.select("#tooltip")
                                  .classed("hidden", true);
                        			   });

	svg.selectAll("path")
						 							 .data(nestedData)
						 							 .enter()
						 							 .append("path")

						 							 .attr("class", "line")

						 							 .style("stroke", function(d) { return colorScale( d.key ); } )
						 							 .attr("d", function(d) { return Confirmed_cases(d.values) } )
						 							 .on("mouseover", function(d){
						 								 d3.select(this)
						 								 .style("stroke-width", "6px");

														 var circleUnderMouse = this;
															 d3.selectAll('path').transition().style('opacity',function () {
																	 return (this === circleUnderMouse) ? 1.0 : 0.2;
															 })
															 d3.selectAll('circle').transition().style('opacity',0.2);
						 							 })
						 							 .on("mouseout", function(d){
						 								 d3.select(this)
						 								 .style("stroke-width", "2px");

														 d3.selectAll('path').transition().style('opacity',1.0);
														  d3.selectAll('circle').transition().style('opacity',1.0);
						 							 });
													 

         
    				var legend = svg.append("g")
    					.attr("class", "legend")
    					.attr("transform", "translate(" + (w - 50) +  "," + (padding) + ")");
    				legend.append("rect")
    					.attr("class" , "legend-rect" )
    					.attr("width" , "45")
    					.attr("height", "135");
    				var legendgroups = legend.selectAll("g")
    					.data(nestedData)
    					.enter()
    					.append("g")
    					.attr("transform", function(d,i) {
    						return "translate(" + 10 + "," + (i+1) * 11 + ")" ;
    					});
    				legendgroups.append("text")
    					.text(function (d) { return d.key })
    					.attr("x", 10 )
    					.attr("y", 8 );
    				legendgroups.append("rect")
    					.attr("fill", function(d) { return colorScale( d.key ); } )
    					.attr("height", 8)
    					.attr("width", 8);

  
	 const makeAnnotations = d3.annotation()
          .type(d3.annotationLabel)
          .annotations(annotations)

        d3.select("svg")
          .append("g")
          .attr("class", "annotation-group")
          .call(makeAnnotations);

                   svg.append("g")
	   				.attr("class", "x axis")
	   				.attr("transform", "translate(0," + (h - padding) + ")")
	   				.call(xAxis);

	   			
	   			svg.append("g")
	   				.attr("class", "y axis")
	   				.attr("transform", "translate(" + padding + ",0)")
	   				.call(yAxis);

						
           						svg.append("text")
           						.attr("class", "xAxis title")
           						.attr("text-anchor", "end")
           						.attr("x", w - 600)
               				.attr("y", h - 15)
               				.text("Month Number");


			});


      


      var total_cases = function(){
     
        xScale.domain(d3.extent(dataset, function(d) { return d.Month; }));
  			yScale.domain(d3.extent(dataset, function(d) { return d.Confirmed_cases; }));



        svg.selectAll("circle")
               .data(dataset)
               .transition()
              
               .attr("cx", function(d) {
                  return xScale(d.Month);
               })
               .attr("cy", function(d) {
                  return yScale(d.Confirmed_cases);
               });

							 svg.selectAll("circle").on("mouseover", function(d) {
										d3.select(this).attr("r", 5);

									
									 var xPosition = parseFloat(d3.select(this).attr("cx")) +140 ;
									 var yPosition = parseFloat(d3.select(this).attr("cy")) +50;

									
									 d3.select("#tooltip")
										 .style("left", xPosition + "px")
										 .style("top", yPosition + "px")
										 .select("#value")
										 .html(" State: "+d.state +"<br/>"+
												      "Confirmed cases:"+ d.Confirmed_cases +"<br/>" +
													  "Deaths:"+ d.death +"<br/>"  +
													  "Diabetes:"+ d.diabetes+ "%"+ "<br/>"  +
													  "heartdisease: "+ d.heartdisease+ "%"+ "<br/>"+
													  "hypertension: "+ d.hypertension+ "%");

									
									 d3.select("#tooltip").classed("hidden", false);

									})
									.on("mouseout", function() {
									 d3.select(this).attr("r", 3);
									
									 d3.select("#tooltip")
									 .classed("hidden", true);
									});
        svg.selectAll("path")
                     .data(nestedData)
                     .transition()
                    
                     .style("stroke", function(d) { return colorScale( d.key ); } )
                     .attr("d", function(d) { return Confirmed_cases(d.values) } );

                    
                    svg.select(".x.axis")
                        .transition()
                      
                      .call(xAxis);

                  
                    svg.select(".y.axis")
                        .transition()
                       
                      .call(yAxis);
					 
					  
      };
	  

		
      var total_deaths = function(){
     
        xScale.domain(d3.extent(dataset, function(d) { return d.Month; }));
        yScale.domain(d3.extent(dataset, function(d) { return d.death; }));
        svg.selectAll("circle")
               .data(dataset)
               .transition()
             
               .attr("cx", function(d) {
                  return xScale(d.Month);
               })
               .attr("cy", function(d) {
                  return yScale(d.death);
               });
					 svg.selectAll("circle").on("mouseover", function(d) {
								 d3.select(this).attr("r", 5);

							
								var xPosition = parseFloat(d3.select(this).attr("cx")) +140 ;
								var yPosition = parseFloat(d3.select(this).attr("cy")) +50;

								
								d3.select("#tooltip")
									.style("left", xPosition + "px")
									.style("top", yPosition + "px")
									.select("#value")
									.html(" State: "+d.state +"<br/>"+
												      "Confirmed cases:"+ d.Confirmed_cases +"<br/>" +
													  "Deaths:"+ d.death +"<br/>"  +
													  "Diabetes:"+ d.diabetes+ "%"+ "<br/>"  +
													  "heartdisease: "+ d.heartdisease+ "%"+ "<br/>"+
													  "hypertension: "+ d.hypertension+ "%");

								
								d3.select("#tooltip").classed("hidden", false);

							 })
							 .on("mouseout", function() {
								d3.select(this).attr("r", 3);
							
								d3.select("#tooltip")
								.classed("hidden", true);
							 });

        svg.selectAll("path")
                     .data(nestedData)
                     .transition()
                   
                     .style("stroke", function(d) { return colorScale( d.key ); } )
                     .attr("d", function(d) { return death(d.values) } );

                   
                    svg.select(".x.axis")
                        .transition()
                       
                      .call(xAxis);

                  
                    svg.select(".y.axis")
                        .transition()
                    
                      .call(yAxis);
      };

      var death_Diabetes = function(){
      
        xScale.domain(d3.extent(dataset, function(d) { return d.Month; }));
        yScale.domain(d3.extent(dataset, function(d) { return d.diabetes; }));
        svg.selectAll("circle")
               .data(dataset)
               .transition()
             
               .attr("cx", function(d) {
                  return xScale(d.Month);
               })
               .attr("cy", function(d) {
                  return yScale(d.diabetes);
               })
              ;
							svg.selectAll("circle").on("mouseover", function(d) {
										d3.select(this).attr("r", 5);

									
									 var xPosition = parseFloat(d3.select(this).attr("cx")) +140 ;
									 var yPosition = parseFloat(d3.select(this).attr("cy")) +50;

									
									 d3.select("#tooltip")
										 .style("left", xPosition + "px")
										 .style("top", yPosition + "px")
										 .select("#value")
										 .html(" State: "+d.state +"<br/>"+
												      "Confirmed cases:"+ d.Confirmed_cases +"<br/>" +
													  "Deaths:"+ d.death +"<br/>"  +
													  "Diabetes:"+ d.diabetes+ "%"+ "<br/>"  +
													  "heartdisease: "+ d.heartdisease+ "%"+ "<br/>"+
													  "hypertension: "+ d.hypertension+ "%");

									
									 d3.select("#tooltip").classed("hidden", false);

									})
									.on("mouseout", function() {
									 d3.select(this).attr("r", 3);
								
									 d3.select("#tooltip")
									 .classed("hidden", true);
									});
        svg.selectAll("path")
                     .data(nestedData)
                     .transition()
                   
                     .style("stroke", function(d) { return colorScale( d.key ); } )
                     .attr("d", function(d) { return diabetes(d.values) } );

                
                    svg.select(".x.axis")
                        .transition()
                     
                      .call(xAxis);

                   
                    svg.select(".y.axis")
                        .transition()
                      
                      .call(yAxis);
      };

   var death_heartdisease = function(){
      
        xScale.domain(d3.extent(dataset, function(d) { return d.Month; }));
  			yScale.domain(d3.extent(dataset, function(d) { return d.heartdisease; }));



        svg.selectAll("circle")
               .data(dataset)
               .transition()
           
               .attr("cx", function(d) {
                  return xScale(d.Month);
               })
               .attr("cy", function(d) {
                  return yScale(d.heartdisease);
               });

							 svg.selectAll("circle").on("mouseover", function(d) {
										d3.select(this).attr("r", 5);

									
									 var xPosition = parseFloat(d3.select(this).attr("cx")) +140 ;
									 var yPosition = parseFloat(d3.select(this).attr("cy")) +50;

									
									 d3.select("#tooltip")
										 .style("left", xPosition + "px")
										 .style("top", yPosition + "px")
										 .select("#value")
										 .html(" State: "+d.state +"<br/>"+
												      "Confirmed cases:"+ d.Confirmed_cases +"<br/>" +
													  "Deaths:"+ d.death +"<br/>"  +
													  "Diabetes:"+ d.diabetes+ "%"+ "<br/>"  +
													  "heartdisease: "+ d.heartdisease+ "%"+ "<br/>"+
													  "hypertension: "+ d.hypertension+ "%");

								
									 d3.select("#tooltip").classed("hidden", false);

									})
									.on("mouseout", function() {
									 d3.select(this).attr("r", 3);
									
									 d3.select("#tooltip")
									 .classed("hidden", true);
									});
        svg.selectAll("path")
                     .data(nestedData)
                     .transition()
                    
                     .style("stroke", function(d) { return colorScale( d.key ); } )
                     .attr("d", function(d) { return heartdisease(d.values) } );

                 
                    svg.select(".x.axis")
                        .transition()
                     
                      .call(xAxis);

                  
                    svg.select(".y.axis")
                        .transition()
                       
                      .call(yAxis);
      };
	  
	  
	     var death_hypertension = function(){
       
        xScale.domain(d3.extent(dataset, function(d) { return d.Month; }));
  			yScale.domain(d3.extent(dataset, function(d) { return d.hypertension; }));



        svg.selectAll("circle")
               .data(dataset)
               .transition()
             
               .attr("cx", function(d) {
                  return xScale(d.Month);
               })
               .attr("cy", function(d) {
                  return yScale(d.hypertension);
               });

							 svg.selectAll("circle").on("mouseover", function(d) {
										d3.select(this).attr("r", 5);

									
									 var xPosition = parseFloat(d3.select(this).attr("cx")) +140 ;
									 var yPosition = parseFloat(d3.select(this).attr("cy")) +50;

									
									 d3.select("#tooltip")
										 .style("left", xPosition + "px")
										 .style("top", yPosition + "px")
										 .select("#value")
										 .html(" State: "+d.state +"<br/>"+
												      "Confirmed cases:"+ d.Confirmed_cases +"<br/>" +
													  "Deaths:"+ d.death +"<br/>"  +
													  "Diabetes:"+ d.diabetes+ "%"+ "<br/>"  +
													  "heartdisease: "+ d.heartdisease+ "%"+ "<br/>"+
													  "hypertension: "+ d.hypertension+ "%");

									
									 d3.select("#tooltip").classed("hidden", false);

									})
									.on("mouseout", function() {
									 d3.select(this).attr("r", 3);
									
									 d3.select("#tooltip")
									 .classed("hidden", true);
									});
        svg.selectAll("path")
                     .data(nestedData)
                     .transition()
                     
                     .style("stroke", function(d) { return colorScale( d.key ); } )
                     .attr("d", function(d) { return hypertensionline(d.values) } );

                  
                    svg.select(".x.axis")
                        .transition()
                     
                      .call(xAxis);

                 
                    svg.select(".y.axis")
                        .transition()
                     
                      .call(yAxis);
      };