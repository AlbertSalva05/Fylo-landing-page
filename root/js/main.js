$(function(){

	// declare variables
	const form = document.getElementById('signupForm');
	const emailInput = document.getElementById('emailInput');
	const validationMsg = document.querySelector(".validationMsg");
	const email = emailInput.value;

	// validating function using regex
	function validateEmailInput(email){
		const emailRegex = /^\S+@\S+\.\S+$/;
		return emailRegex.test(email);
	}

	// function trigger when user inputs in the email field
	emailInput.addEventListener('input', function(){
		validationMsg.style.display = 'none';
	});

	// function on form submit
	form.addEventListener('submit', function(event){
		event.preventDefault();

		const email = emailInput.value;

		// Check if the email input is empty
		if(email.trim() === ''){
			// Display error message
			validationMsg.style.display = 'block';
			validationMsg.style.color = 'hsl(0, 100%, 63%)';
			validationMsg.innerHTML = 'Please enter an email address.';
		}
		// Check if email input if it is valid
		else if(validateEmailInput(email)){
			// Display success message
			validationMsg.style.display = 'block';
			validationMsg.style.color = 'hsl(120, 70%, 50%)';
			validationMsg.innerHTML = 'Sign Up successfully!, You' + "'" + 're one step ahead.';
		}
		// Check if email input is not empty but the input is invalid
		else{
			// Display error message
			validationMsg.innerHTML = 'Kindly enter valid email address.';
			validationMsg.style.color = 'hsl(0, 100%, 63%)';
			validationMsg.style.display = 'block';
		}
	});

});
