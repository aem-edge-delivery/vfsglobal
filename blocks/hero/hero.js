
// Get the modal
var modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML =  '<div class="modal-content">'+
    '<span class="close">&times;</span>'+
    '<form class="card-request-form">'+
        '<div class="form-screen-1">'+
            '<h2 class="card-request-h2">How do we get in touch?</h2>'+
            '<label for="name" class="field-label">Full Name</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="name"/>'+
            '<label for="email" class="field-label">Email Address</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="email"/>'+
            '<label for="city" class="field-label">Select City</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="city"/>'+
            '<label for="pan" class="field-label">PAN Card Number</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="pan"/>'+
            '<a class="form-button continue-btn">CONTINUE</a>'+
        '</div>'+
        '<div class="form-screen-2">'+
            '<h2 class="card-request-h2">Almost done!</h2>'+
            '<label for="phone" class="field-label">Phone Number</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="phone"/>'+
            '<label for="dob" class="field-label">Date of Birth (dd/mm/yyyy)</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="dob"/>'+
            '<div class="checkbox-block">'+
            '<input type="checkbox" class="field-checkbox formVal" name="vehicle1" value="terms & condition">'+
            '<label for="dob" class="field-label">I agree to ICICI Bank <a href="#">Terms & Conditions</a> and <a href="#">Most Important Terms & Conditions</a></label>'+
            '</div>'+
            '<a class="back-btn">Back</a>'+
            '<a class="form-button submit-btn">SUBMIT</a>'+
        '</div>'+
        '<div class="form-screen-3">'+
            '<div class="card-request-msg">Your request for Platinum Card is successfull, we will get back to you soon!</div>'+
        '</div>'+
    '</form>'+
  '</div>';
document.body.appendChild(modal);

// Get the button that opens the modal
var btn = document.getElementById("apply-now");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

// Form Button/Events
var screen1 = document.getElementsByClassName("form-screen-1")[0];
var screen2 = document.getElementsByClassName("form-screen-2")[0];
var screen3 = document.getElementsByClassName("form-screen-3")[0];
var continueBtn = document.getElementsByClassName("continue-btn")[0];
var backBtn = document.getElementsByClassName("back-btn")[0];
var submitBtn = document.getElementsByClassName("submit-btn")[0];

continueBtn.onclick = function() {
    screen1.style.display = "none";
    screen2.style.display = "block";
}
backBtn.onclick = function() {
    screen1.style.display = "block";
    screen2.style.display = "none";
}
submitBtn.onclick = function() {
    screen1.style.display = "none";
    screen2.style.display = "none";
    screen3.style.display = "block";

    var elements = document.getElementsByClassName("formVal");
    var formData = new FormData(); 
    for(var i=0; i<elements.length; i++){formData.append(elements[i].name, elements[i].value);}
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            console.log("Post Call Response: ", xmlHttp.responseText);
        }
    }
    xmlHttp.open("post", "https://edgeaem.free.beeceptor.com/application"); 
    xmlHttp.send(formData); 
}