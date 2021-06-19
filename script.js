//all the variable used in the project
var button = document.getElementsByTagName('button');
var input = document.getElementsByTagName('input');
var cityName = document.getElementsByClassName('city-name');
var iconWeather = document.getElementsByTagName('img');
var currentTemp = document.getElementById('current-temp');
var minTemp = document.getElementsByClassName('temp-min');
var maxTemp = document.getElementsByClassName('temp-max');
var description = document.getElementsByClassName('description');
var extraText = document.getElementsByClassName('extra-text');
var extraValue = document.getElementsByClassName('extra-value');
var codeValue = [];
var advice = document.querySelectorAll('.advice');
var weatherDiv = document.getElementsByClassName('weather-div');
var footer = document.getElementsByTagName('footer');


/*getWeather: this is the main function of the project. When it is called, the name of the city typed by the user is place inside the API
call in order to get the weather information for that city. The information are then displayed on the website*/
//https://api.weatherapi.com/v1/current.json?key=00bbd92646d54cfcab1151251211806&q=London&aqi=no
var getWeather = function(){
    //call the API
    fetch("https://api.weatherapi.com/v1/current.json?key=00bbd92646d54cfcab1151251211806&q="+input[0].value+"&days=2")
        .then(response => response.json())
        .then(data => {

            console.log(data);


            //changes the current temperature and icon and description as well as the icon and description for the day after
            currentTemp.innerHTML = data['current']['temp_c'] + " °C";
            iconWeather[0].src = data['current']['condition']['icon'];
            description[0].innerHTML = data['current']['condition']['text'];
            codeValue[0] = data['current']['condition']['code'];
            iconWeather[1].src = data['forecast']['forecastday'][1]['day']['condition']['icon'];
            description[1].innerHTML = data['forecast']['forecastday'][1]['day']['condition']['text'];
            codeValue[1] = data['forecast']['forecastday'][1]['day']['condition']['code'];



            //changes the name of the city, the overall weather and the description for both days (i used a loop this time beforer we were getting the information at the same place)
            for ( var i = 0; i < cityName.length; i++){
                cityName[i].innerHTML = data['location']['name'];
                minTemp[i].innerHTML = data['forecast']['forecastday'][i]['day']['mintemp_c'] + " °C";
                maxTemp[i].innerHTML = data['forecast']['forecastday'][i]['day']['maxtemp_c'] + " °C";
               
            }
            
            /*we call another json file which contains a list of code and the corresponding weather.Codes inside this weather_code.json file are
            the same as the one in the API call. If we get a match, depending on the weather, different information are displayed on the website*/
            fetch("weather_code.json")
                .then(response2 => response2.json())
                    .then(data2 =>{
                        console.log(data2)

                        for(var i = 0; i < codeValue.length; i++){ //loop for the "now" and "tommorow" information

                            for( var j = 0; j < data2[0]["code"].length; j++){ // loop the fisrt array of json file
                                if (data2[0]["code"][j] == codeValue[i]){
                                    console.log("sunny");
                                    advice[i].children[0].innerHTML = "Too hot today? Don't forget to bring some sunscreen and water along today!";
                                    advice[i].children[0].style.fontWeight = "bold";
                                    advice[i].children[1].innerHTML = "Those plant should be watered";
                                    advice[i].children[2].innerHTML = "Make sure to get your dose of vitamin D today, but make sure you don't stay out in the sun too long";
                                    extraText[i].innerHTML = "UV: ";

                                    if(i === 0){
                                        extraValue[i].innerHTML = data['current']['uv'];
                                    }
                                    else{
                                        extraValue[i].innerHTML = data['forecast']['forecastday'][i]['day']['uv'];
                                    }
                                    
                                }
                            }

                            for( var j = 0; j < data2[1]["code"].length; j++){ // loop the second array of json file
                                if (data2[1]["code"][j] == codeValue[i]){
                                    console.log("cloudy");
                                    advice[i].children[0].innerHTML = "Just another cloudy day";
                                    advice[i].children[1].innerHTML = "Calm weather? Go for a small walk with a friend!";
                                    advice[i].children[2].innerHTML = "";
                                    extraText[i].innerHTML = "Humidity: ";
                                    extraValue[i].innerHTML = data['forecast']['forecastday'][i]['day']['avghumidity'] + "%";
                                }
                            }

                            for( var j = 0; j < data2[2]["code"].length; j++){
                                if (data2[2]["code"][j] == codeValue[i]){
                                    console.log("rain");
                                    advice[i].children[0].innerHTML = "Don't forget to bring your umbrella along!";
                                    advice[i].children[0].style.fontWeight = "bold";
                                    advice[i].children[1].innerHTML = "Not excited by this poor weather? Grab a book and a cup of coffee and make time for yourself";
                                    advice[i].children[2].innerHTML = "";
                                    extraText[i].innerHTML = "Humidity: ";
                                    extraValue[i].innerHTML = data['forecast']['forecastday'][i]['day']['avghumidity'] + "%";
                                }
                            }

                            for( var j = 0; j < data2[3]["code"].length; j++){
                                if (data2[3]["code"][j] == codeValue[i]){
                                    console.log("thunder");
                                    advice[i].children[0].innerHTML = "Maybe it's not the best time to go out, is it?";
                                    advice[i].children[1].innerHTML = "Make sure to not stay under a tree, it might hurt";
                                    advice[i].children[2].innerHTML = "";
                                    extraText[i].innerHTML = "Humidity: ";
                                    extraValue[i].innerHTML = data['forecast']['forecastday'][i]['day']['avghumidity'] + "%";
                                }
                            }

                            for( var j = 0; j < data2[4]["code"].length; j++){
                                if (data2[4]["code"][j] == codeValue[i]){
                                    console.log("snow");
                                    advice[i].children[0].innerHTML = "Make sure to not catch a cold, maybe it's time to wear those gloves your mom brought you!";
                                    advice[i].children[1].innerHTML = "What about a snow fight today? Go and text some friends!";
                                    advice[i].children[2].innerHTML = "";
                                    extraText[i].innerHTML = "Humidity: ";
                                    extraValue[i].innerHTML = data['forecast']['forecastday'][i]['day']['avghumidity'] + "%";
                                }
                            }
                        
                        }     
                

                    })

                    for ( var i = 0; i < weatherDiv.length; i++){ // when the button is clicked and the information colleted, those two div are displayed on the web site
                        weatherDiv[i].style.display = "block";
                        advice[i].style.display = "flex";
                    };

                    //put the footer at the end of the page
                    footer[0].style.position = "unset";




        })

        .catch(err => alert("Please enter a valid city"))

    

}



button[0].addEventListener('click', ()=>{
    if (input[0].validity.valueMissing === true){
        console.log('no input');
     input[0].style.backgroundColor = "#ff6961";  
    }
    else{
        input[0].style.backgroundColor = "white";
        getWeather();
    }

});







