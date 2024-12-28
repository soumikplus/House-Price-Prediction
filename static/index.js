function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "/predict_home_price";
  // var url = "http://127.0.0.1:5000/predict_home_price"; 

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location
  }, function(data, status) {
    console.log(data.estimated_price);
    estPrice.innerHTML = "<h2 style='color: white; font-size: 22px; font-weight: 400; text-align: center; margin: 0;'>" + data.estimated_price.toString() + " Lakh</h2>";
    console.log(status);
  }).fail(function(xhr, status, error) {
    console.error("Request failed: ", status, error);
  });
}

function onPageLoad() {
  console.log("document loaded");
  var url = "/get_location_names";
  // var url = "http://127.0.0.1:5000/get_location_names";
  $.get(url, function(data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  }).fail(function(xhr, status, error) {
    console.error("Request failed: ", status, error);
  });
}

window.onload = onPageLoad;