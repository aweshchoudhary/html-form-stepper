var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    const btn = document.getElementById("nextBtn");
    btn.innerHTML = "Submit";
    btn.onclick = () => {
      const insuranceInput = document.querySelector("#insurance-menu");
      const familyInput = document.querySelector("#sing-family-menu");
      const host = "https://atlasinsurancebrokers.net";
      const firt_url =
        host + (familyInput.value == "single" ? "/1-adult/" : "/fourth/");
      const second_url =
        host + familyInput.value == "single" ? "/second/" : "/fifth/";
      const third_url =
        host + familyInput.value == "single" ? "/third/" : "/sixth/";
      if (insuranceInput.value == "5") window.location.href = firt_url;
      if (insuranceInput.value == "10") window.location.href = second_url;
      if (insuranceInput.value == "20") window.location.href = third_url;
    };
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

const age = () => {
  const ageInput = document.querySelector("#age-menu");
  for (let i = 20; i <= 60; i++) {
    ageInput.insertAdjacentHTML(
      "beforeend",
      `<option value="${i}">${i}</option>`
    );
  }
};

age();
