$(document).ready(() => {

   
    let IntervalId;
 

      $('.nav-link').on('click', (event) => {
        clearInterval(IntervalId);
        
        $('#maincontainer').empty();  
        let menuId = event.target.id;

          if (menuId == 'livereports') {
            $.ajax({
                type: 'GET',
                url: `Pages/livereports.html`,
                beforeSend: function () {
                    $(".loader").show();
                },
                success: function (result) {
                    $(".loader").hide();
                    $("#search").hide();
                    $("#scrolltopbutton").hide();
                    $('#maincontainer').empty();


                         if (selectedCoins.length == 0) {
                         
                             $("#maincontainer").html(`<div class="noneselectedmsg"> <h2>Please select up to 5 coins to display on the graph!</h2> </div>`);
                     
                          
                         }
                     
                         else {
                     
                             $(".loader").show();
                     
                             let arrCoinRealTime1 = [];
                             let arrCoinRealTime2 = [];
                             let arrCoinRealTime3 = [];
                             let arrCoinRealTime4 = [];
                             let arrCoinRealTime5 = [];
                             let arrCoinRealTimeName = [];
                     
                             function getData(event) {
                     
                                 $.ajax({
                     
                                     type: "GET",
                                     url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectedCoins[0]},${selectedCoins[1]},${selectedCoins[2]},${selectedCoins[3]},${selectedCoins[4]}&tsyms=USD`,
                     
                                     success: function (result) {
                                        
                                         if (result.Response == "Error") {
                                             clearInterval(IntervalId);
                                             $(".loader").hide();
                                             $('#maincontainer').html(`<div class="noneselectedmsg"> <h2>No data on selected currencies - please try other coins!</h2> </div>`);
                                         }
                     
                                         else {
                     
                                             $('#maincontainer').html(` <div id="chartContainer" style="height: 300px; width: 100%;"></div>`);
                     
                                             let dateNow = new Date();
                                             let counter = 1;
                                             arrCoinRealTimeName = [];
                     
                                             for (let key in result) {
                     
                                                 if (counter == 1) {
                                                     arrCoinRealTime1.push({ x: dateNow, y: result[key].USD });
                                                     arrCoinRealTimeName.push(key);
                                                 }
                     
                                                 if (counter == 2) {
                                                     arrCoinRealTime2.push({ x: dateNow, y: result[key].USD });
                                                     arrCoinRealTimeName.push(key);
                                                 }
                     
                                                 if (counter == 3) {
                                                     arrCoinRealTime3.push({ x: dateNow, y: result[key].USD });
                                                     arrCoinRealTimeName.push(key);
                                                 }
                     
                                                 if (counter == 4) {
                                                     arrCoinRealTime4.push({ x: dateNow, y: result[key].USD });
                                                     arrCoinRealTimeName.push(key);
                                                 }
                     
                                                 if (counter == 5) {
                                                     arrCoinRealTime5.push({ x: dateNow, y: result[key].USD });
                                                     arrCoinRealTimeName.push(key);
                                                 }
                     
                                                 counter++;
                                             }
                     
                                             createGraph();
                                             $(".loader").hide();
                     
                                         }
                     
                                     }
                     
                                 })
                     
                             }
                     
                             IntervalId = setInterval(() => {
                                 getData();
                             }, 2000);
                        
                             function createGraph(event) {
                     
                                 var chart = new CanvasJS.Chart("chartContainer", {
                                     exportEnabled: true,
                                     animationEnabled: false,
                     
                                     title: {
                                         text: "Real-time Price of Selected CryptoCurrencies in $USD"
                                     },
                                     axisX: {
                                         valueFormatString: "HH:mm:ss",
                                     },
                                     axisY: {
                                         title: "Coin Value",
                                         suffix: "$",
                                         titleFontColor: "#4F81BC",
                                         lineColor: "#4F81BC",
                                         labelFontColor: "#4F81BC",
                                         tickColor: "#4F81BC",
                                         includeZero: true,
                                     },
                                     toolTip: {
                                         shared: true
                                     },
                                     legend: {
                                         cursor: "pointer",
                                         itemclick: toggleDataSeries,
                                     },
                                     data: [{
                                         type: "spline",
                                         name: arrCoinRealTimeName[0],
                                         showInLegend: true,
                                         xValueFormatString: "HH:mm:ss",
                                         dataPoints: arrCoinRealTime1
                     
                                     },
                                     {
                                         type: "spline",
                                         name: arrCoinRealTimeName[1],
                                         showInLegend: true,
                                         xValueFormatString: "HH:mm:ss",
                                         dataPoints: arrCoinRealTime2
                     
                                     },
                                     {
                                         type: "spline",
                                         name: arrCoinRealTimeName[2],
                                         showInLegend: true,
                                         xValueFormatString: "HH:mm:ss",
                                         dataPoints: arrCoinRealTime3
                     
                                     },
                                     {
                                         type: "spline",
                                         name: arrCoinRealTimeName[3],
                                         showInLegend: true,
                                         xValueFormatString: "HH:mm:ss",
                                         dataPoints: arrCoinRealTime4
                     
                                     },
                                     {
                                         type: "spline",
                                         name: arrCoinRealTimeName[4],
                                         showInLegend: true,
                                         xValueFormatString: "HH:mm:ss",
                                         dataPoints: arrCoinRealTime5
                     
                                     }]
                     
                                 });
                     
                                 chart.render();
                     
                                 function toggleDataSeries(e) {
                                     if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                         e.dataSeries.visible = false;
                                     }
                                     else {
                                         e.dataSeries.visible = true;
                                     }
                                     e.chart.render();
                                 }
                     
                             }
                     
                         }
                     
            
                   
                }
            });
            event.preventDefault();
          }
          else if (menuId == 'about') {
              $.ajax({
                  type: 'GET',
                  url: `Pages/about.html`,
                  beforeSend: function () {
                      $(".loader").show();
                  },
                  success: function (result) {
                      $(".loader").hide();
                       clearInterval(IntervalId);
                       $('#maincontainer').empty(); 
                      $("#search").hide();
                      $("#scrolltopbutton").hide();
                      
                      $('#maincontainer').html(result);
                     
                  }
                  
              });
              event.preventDefault();
          } 
          
          
      
        else {
            
               clearInterval(IntervalId);
               $('#maincontainer').empty(); 
              $('#maincontainer').html(startDefault());
              $("#search").show();
              event.preventDefault();
             
          }

      });




      function startDefault() {
        
          $(".loader").show();
          clearInterval(IntervalId);
          $.ajax({
              url: "https://api.coingecko.com/api/v3/coins/list",
              type: "GET",
              success: function (results) {
                  $(".loader").hide();

                  for (var i = 0; i < 100; i++) {
                      apppendCard(results[i]);
                      moreInfoEvent(results[i].id);
                  }
                  doubleCheckToggle();
              },
              error: function (results) {
                  console.log(`Error: "  ${results}`);
              }

          });
      };
      startDefault();

      //create html container displaying coin data
      function apppendCard(card) {

          $('#maincontainer').append(

              `<div class="col-sm-4"  id="${card.symbol.toUpperCase()}" >
            <div class="card">
                <div class="card-body">
                    <label class="switch">
                    <input type="checkbox" class="checkboxes" onchange="toggleFunc(this,'${card.symbol.toUpperCase()}')" id="check${card.symbol.toUpperCase()}"> <span class="slider round" id=""></span>
                    </label>
                    <h5 id="${card.symbol.toUpperCase()}a1" class="card-title">${card.symbol.toUpperCase()}</h5>
                    <p class="card-text">${card.name}</p>
                    <button class="btn" id="moreinfobutton${card.id}" type="button"  data-toggle="collapse" data-target="#open${card.id}" aria-expanded="false" aria-controls="collapseExample">
                        More Info
                    </button>
                    <div class="collapse" id="open${card.id}">
                        <div class="card card-body" id="${card.id}">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>`
          );

      }

      //onclick function for "moreinfo" button calling additional info using ajax and storing locally
      function moreInfoEvent(idCoin) {
          $(`#moreinfobutton${idCoin}`).on("click", function () {
              $(".loader").show();
              let idCoin = $(this).next().children().attr("id")
              let timeNow = Date.now();
              let backUpCoin = JSON.parse(localStorage.getItem(idCoin));
              if (backUpCoin != null && (timeNow - backUpCoin.time) < 120000) {
                  console.log("from local");
                  $(".loader").hide();
                  $(`#${idCoin}.card`).html(`
              <div><img src=${backUpCoin.image.small}/></div><br>
              <div>$ ${backUpCoin.market_data.current_price.usd.toFixed(4)}</div>
              <div>€ ${backUpCoin.market_data.current_price.eur.toFixed(4)}</div>
              <div>₪ ${backUpCoin.market_data.current_price.ils.toFixed(4)}</div>
              `)
              } else {
                  console.log("from Ajax");
                  $.ajax({
                      type: "GET",
                      url: `https://api.coingecko.com/api/v3/coins/${idCoin}`,
                      beforeSend: function() {
                           $(".loader").show();
                       },
                      success: function (results) {
                          $(".loader").hide();
                        
                          $(`#${idCoin}.card`).html(`
            <div><img src=${results.image.small}/></div><br>
            <div>$ ${results.market_data.current_price.usd.toFixed(4)}</div>
            <div>€ ${results.market_data.current_price.eur.toFixed(4)}</div>
            <div>₪ ${results.market_data.current_price.ils.toFixed(4)}</div>
            `)
                          results.time = Date.now();
                          localStorage.setItem(`${results.id}`, JSON.stringify(results));
                      }
                  })
              }


          });
      }

        //search functionality

        $('#search-input').on('keypress', function(e) {
            var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (!/^[A-Z0-9]+$/i.test(key)) {
                event.preventDefault();
            }
        })

     $("#search-btn").on("click", function () {
        clearInterval(IntervalId);
     var val=$(this.previousElementSibling).val().toUpperCase();
   
   
    
    if ($("#" + val + "a1").offset() !== undefined && val!==undefined){

        $(".col-sm-4").each( function () {
                         let cardText = $(this).attr("id").toUpperCase();
                         if (cardText === val) {
                             $(this).show();
                         } else {
                             $(this).hide();
                         }

            })
        }

        else if (val=="") {
        $("#searchmsg").html("Please enter a valid coin name to search.");
            setTimeout(function () {
                $("#searchmsg").html("");
            }, 5000);
    }

    else {
        $("#searchmsg").html("Could not find a matching coin");
        allcards.show();
        setTimeout(function () {
            $("#searchmsg").html("");
        }, 5000);
}
$("#search-input").val("");
});
        

      
  });
  //end of doc ready



  //toggle functionality

  var selectedCoins = [];

  var selectedToggleIds = [];

  var graphdata = [];
  var updater;

  function toggleFunc(currenttoggle, coinname) {

      var ToggleId = currenttoggle.id;

      let indexSymbolCoin = selectedCoins.indexOf(coinname);
      let indexIdToggleLive = selectedToggleIds.indexOf(ToggleId);

      if (indexSymbolCoin != -1) {
          selectedCoins.splice(indexSymbolCoin, 1);
          updateCoinSpan();
          selectedToggleIds.splice(indexIdToggleLive, 1);
      } else {

          if (selectedCoins.length < 5) {
              selectedCoins.push(coinname);
              updateCoinSpan();
              selectedToggleIds.push(ToggleId);
          } else {

              $("#modalbody").empty();
              $(`#${ToggleId}`).prop('checked', false);

              $("#modalbody").html('To add the "<b>' + coinname + '</b>" coin, you must unselect one of the following: <br>' );
              $("#mymodal").css("display", "block");

              $("#keepcurrent").on("click", () => {
                  $("#mymodal").css("display", "none");
              });

              let counterId = 1;

              for (let i = 0; i < selectedCoins.length; i++) {

                  $("#modalbody").append(
                      `<div id="modaldiv">
                    <div class="card" id="modalcard">
                        <div class="card-body" id="modalcardbody">
                            <h6 id="modalcoinname" class="card-title">${selectedCoins[i]}</h6>
                            </div>
                           
                        </div>
                        <label class="switch" id="modalswitch">
                        <input type="checkbox" class="checkboxes" id="chosenToggle${counterId}"> <span class="slider round" id="modalslider"></span>
                        </label>
                    </div>
                </div>
                `
                  );


                  $(`#chosenToggle${counterId}`).prop('checked', true);

                  $(`#chosenToggle${counterId}`).on("change", () => {

                      let indexCoinRemove = selectedCoins.indexOf(selectedCoins[i]);

                      let ToggleTofalse = selectedToggleIds[indexCoinRemove];
  
                      selectedCoins.splice(indexCoinRemove, 1);
                      updateCoinSpan();
                      selectedToggleIds.splice(indexCoinRemove, 1);

                      selectedCoins.push(coinname);
                      updateCoinSpan();
                      selectedToggleIds.push(ToggleId);

                      $("#mymodal").css("display", "none");

                      $(`#${ToggleTofalse}`).prop('checked', false);
                      doubleCheckToggle()
                  })

                  counterId++;
              }

          }

          console.log(selectedCoins);
          console.log(selectedToggleIds);


      }

  }


  function updateCoinSpan() {
    var coinspandata = "";
    for (var i = 0; i < selectedCoins.length; i++) {
        if (i == (selectedCoins.length - 1)) {
            coinspandata += selectedCoins[i];
        }
        else {
            coinspandata += selectedCoins[i] + ", ";
        }
    }
    $("#selectedcoins").html(coinspandata);
}

  function doubleCheckToggle() {

      for (let i=0; i< selectedToggleIds.length; i++ ) {

          $(`#${selectedToggleIds[i]}`).prop('checked', true);

      }

  }

var addEventListener_orig = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, handler, opts_orig) {
  var opts;
  if(opts_orig === false || opts_orig === true)
    opts = { capture: opts_orig, passive: false };
  else if(!(opts_orig && opts_orig.constructor == Object))
    opts = { passive: false };
  else
    opts = opts_orig;

  arguments[2] = opts;
  return addEventListener_orig.apply(this, arguments);
};


  window.onscroll = function () {
      scrollFunction()
  };

  function scrollFunction() {
      if (document.body.scrolltop > 20 || document.documentElement.scrollTop > 20) {
          document.getElementById("scrolltopbutton").style.display = "block";
      } else {
          document.getElementById("scrolltopbutton").style.display = "none";
      }
  }

  function topFunction() {
      document.body.scrollTop=0;
      document.documentElement.scrollTop = 0;
  }
