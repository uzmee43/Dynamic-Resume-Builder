// Regular expressions for validation
const strRegex: RegExp = /^[a-zA-Z\s]*$/; // Only letters and spaces
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex: RegExp = /^\d+$/;

// Form and element types
const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
};

// User input elements
const firstnameElem = mainForm.firstname as HTMLInputElement,
    middlenameElem = mainForm.middlename as HTMLInputElement,
    lastnameElem = mainForm.lastname as HTMLInputElement,
    imageElem = mainForm.image as HTMLInputElement,
    designationElem = mainForm.designation as HTMLInputElement,
    addressElem = mainForm.address as HTMLInputElement,
    emailElem = mainForm.email as HTMLInputElement,
    phonenoElem = mainForm.phoneno as HTMLInputElement,
    summaryElem = mainForm.summary as HTMLInputElement;

// Display elements
const nameDsp = document.getElementById('fullname_dsp') as HTMLElement,
    imageDsp = document.getElementById('image_dsp') as HTMLImageElement,
    phonenoDsp = document.getElementById('phoneno_dsp') as HTMLElement,
    emailDsp = document.getElementById('email_dsp') as HTMLElement,
    addressDsp = document.getElementById('address_dsp') as HTMLElement,
    designationDsp = document.getElementById('designation_dsp') as HTMLElement,
    summaryDsp = document.getElementById('summary_dsp') as HTMLElement,
    projectsDsp = document.getElementById('projects_dsp') as HTMLElement,
    achievementsDsp = document.getElementById('achievements_dsp') as HTMLElement,
    skillsDsp = document.getElementById('skills_dsp') as HTMLElement,
    educationsDsp = document.getElementById('educations_dsp') as HTMLElement,
    experiencesDsp = document.getElementById('experiences_dsp') as HTMLElement;

// Fetch values from repeaters
const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement>[]): any[] => {
    const tempDataArr: any[] = [];

    for (let i = 0; i < nodeLists[0].length; i++) {
        const dataObj: any = {};
        nodeLists.forEach((nodeList, j) => {
            dataObj[attrs[j]] = nodeList[i].value;
        });
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

const getUserInputs = (): any => {
    const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>,
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLInputElement>,
        expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>,
        expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>,
        expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>,
        expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>,
        expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>,
        expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLInputElement>,
        eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>,
        eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>,
        eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>,
        eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>,
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>,
        eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLInputElement>,
        projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>,
        projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>,
        projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLInputElement>,
        skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

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

function validateFormData(elem: HTMLInputElement, elemType: string, elemName: string) {
    if (elemType === validType.TEXT && (!strRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.TEXT_EMP && !strRegex.test(elem.value)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.EMAIL && (!emailRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.PHONENO && (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.ANY && elem.value.trim().length === 0) {
        addErrMsg(elem, elemName);
    } else {
        removeErrMsg(elem);
    }
}

function addErrMsg(formElem: HTMLInputElement, formElemName: string) {
    const errorElem = formElem.nextElementSibling as HTMLElement;
    if (errorElem) errorElem.innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem: HTMLInputElement) {
    const errorElem = formElem.nextElementSibling as HTMLElement;
    if (errorElem) errorElem.innerHTML = "";
}

const showListData = (listData: any[], listContainer: HTMLElement) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        Object.keys(listItem).forEach(key => {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        });
        listContainer.appendChild(itemElem);
    });
};

const displayCV = (userData: any) => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
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

const generateCV = (): void => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};

function previewImage() {
    const oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files![0]);
    oFReader.onload = function (ofEvent) {
        imageDsp.src = ofEvent.target!.result as string;
    };
}

function printCV() {
    window.print();
}
