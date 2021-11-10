/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./employees/employees-json.js":
/*!*************************************!*\
  !*** ./employees/employees-json.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ 
	employees: [
		{
			id: 1,
			name: "John",
			surname: "Dow",
			department: "IT",
			managerRef: 0
		},
		{
			id: 2,
			name: "Samantha",
			surname: "Smith",
			department: "IT",
			managerRef: 1
		},
		{
			id: 3,
			name: "Duncan",
			surname: "McLeod",
			department: "IT",
			managerRef: 2
		},
		{
			id: 4,
			name: "Samuel",
			surname: "Jackson",
			department: "IT",
			managerRef: 1
		},
		{
			id: 5,
			name: "Arnold",
			surname: "Schwarzenegger",
			department: "Security",
			managerRef: 1
		},
		{
			id: 6,
			name: "Jason",
			surname: "Statham",
			department: "Security",
			managerRef: 5
		},
		{
			id: 7,
			name: "Dolph",
			surname: "Lundgren",
			department: "Security",
			managerRef: 5
		},
		{
			id: 8,
			name: "Lena",
			surname: "Heady",
			department: "Sales",
			managerRef: 1
		},
		{
			id: 9,
			name: "Amber",
			surname: "Bird",
			department: "Sales",
			managerRef: 8
		},
		{
			id: 10,
			name: "Gina",
			surname: "Davis",
			department: "Sales",
			managerRef: 8
		}
	]
});


/***/ }),

/***/ "./employees/service.js":
/*!******************************!*\
  !*** ./employees/service.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEmployees": () => (/* binding */ getEmployees),
/* harmony export */   "addEmployee": () => (/* binding */ addEmployee),
/* harmony export */   "removeEmployee": () => (/* binding */ removeEmployee),
/* harmony export */   "findById": () => (/* binding */ findById),
/* harmony export */   "setEmployeeManager": () => (/* binding */ setEmployeeManager),
/* harmony export */   "searchEmployees": () => (/* binding */ searchEmployees)
/* harmony export */ });
/* harmony import */ var _employees_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./employees-json */ "./employees/employees-json.js");


function findByName(name, surname) {
	for (var e of _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees) {
		if ((!name || name.length==0 || e.name===name)
			&& (!surname || surname.length==0 || e.surname===surname)) {
			return e;
		}
	}
}

function getEmployees() {
	return _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees;
}

function addEmployee(name, surname) {
	if (!name || name.length==0 || !surname || surname.length==0) {
		throw new Error("Neither first name nor last name cannot be empty");
	}
	let max = 0;
	for (let e of _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees) {
		if (e.id>max) max = e.id;
	}
	let id = max+1;
	_employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees.push({id,name,surname});
	return id;
}

function removeEmployee(id) {
	let index = 0;
	for (let e of _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees) {
		if (e.id===id) break;
		index++;
	}
	_employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees.splice(index, 1);
}

function showEmployee(employee) {
	const keys = Object.keys(employee);
	console.log("Employee "+employee["name"]+" info: ");
	for (let key of keys) {
		console.log(key+ " = "+employee[key]);
	}
}

function showEmployees() {
	//DATA.employees.forEach(showEmployee);
	for (let e of _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees) {
		showEmployee(e);
	}
}

const employeeMap = {};

function findById(id) {
	if (employeeMap[id]) {
		return employeeMap[id];
	}
	for (var e of _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees) {
		if (id==e.id) {
			employeeMap[id] = e;
			return e;
		}
	}
}

function addPhone(id, phone) {
	const employee = findById(id);
	const phones = employee.phones;
	if (!phones) {
		employee.phones = [];
	}
	employee.phones.push(phone);
}

function setDateOfBirth(id, date) {
	const employee = findById(id);
	employee.dateOfBirth = date;
}

function getAge(id) {
	const employee = findById(id);
	let ageDiff = Date.now() - employee.dateOfBirth.getTime();
	let ageDate = new Date(ageDiff); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(date) {
	let day = date.getDate();
	if (day<10) day = '0'+day;
	let month = date.getMonth();
	if (month<10) month = '0'+month;
	let year = date.getFullYear();
	return day + '.' + month + '.' + year;
}

function getEmployeeInfo(id) {
	const e = findById(id);
	const phones = e.phones?
		`Phone list: ${e.phones}`:'';
	const age = e.dateOfBirth?
		`Age: ${getAge(e.id)}`:'';
	return ` 
		First name: ${e.name}
		Last name: ${e.surname}
		Date of birth: ${formatDate(e.dateOfBirth)}
		${phones} 
		${age}
	`;
}

function getEmployeeJSON(id) {
	const e = findById(id);
	return JSON.stringify(e);
}

function testEmployee() {
	addPhone(133, "555-55-55");
	addPhone(133, "666-66-66");
	setDateOfBirth(133, new Date(2000,1,1))
	const info = getEmployeeInfo(133);
	console.log(info);
}

function setEmployeeManager(id, managerId) {
	const e = findById(id);
	e.managerRef = managerId;
}

function searchEmployees(name, surname, managerRef) {
	let results = [];
	for (let e of _employees_json__WEBPACK_IMPORTED_MODULE_0__["default"].employees) {
		if ((!name || e.name==name) &&
			(!surname || e.surname==surname) &&
			(!managerRef || e.managerRef==managerRef)) {
			results.push(e);
		}
	}
	return results;
}


/***/ }),

/***/ "./employees/ui.js":
/*!*************************!*\
  !*** ./employees/ui.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "runUI": () => (/* binding */ runUI),
/* harmony export */   "addEmployeeUI": () => (/* binding */ addEmployeeUI),
/* harmony export */   "searchEmployeeUI": () => (/* binding */ searchEmployeeUI),
/* harmony export */   "openTab": () => (/* binding */ openTab)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./employees/service.js");



const PLACEHOLDER = "employeesPlaceholder";

function runUI() {
	const employeesOptions = getEmployeesOptions();
	fillSelect(document.getElementById("managerSelect"), employeesOptions);
	employeesOptions.unshift({text:"-----------", value:""});
	fillSelect(document.getElementById("managerSearch"), employeesOptions);
	showEmployees((0,_service__WEBPACK_IMPORTED_MODULE_0__.getEmployees)());
	document.getElementById("searchButton").click();
	assignSendOnEnter("searchPane","searchEmployeesButton");
	assignSendOnEnter("addPane", "addEmployeeButton");
}


function addEmployeeUI() {
	let errorHTML = "";
	const name = document.getElementById("name").value;
	if (name == "") {
		errorHTML += "- First name cannot be empty<br>";
		document.getElementById("name").style.backgroundColor = '#FFEEEE';
	}
        else document.getElementById("name").style.backgroundColor = '';
	const surname = document.getElementById("surname").value;
	if (surname == "") {
		errorHTML += "- Last name cannot be empty<br>";
		document.getElementById("surname").style.backgroundColor = '#FFEEEE';
	}
        else document.getElementById("surname").style.backgroundColor = '';
	document.getElementById("addEmployeeFormErrorMessage")
		.innerHTML = errorHTML;
	if (errorHTML.length != 0) return;
	const id = (0,_service__WEBPACK_IMPORTED_MODULE_0__.addEmployee)(name, surname);
	const managerId = document.getElementById("managerSelect").value;
	(0,_service__WEBPACK_IMPORTED_MODULE_0__.setEmployeeManager)(id, managerId);
	showEmployees(DATA.employees);
	document.getElementById("name").value = "";
	document.getElementById("surname").value = "";

}

function fillSelect(select, values, selectedValue) {
	for (let val of values) {
		const option = document.createElement("option");
		option.text = val.text;
		option.value = val.value;
		if (selectedValue == option.value) option.selected=true;
		select.appendChild(option);
	}
}

function getEmployeesOptions() {
        let options = [];
        for (let e of (0,_service__WEBPACK_IMPORTED_MODULE_0__.getEmployees)()) {
                options.push({ text: e.name + ' ' + e.surname, value: e.id });
        }
        return options;
}

function clearEmployeesPlaceholder() {
	document.getElementById(PLACEHOLDER).innerHTML = "";
}

function removeEmployeeUI(id) {
        (0,_service__WEBPACK_IMPORTED_MODULE_0__.removeEmployee)(id);
        showEmployees((0,_service__WEBPACK_IMPORTED_MODULE_0__.getEmployees)());
        fillSelect(document.getElementById("managerSelect"), getEmployeesOptions());
}

function showEmployees(employees) {
	clearEmployeesPlaceholder();
	const ul = document.createElement("ul");
	for (let employee of employees) {
		const li = document.createElement("li");
		ul.appendChild(li);
		const employeeSpan = document.createElement("span");
                employeeSpan.className = "employee";
		employeeSpan.innerHTML = employee.name + " " + employee.surname;
                li.appendChild(employeeSpan);
		if (employee.managerRef > 0) {
			let manager = (0,_service__WEBPACK_IMPORTED_MODULE_0__.findById)(employee.managerRef);
			const managerSpan = document.createElement("span");
                        managerSpan.className = "manager-span";
			const managerSelect = document.createElement("select");
			fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
			managerSelect.addEventListener('change',
				() => employee.managerRef = managerSelect.value);
			managerSpan.innerHTML = " <b>Manager:</b> ";
			li.appendChild(managerSpan);
			li.appendChild(managerSelect);
		} else {
			const managerSpan = document.createElement("span");
                        managerSpan.className = "manager-span";
			li.appendChild(managerSpan);
			const managerSelect = document.createElement("span");
                        managerSelect.className = "manager-select";
			li.appendChild(managerSelect);
                }
		const removeButton = document.createElement("button");
		removeButton.innerHTML = "Remove";
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
	const employees  = (0,_service__WEBPACK_IMPORTED_MODULE_0__.searchEmployees)(name, surname, managerRef);
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


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    font-family: Verdana;\n}\nbutton,input,select {\n    outline: none;\n    padding: 5px;\n    font-size: 15px;\n    background-color: #f1f1f1;\n    border: none;\n}\n.tab {\n    overflow: hidden;\n    border: 1px solid #ccc;\n    background-color: #f1f1f1;\n}\nul {list-style-type: none;}\nli {margin-bottom: .5rem;}\n.employee {display:inline-block;min-width:12rem;margin-right: 2rem;}\n.manager-span{display:inline-block;min-width:6rem;margin-right: 2rem;text-align:right;}\nselect, .manager-select {display:inline-block;min-width:16rem;margin-right: 2rem;}\n\n/* Style the buttons that are used to open the tab content */\n.tab button {\n    background-color: inherit;\n    border: none;\n    outline: none;\n    cursor: pointer;\n    padding: 10px;\n    transition: 1s;\n    font-size: 13px;\n    margin: 0px;\n}\n\n/* Change background color of buttons on hover */\n.tab button:hover {\n    background-color: #ddd;\n}\n\n/* Create an active/current tablink class */\n.tab button.active {\n    background-color: #fff;\n}\n\n/* Style the tab content */\n.tabcontent {\n    display: none;\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    border-top: none;\n}\n", "",{"version":3,"sources":["webpack://./style.css"],"names":[],"mappings":"AAAA;IACI,oBAAoB;AACxB;AACA;IACI,aAAa;IACb,YAAY;IACZ,eAAe;IACf,yBAAyB;IACzB,YAAY;AAChB;AACA;IACI,gBAAgB;IAChB,sBAAsB;IACtB,yBAAyB;AAC7B;AACA,IAAI,qBAAqB,CAAC;AAC1B,IAAI,oBAAoB,CAAC;AACzB,WAAW,oBAAoB,CAAC,eAAe,CAAC,kBAAkB,CAAC;AACnE,cAAc,oBAAoB,CAAC,cAAc,CAAC,kBAAkB,CAAC,gBAAgB,CAAC;AACtF,yBAAyB,oBAAoB,CAAC,eAAe,CAAC,kBAAkB,CAAC;;AAEjF,4DAA4D;AAC5D;IACI,yBAAyB;IACzB,YAAY;IACZ,aAAa;IACb,eAAe;IACf,aAAa;IACb,cAAc;IACd,eAAe;IACf,WAAW;AACf;;AAEA,gDAAgD;AAChD;IACI,sBAAsB;AAC1B;;AAEA,2CAA2C;AAC3C;IACI,sBAAsB;AAC1B;;AAEA,0BAA0B;AAC1B;IACI,aAAa;IACb,iBAAiB;IACjB,sBAAsB;IACtB,gBAAgB;AACpB","sourcesContent":["* {\n    font-family: Verdana;\n}\nbutton,input,select {\n    outline: none;\n    padding: 5px;\n    font-size: 15px;\n    background-color: #f1f1f1;\n    border: none;\n}\n.tab {\n    overflow: hidden;\n    border: 1px solid #ccc;\n    background-color: #f1f1f1;\n}\nul {list-style-type: none;}\nli {margin-bottom: .5rem;}\n.employee {display:inline-block;min-width:12rem;margin-right: 2rem;}\n.manager-span{display:inline-block;min-width:6rem;margin-right: 2rem;text-align:right;}\nselect, .manager-select {display:inline-block;min-width:16rem;margin-right: 2rem;}\n\n/* Style the buttons that are used to open the tab content */\n.tab button {\n    background-color: inherit;\n    border: none;\n    outline: none;\n    cursor: pointer;\n    padding: 10px;\n    transition: 1s;\n    font-size: 13px;\n    margin: 0px;\n}\n\n/* Change background color of buttons on hover */\n.tab button:hover {\n    background-color: #ddd;\n}\n\n/* Create an active/current tablink class */\n.tab button.active {\n    background-color: #fff;\n}\n\n/* Style the tab content */\n.tabcontent {\n    display: none;\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    border-top: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _employees_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./employees/ui */ "./employees/ui.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./style.css");



window.addEmployeeUI = _employees_ui__WEBPACK_IMPORTED_MODULE_0__.addEmployeeUI;
window.openTab = _employees_ui__WEBPACK_IMPORTED_MODULE_0__.openTab;
window.searchEmployeeUI = _employees_ui__WEBPACK_IMPORTED_MODULE_0__.searchEmployeeUI;
(0,_employees_ui__WEBPACK_IMPORTED_MODULE_0__.runUI)();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map