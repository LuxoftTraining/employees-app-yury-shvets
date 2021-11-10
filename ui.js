const PLACEHOLDER = "employeesPlaceholder";

function runUI() {
	const employeesOptions = getEmployeesOptions();
	fillSelect(document.getElementById("managerSelect"), employeesOptions);
	employeesOptions.unshift({text:"-----------",value:""});
	fillSelect(document.getElementById("managerSearch"), employeesOptions);
	showEmployees(DATA.employees);
	document.getElementById("searchButton").click();
	assignSendOnEnter("searchPane","searchEmployeesButton");
	assignSendOnEnter("addPane", "addEmployeeButton");
}


function addEmployeeUI() {
	let errorHTML = "";
	const name = document.getElementById("name").value;
	if (name=="") {
		errorHTML += "- First name cannot be empty<br>";
		document.getElementById("name").style.backgroundColor = '#FFEEEE';
	}
	const surname = document.getElementById("surname").value;
	if (surname=="") {
		errorHTML += "- Last name cannot be empty<br>";
		document.getElementById("surname").style.backgroundColor = '#FFEEEE';
	}
	document.getElementById("addEmployeeFormErrorMessage")
		.innerHTML = errorHTML;
	if (errorHTML.length != 0) return;
	const id = addEmployee(name, surname);
	const managerId = document.getElementById("managerSelect").value;
	setEmployeeManager(id, managerId);
	showEmployees(DATA.employees);
	document.getElementById("name").value = "";
	document.getElementById("surname").value = "";

}

function fillSelect(select, values, selectedValue) {
	for (let val of values) {
		const option = document.createElement("option");
		option.text = val.text;
		option.value = val.value;
		if (selectedValue==option.value) option.selected=true;
		select.appendChild(option);
	}
}

function getEmployeesOptions() {
	return DATA.employees.map(e=> {
		return {text:e.name+' '+e.surname, value:e.id}
	});
}

function clearEmployeesPlaceholder() {
	document.getElementById(PLACEHOLDER).innerHTML = "";
}

function removeEmployeeUI(id) {
	removeEmployee(id);
	showEmployees(DATA.employees);
}

function showEmployees(employees) {
	clearEmployeesPlaceholder();
	const ul = document.createElement("ul");
	for (let employee of employees) {
		const li = document.createElement("li");
		ul.appendChild(li);
		li.innerHTML = employee.name+" "+employee.surname;
		if (employee.managerRef) {
			let manager = findById(employee.managerRef);
			const managerSpan = document.createElement("span");
			const managerSelect = document.createElement("select");
			fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
			managerSelect.addEventListener('change',
				() => employee.managerRef=managerSelect.value);
			managerSpan.innerHTML = " <b>Manager:</b> ";
			li.appendChild(managerSpan);
			li.appendChild(managerSelect);
		}
		const removeButton = document.createElement("button");
		removeButton.innerHTML = "X";
		removeButton.addEventListener('click',
			() => removeEmployeeUI(employee.id));
		li.appendChild(removeButton);
	}
	document.getElementById(PLACEHOLDER).appendChild(ul);
}


function searchEmployeeUI() {
	const name = document.getElementById("nameSearch").value;
	const surname = document.getElementById("surnameSearch").value;
	const managerRef = document.getElementById("managerSearch").value;
	const employees  = searchEmployees(name, surname, managerRef);
	showEmployees(employees);
}

function openTab(evt, id) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(id).style.display = "block";
	evt.currentTarget.className += " active";
}

function assignSendOnEnter(paneId, buttonId) {
	let allInput = document.querySelectorAll("#"+paneId+" input");
	for (let input of allInput) {
		input.addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				document.getElementById(buttonId).click();
			}
		});
	}
}
