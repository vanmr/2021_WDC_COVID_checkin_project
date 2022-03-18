// Check that the second password is entered correctly
function check() {
    var p1=document.getElementById("password").value;
    var p2=document.getElementById("password2").value;
    var p3 = document.getElementById("p");
    if (p1 != p2){
        var txt = "The two passwords are not the same";
        p3.innerHTML=txt;
    }
    if (p1 == p2){
        p3.innerHTML="";
    }
}

//user login
function userlogin(){
    let user = {
        account: document.getElementById('account').value,
        pass: document.getElementById('password').value
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Welcome");
            window.location.href="index.html";
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/login_user", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

// manager login
function managerlogin(){
    let user = {
        account: document.getElementById('account').value,
        pass: document.getElementById('password').value
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Welcome");
            window.location.href="index.html";
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/login_manager", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

//admin login
function adminlogin(){
    let user = {
        account: document.getElementById('account').value,
        pass: document.getElementById('password').value
    };

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Welcome");
            window.location.href="index.html";
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login failed");
        }
    };

    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/login_admin", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

//venue Manager Registration
function register_manager(){
    let user = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
     // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Welcome");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("register failed");
        }
    };
    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/register_manager", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

//User registration
function register_user(){
    let user = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        phone: document.getElementById('phonenumber').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
     // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Welcome");
            window.location.href="userlogin.html";
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("register failed");
        }
    };
    // Open connection to server & send the post data using a POST request
    xmlhttp.open("POST", "/users/register_user", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(user));
}

//check in
function checkin(){
    var d = new Date();
    var year =d.getFullYear();
    var mon = d.getMonth();
    var day = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    let trip ={
        address: document.getElementById('address').value,
        time: year+'/'+mon+'/'+day+'/'+' '+h+':'+m+':'+s,
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert('You have checked in');
        }
        else if(this.readyState == 4 && this.status >= 400){
            alert("you haven't log in" );
        }
    };
    xhttp.open("POST","/users/checkin", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(trip));
}

//View user information
function infor(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            user = JSON.parse(this.responseText);
            document.getElementById('firstname').value = user.first_name;
            document.getElementById('lastname').value = user.last_name;
            document.getElementById('phone').value = user.phone_number;
            document.getElementById('email').value = user.email;
        }
        else if(this.readyState == 4 && this.status >= 400){
            alert("you haven't log in");
        }
    };
    xhttp.open("GET","/users/infor", true);
    xhttp.send();
}

//The user changes the information and saves
function save(){
    let user={
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            alert('Your information has been saved');
        }
        else if(this.readyState == 4 && this.status >= 400){
            alert('error');
        }
    };
    xhttp.open("POST","/users/save", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

// View History
function history(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var history = JSON.parse(this.responseText);
            for(let i=0; i<history.length; i++){
                var historys = history[i];
                if(historys.hotspot === 0){
                    historys.hotspot = 'false';
                }
                else if(historys.hotspot === 1){
                    historys.hotspot = 'true';
                }
                document.getElementById('history').innerHTML = historys.first_name;
                // document.getElementById('history').innerHTML += `<tr><td>${historys.first_name}</td><td>${historys.last_name}</td><td>${historys.address}</td><td>${historys.arrvie_time}</td><td>${historys.hotspot}</td></tr>`;
            }
        }
    };
    xhttp.open("GET","/users/history",true);
    xhttp.send();
}

//GPS location to get the address
function getLocation(){
    var x=document.getElementById("x");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        x.innerHTML="The browser does not support geolocation.";
    }
}

function showPosition(position){
    var lat = parseFloat(position.coords.latitude);
    var lng = parseFloat(position.coords.longitude);
    var latlng = new google.maps.LatLng(lat,lng);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                document.getElementById("address").value = results[1].formatted_address;
            }
        }
    });
}