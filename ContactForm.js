/*******w************

    Project 3: JavaScript
    Name: Belen Gamez-Delgado	
    Date: April 21, 2022
    Description: Demonstrates the use of regular expressions for ContactForm.html

********************/

document.addEventListener("DOMContentLoaded", load);

function load()
{
	document.getElementById("regEx").addEventListener("submit", validate);

	document.getElementById("reset_form").reset();

	document.getElementById("reset_form").addEventListener("reset", resetForm);
}

function validate(e)
{
	
	hideAllErrors();

	if(formHasErrors())
	{
		e.preventDefault();
		return false;
	}

	return true;
}

function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if (confirm('Do you want to reset the form?') )
	{
		hideAllErrors();
		
		document.getElementById("fullname").focus();
		
		return true;
	}

	e.preventDefault();

	return false;
}

function formHasErrors()
{

	let errorFlag = false;
	let requiredFields = ["fullname","email","phone"];
	for(let i=0;i<requiredFields.length;i++)
	{
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField))
		{
			document.getElementById(requiredFields[i]).style.visibility = "visible";

			if(!errorFlag)
			{
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
	}
	let regex = new RegExp( /(.+)@(.+){2,}\.(.+){2,}/);
	let emailValue = document.getElementById("email").value;

	if(!regex.test(emailValue))
	{
		document.getElementById("email_error").style.visibility = "visible";

		if(!errorFlag)
		{
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}
	else
	{
		document.getElementById("email_error").style.visibility = "hidden";
	}

	let regexTwo = new RegExp(/^[a-zA-Z]+$/g);
	let nameValue = document.getElementById("fullname").value;

	if(!regexTwo.test(nameValue))
	{
		document.getElementById("fullname_error").style.visibility = "visible";

		if(!errorFlag)
		{
			document.getElementById("fullname").focus();
			document.getElementById("fullname").select();
		}

		errorFlag = true;
	}
	else
	{
		document.getElementById("fullname_error").style.visibility = "hidden";
	}
	
	let regexThree = new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/);
	let phoneValue = document.getElementById("phone").value;

	if(!regexThree.test(phoneValue))
	{
		document.getElementById("phone_error").style.visibility = "visible";

		if(!errorFlag)
		{
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		errorFlag = true;
	}
	else
	{
		document.getElementById("phone_error").style.visibility = "hidden";

	}

	return errorFlag;

}

function hideAllErrors()
{
	var errorFields = document.getElementsByClassName("error");

	for(var i = 0;i < errorFields.length; i++)
	{
		errorFields[i].style.display = "block";
	}
}

function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}

function formFieldHasInput(fieldElement)
{
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		return false;
	}
		
	return true;
}

function showError(formField, errorFlag)
{
	if ( !errorFlag )
	{
		formField.focus();
		
		if ( formField.type == "text" && formField.type == "email" && formField.type == "tel")
		{
			formField.select();
		}		
	}
}