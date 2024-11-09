// Regular expressions for validation
var strRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
var digitRegex = /^\d+$/;
// Form and element types
var mainForm = document.getElementById('cv-form');
var validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};
// User input elements
var firstnameElem = mainForm.firstname, middlenameElem = mainForm.middlename, lastnameElem = mainForm.lastname, imageElem = mainForm.image, designationElem = mainForm.designation, addressElem = mainForm.address, emailElem = mainForm.email, phonenoElem = mainForm.phoneno, summaryElem = mainForm.summary;
// Display elements
var nameDsp = document.getElementById('fullname_dsp'), imageDsp = document.getElementById('image_dsp'), phonenoDsp = document.getElementById('phoneno_dsp'), emailDsp = document.getElementById('email_dsp'), addressDsp = document.getElementById('address_dsp'), designationDsp = document.getElementById('designation_dsp'), summaryDsp = document.getElementById('summary_dsp'), projectsDsp = document.getElementById('projects_dsp'), achievementsDsp = document.getElementById('achievements_dsp'), skillsDsp = document.getElementById('skills_dsp'), educationsDsp = document.getElementById('educations_dsp'), experiencesDsp = document.getElementById('experiences_dsp');
// Fetch values from repeaters
var fetchValues = function (attrs) {
    var nodeLists = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nodeLists[_i - 1] = arguments[_i];
    }
    var tempDataArr = [];
    var _loop_1 = function (i) {
        var dataObj = {};
        nodeLists.forEach(function (nodeList, j) {
            dataObj[attrs[j]] = nodeList[i].value;
        });
        tempDataArr.push(dataObj);
    };
    for (var i = 0; i < nodeLists[0].length; i++) {
        _loop_1(i);
    }
    return tempDataArr;
};
var getUserInputs = function () {
    var achievementsTitleElem = document.querySelectorAll('.achieve_title'), achievementsDescriptionElem = document.querySelectorAll('.achieve_description'), expTitleElem = document.querySelectorAll('.exp_title'), expOrganizationElem = document.querySelectorAll('.exp_organization'), expLocationElem = document.querySelectorAll('.exp_location'), expStartDateElem = document.querySelectorAll('.exp_start_date'), expEndDateElem = document.querySelectorAll('.exp_end_date'), expDescriptionElem = document.querySelectorAll('.exp_description'), eduSchoolElem = document.querySelectorAll('.edu_school'), eduDegreeElem = document.querySelectorAll('.edu_degree'), eduCityElem = document.querySelectorAll('.edu_city'), eduStartDateElem = document.querySelectorAll('.edu_start_date'), eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'), eduDescriptionElem = document.querySelectorAll('.edu_description'), projTitleElem = document.querySelectorAll('.proj_title'), projLinkElem = document.querySelectorAll('.proj_link'), projDescriptionElem = document.querySelectorAll('.proj_description'), skillElem = document.querySelectorAll('.skill');
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem),
    };
};
function validateFormData(elem, elemType, elemName) {
    if (elemType === validType.TEXT && (!strRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    }
    else if (elemType === validType.TEXT_EMP && !strRegex.test(elem.value)) {
        addErrMsg(elem, elemName);
    }
    else if (elemType === validType.EMAIL && (!emailRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    }
    else if (elemType === validType.PHONENO && (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    }
    else if (elemType === validType.ANY && elem.value.trim().length === 0) {
        addErrMsg(elem, elemName);
    }
    else {
        removeErrMsg(elem);
    }
}
function addErrMsg(formElem, formElemName) {
    var errorElem = formElem.nextElementSibling;
    if (errorElem)
        errorElem.innerHTML = "".concat(formElemName, " is invalid");
}
function removeErrMsg(formElem) {
    var errorElem = formElem.nextElementSibling;
    if (errorElem)
        errorElem.innerHTML = "";
}
var showListData = function (listData, listContainer) {
    listContainer.innerHTML = "";
    listData.forEach(function (listItem) {
        var itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        Object.keys(listItem).forEach(function (key) {
            var subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = "".concat(listItem[key]);
            itemElem.appendChild(subItemElem);
        });
        listContainer.appendChild(itemElem);
    });
};
var displayCV = function (userData) {
    nameDsp.innerHTML = "".concat(userData.firstname, " ").concat(userData.middlename, " ").concat(userData.lastname);
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
};
var generateCV = function () {
    var userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};
function previewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function (ofEvent) {
        imageDsp.src = ofEvent.target.result;
    };
}
function printCV() {
    window.print();
}
