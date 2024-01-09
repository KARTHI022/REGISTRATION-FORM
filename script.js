let form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    validateForm(); 
});
//  result = ""
//  let age = 0
//  let daysLived = 0

// ------------------------------------saving data-----------------------------------------------------------------------
function saveFormData() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('date').value;
    // var date = document.getElementById('date').value;
    var gender = document.getElementById('gender').value;
    var occupation = document.getElementById('occupation').value;
    var education = document.getElementById('education').value;
    var username = document.getElementById('username').value;
    var pan = document.getElementById('pan').value;
    var image = result
    let imgsize = (document.getElementById("image").files[0].size)


    // let fileSizeKBContainer = document.getElementById('fileSizeKB');
    // let fileSizeMBContainer = document.getElementById('fileSizeMB');
    // let maxFileSize = 2 * 1024 * 1024;
    // let img/(1024*1024)


    // ---------------------------Check for already exists --------------------------------------------------------------
    var storedDataJSON = localStorage.getItem('userData');
    var storedData = storedDataJSON ? JSON.parse(storedDataJSON) : [];
    var existingEntry = storedData.find(entry =>
        entry.username === document.getElementById('username').value 
    );

    if (existingEntry) {size
        
        console.log('An entry with the same values already exists. Please use different values.');
        return;
    }
    
    var username = document.getElementById('username').value;
    let formData = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        date: date,
        gender: gender,
        occupation: occupation,
        education: education,
        username: username,
        pan: pan,
        image: image,
        daysLived:daysLived,
        age: age,
        //  fileSizeKB :file.size / 1024,
        // fileSizeMB :fileSizeKB / 1024
        imagesizeinKB : (imgsize/1024).toFixed(2) ,
        imagesizeinMB:((imgsize/1024)/1000).toFixed(2)
      
        
    };
     storedData.push(formData);
     localStorage.setItem("userData", JSON.stringify(storedData));
}

// ------------------------------search&display----------------------------------------------
// var searchLetter = document.getElementById('searchLetter');
// searchLetter.addEventListener('searching', function () {
//     searchAndDisplayData();
// });



function searchAndDisplayData() {
    var storedData = JSON.parse(localStorage.getItem('userData'));
    let searchLetter = document.getElementById('searchLetter').value;
   let filteredData = []
    // var storedDataJSON = localStorage.getItem('userData');
    // var storedData = storedDataJSON ? JSON.parse(storedDataJSON) : [];
    
    if( /^[a-zA-Z]+$/.test(searchLetter))
    {
         filteredData = storedData.filter(function(item) {
            return (
                item.name.toLowerCase().includes(searchLetter.toLowerCase())
            )
        } )
    }
    else if(/^[0-9]+$/.test(searchLetter))
    {
      filteredData = storedData.filter(function(item){
        return(
            Number(item.daysLived) <= Number(searchLetter) 
        )
      })
    }
    else{
        if(searchLetter.includes("kb"))
        { searchLetter = searchLetter.substring(0,searchLetter.indexOf("kb"))
        searchLetter = Number(searchLetter)
             filteredData = storedData.filter(function(item){
                return(
Number(item.imagesizeinKB) <= searchLetter 
                )
            })
        }
        else{
            searchLetter = searchLetter.substring(0,searchLetter.indexOf("mb"))
        searchLetter = Number(searchLetter)
             filteredData = storedData.filter(function(item){
                return(
          Number(item.imagesizeinMB) <= searchLetter 
                )
            })
        }
    }
    // else if(s)

    // var filteredData = storedData.filter(function(item) {
    //     return (

    //         item.name.toLowerCase().includes(searchLetter) ||
    //         Number(item.daysLived) <= Number(searchLetter) ||
    //         // (item.imagesizeinKB.toLowerCase().includes(searchLetter)) && typeof Number(item.imagesizeinKB) ===  'number'||
    //         // (item.imagesizeinMB.toLowerCase().includes(searchLetter)  && typeof Number(item.imagesizeinMB) ===  'number')
    //         // item.name.toLowerCase().includes(searchLetter) ||
    //         // Number(item.daysLived) <= Number(searchLetter) 
    //         // // (Number(item.imagesizeinMB) <= Number((searchLetter)) && typeof Number(item.imagesizeinMB) === 'number') ||
    //         // // (Number(item.imagesizeinKB) <= Number(p(searchLetter)) && typeof Number(item.imagesizeinKB) === 'number')
    //     );
    // });
    
    
    // var filteredData = storedData.filter(function(item) {


    //     return (
            
    //          item.name.toLowerCase().includes(searchLetter) ||
    //          Number(item.daysLived) <= Number(searchLetter) 
    //         //  Number(item.age) <= Number(searchLetter)
            
            
    //       );
    // });
    // (Number(item.imagesizeinMB) <= Number(parseSize(searchLetter)) && typeof Number(item.imagesizeinMB) === 'number') ||
    //         (Number(item.imagesizeinKB) <= Number(parseSize(searchLetter)) && typeof Number(item.imagesizeinKB) === 'number')
    // var filteredData = storedData.filter(function(source){
    //     return(

    // (Number(source.imagesizeinMB) <= Number(parseSize(searchLetter)) && typeof Number(source.imagesizeinMB) === 'number') ||
    //          (Number(source.imagesizeinKB) <= Number(parseSize(searchLetter)) && typeof Number(source.imagesizeinKB) === 'number')
    //     );
    // });
    
    
    // function parseSize(sizeString) {
    //     const matches = sizeString.match(/(\d+)/);
    //     return matches ? Number(matches[0]) : null;
    // }
    var modal = new bootstrap.Modal(document.getElementById('dataModal'));
    var modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = '';
    if (filteredData.length === 0) {
        
        modalContent.innerHTML = '<p>No matching data found.</p>';
    } else {

    for (var i = 0; i < filteredData.length; i++) {
        var userDiv = document.createElement('div');
        userDiv.classList.add('user-details');
        var userImage = document.createElement('img');
        userImage.src = filteredData[i].image;
        userImage.alt = 'Image';
        userDiv.appendChild(userImage);
        var userDetails = document.createElement('div');
        userDetails.innerHTML = `
            <p><strong>Name:</strong> ${filteredData[i].name}</p>
            <p><strong>Email:</strong> ${filteredData[i].email}</p>
            <p><strong>Password:</strong> ${filteredData[i].password}</p>
            <p><strong>Phone:</strong> ${filteredData[i].phone}</p>
            <p><strong>Date of Birth:</strong> ${filteredData[i].date}</p>
            <p><strong>Gender:</strong> ${filteredData[i].gender}</p>
            <p><strong>Occupation:</strong> ${filteredData[i].occupation}</p>
            <p><strong>Education:</strong> ${filteredData[i].education}</p>
            <p><strong>Username:</strong> ${filteredData[i].username}</p>
            <p><strong>PAN:</strong> ${filteredData[i].pan}</p>

            
           `;
        userDiv.appendChild(userDetails);
         modalContent.appendChild(userDiv);
    }
}
modal.show();
}
// document.addEventListener('searching', function () {
//     searchAndDisplayData();
// });
// ------------------------------------username---------------------------------------------------

 function isUsernameExists(username) {
    var storedDataJSON = localStorage.getItem('userData');
    var storedData = storedDataJSON ? JSON.parse(storedDataJSON) : [];

    return storedData.some(entry => entry.username === username);
}
function checkUsername() {
    var username = document.getElementById('username').value;

    if (isUsernameExists(username)) {
        document.getElementById('usernameError').innerHTML="Username already exists (Try Another)";
        return false;
    } else {
        document.getElementById('usernameError').innerHTML="";
        return true;
    }
}
// ----------------------------email---------------------------------------------------------------

function checkEmail() {
    var email = document.getElementById('email').value;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var emailError = document.getElementById('emailError');

    if (!emailRegex.test(email)) {
        emailError.innerHTML = "It's not suitable for our condition";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}


// ------------------------------------image-------------------------------------------------------------
function validateImage() {
    const image = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const errorContainer = document.getElementById('errorContainer');
    const maxFileSize = 2 * 1024 * 1024; 
    errorContainer.innerHTML = "";
 let formData = {
       
        image: image
    };
    if (image.files.length === 0) {
        imagePreview.innerHTML = ''; 
        return true;
    }
    const file = image.files[0];
    if (file.size > maxFileSize) {
        errorContainer.innerHTML = "File size should be below 2MB";
        image.value = "";
        return false;
    }   
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.innerHTML = ``;
        formData.image = reader.result
        console.log(reader.result)
         result = reader.result
        console.log(`the form data image ${formData.image}`)
    };
    reader.readAsDataURL(file);
    return true;
}
// function validateImage() {
//     const image = document.getElementById('image');
//     const imagePreview = document.getElementById('imagePreview');
//     const errorContainer = document.getElementById('errorContainer');
//     const fileSizeKBContainer = document.getElementById('fileSizeKB');
//     const fileSizeMBContainer = document.getElementById('fileSizeMB');
//     const maxFileSize = 2 * 1024 * 1024;
//     errorContainer.innerHTML = "";
    
//     let formData = {
//         image: image
//     };

//     if (image.files.length === 0) {
//         imagePreview.innerHTML = '';
//         fileSizeKBContainer.innerHTML = '';
//         fileSizeMBContainer.innerHTML = '';
//         return true;
//     }

//     const file = image.files[0];

//     if (file.size > maxFileSize) {
//         errorContainer.innerHTML = "File size should be below 2MB";
//         image.value = "";
//         return false;
//     }

//     const reader = new FileReader();
    
//     reader.onload = function (e) {
//         imagePreview.innerHTML = '';
//         formData.image = reader.result;
//         const fileSizeKB = file.size / 1024;
//         const fileSizeMB = fileSizeKB / 1024;

//         fileSizeKBContainer.innerHTML = `File Size: ${fileSizeKB.toFixed(2)} KB`;
//         fileSizeMBContainer.innerHTML = `File Size: ${fileSizeMB.toFixed(2)} MB`;

//         console.log(`The form data image: ${formData.image}`);
//     };

//     reader.readAsDataURL(file);
//     return true;
// }


// ------------------------------------------pan----------------------------------------------------------
function validatePan() {
     var pan = document.getElementById('pan').value;
     var panPattern = /^[A-Z]{5}\d{4}[A-Z]$/;
    if(panPattern.test(pan))
         {
             document.getElementById("panError").innerHTML="";
             return true;
         }
    else{
             document.getElementById("panError").innerHTML="enter valid pan";
             return false;
         }   
    
}


// ------------------------------------------------passsword-----------------------------------------------

 function togglePassword() {
    var password = document.getElementById("password");
    var toggleBtn = document.querySelector(".toggle-password-btn");

    if (password.type === "password") {
        password.type = "text";
        // toggleBtn.textContent = "👁️";
    } else {
        password.type = "password";
        // toggleBtn.textContent = "👁️";
    }
}

function checkPassword() {
    var password = document.getElementById("password").value;
    var Passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

    if (Passwordpattern.test(password)) {
        document.getElementById("passwordError").innerHTML="";
        console.log("Password is valid");
        return true;
    } else {
        document.getElementById("passwordError").innerHTML="enter valid password";
        console.log("Enter a valid password");
        return false;
    }
}


// -----------------------------------------phone-----------------------------------------------------------


function checkPhone(){
    let phone = document.getElementById('phone').value;
   
    var phonePattern = /^[6-9]{1}[0-9]{9}$/;
   

    if(phonePattern.test(phone) ) {
        document.getElementById('phoneError').innerHTML="";
        return true;
    }
    else {
        document.getElementById('phoneError').innerHTML="enter valid number";
        return false;
   }
}
//------------------------------------------- name-------------------------------------------------------------------
 function checkName(){
     let name = document.getElementById("name").value;
    
     var Namepattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
     if(Namepattern.test(name)){
         document.getElementById('nameError').innerHTML="";
         return true;
     }
     else{
        document.getElementById('nameError').innerHTML="enter valid name";
         return false;
     }
 }




//  -------------------------------------------date-----------------------------------------------------------------


function checkDate() {
    let dateInput = document.getElementById("date");
    let birthdate = new Date(dateInput.value);
    let currentDate = new Date();
    let year = birthdate.getFullYear();
    if(!(year >= 1950 && year <= 2010)){
        document.getElementById("dateError").innerHTML ="Please enter a year between 1950 and 2010.";
        
    }
    else{
        document.getElementById("dateError").innerHTML = "";
        
    }

   
     age = currentDate.getFullYear() - birthdate.getFullYear();
    // min="1950-01-01"  max="2010-01-01"

    if (currentDate.getMonth() < birthdate.getMonth() || (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
        age--;
     }

    console.log("Age: " + age);

     let formData = { age: age};

     let timeDifference = currentDate.getTime() - birthdate.getTime();
     daysLived = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    console.log("Days lived: " + daysLived);

    }






var alertShown = false;  
// ----------------------------verify validation--------------------------------------------------------------
function validateForm() {
    
    var isNameValid = checkName();
    var isEmailValid = checkEmail();
    var isPanValid = validatePan();
    var isPasswordValid = checkPassword();
    var isPhoneValid = checkPhone();
    var isImageValid = validateImage();
    var isUsernameValid = checkName();
    
    if (!alertShown
        
    ) {
        
        // saveFormData();
        alert("Form submitted successfully!");
       
        alertShown=true;
    } 
    // else {
    //     return false;
    // }
    location.reload();
}







