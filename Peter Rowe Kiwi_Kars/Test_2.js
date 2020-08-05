// JavaScript Document
alert("Js attached"); //test alert
scroll(0, 0); //sets the scroll
//global variables
var database = firebase.database();
var bookingRef = database.ref('bookings');
var extrasOutput = [];
var extrasCost = 0;
var firstName = "";
var lastName = "";
var email = "";
var age = 0;
var phone = 0;
var car = "";
var price = 0;
var date = "";
var numberDays = 0;
const INSURANCE_FEE = 20;
const BOOKING_FEE = 50;
var totalPrice = 0;
var extras = [];
var coment = "";
var fullName = "";

function updateCar() { //gets the car data when a car card is clicked
	price = this.dataset.price; //gets the car name and car price
	car = this.dataset.name;
	alert(car); //test alert
	alert("$" + price + "/day"); //test alert
	document.getElementById("carOutput").innerHTML = car; //outputs the car name and price into the table
	document.getElementById("priceOutput").innerHTML = "$" + price;
}

function extrasList() {
	extras = document.getElementsByClassName("addCheck"); //sets the extras variable when a check box is clicked
	extrasCost = 0; //the extras cost is set to 0 untill a check box is clicked
	extrasOutput = []; //the extras box will stay clear untill a check box is clicked
	for (i = 0; i < extras.length; i++) { //for loop to check which boxes have bean checked
		if (extras[i].checked) { //if statment if a box is checked
			extrasOutput.push(extras[i].dataset.name);
			extrasCost += Number(extras[i].dataset.price);
		}
	}
	totalPrice = (numberDays * price) + extrasCost + BOOKING_FEE + (INSURANCE_FEE * numberDays); //calculates the total price
	document.getElementById('extrasOutput').innerHTML = extrasOutput;
	document.getElementById('totalPriceOutput').innerHTML = "$" + totalPrice; //outputs the extras information into the table
}

function bookingTimes() { //sets the date variables so the total price can be calculated and dates can be sent to firebase
	date = document.getElementById('dateInput').value;
	numberDays = document.getElementById('numberDays').value;
	totalPrice = (numberDays * price) + extrasCost + BOOKING_FEE + (INSURANCE_FEE * numberDays);
	document.getElementById('totalPriceOutput').innerHTML = "$" + totalPrice;
}

function customerInfo() { //sets the users information variables to it can be pushed to firebase
	firstName = document.getElementById('firstNameInput').value;
	lastName = document.getElementById('lastNameInput').value;
	age = document.getElementById('ageInput').value;
	phone = document.getElementById('phoneInput').value;
	email = document.getElementById('emailInput').value;
	coment = document.getElementById('comentInput').value;
	pushData() //goes to the pushData function
}

function pushData() { //this will push the data to firebase
	totalPrice = (numberDays * price) + extrasCost + BOOKING_FEE + (INSURANCE_FEE * numberDays);
	fullName = firstName + ' ' + lastName;
	var data = { //the data that will be sent to firebase
		full_name: fullName,
		age: age,
		email: email,
		phone: phone,
		pick_up_date: date,
		number_of_days: numberDays,
		car: car,
		total_price: totalPrice,
		extras: extrasOutput,
		coments: coment
	};
	bookingRef.push(data); //pushes the data through to firebase
	alert("data has been pushed"); //test alert
	document.getElementById('confirmOverlay').style.height = "100%"; //the confirm overlay that will tell the user to check their email
	scroll(0, 0) //scrolles back up to the top of the page
	setTimeout(function() {
		location.reload();
	}, 3000);
}
//bondries for the date function
var today = new Date();
var dd = today.getDate(); //sets the date as today
var mm = today.getMonth() + 1; //january is 0 so and sets the curent month
var yyyy = today.getFullYear(); //sets year as this year
if (dd < 10) {
	dd = '0' + dd
}
if (mm < 10) {
	mm = '0' + mm
}
today = yyyy + "-" + mm + "-" + dd; //sets the date value
document.getElementById("dateInput").setAttribute("min", today);
//the event listner for the car cards
var carInputs = document.getElementsByClassName('carCard');
for (var i = 0; i < carInputs.length; i++) {
	carInputs[i].addEventListener('click', updateCar);
}
//the event listner for the extras
var extrasClicked = document.getElementsByClassName('addCheck');
for (var i = 0; i < extrasClicked.length; i++) {
	extrasClicked[i].addEventListener('click', extrasList);
}