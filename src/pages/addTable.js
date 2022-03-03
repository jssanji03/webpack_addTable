
const validate = require("validate.js");
import { dataTableResponsive } from '../js/component';

let data = []
const formArea = document.querySelector(".js-addForm")
const addFormToList = document.querySelector(".js-addToList-Btn")
const formDate = document.querySelector(".js-date")
const formDept = document.querySelector(".js-dept");
const formCustomer = document.querySelector(".js-customer");
const formAddress = document.querySelector(".js-Address");
const formContent = document.querySelector(".js-content")
const formCheck = document.querySelectorAll("input[name=OK-check]")
const formPublish = document.querySelectorAll("input[name=Options]")
const inputs = document.querySelectorAll("input[type=text],input[type=number],input[type=date],select,textarea");
const constraints = {
        "日期": {
            presence: {
                message: "必填欄位"
            }
        },
        "部門": {
            presence: {
                message: "必填欄位"
            }
        },
        "客戶名稱": {
            presence: {
                message: "必填欄位"
            },
        },
        "地址": {
            presence: {
                message: "必填欄位"
            },
        },
        "內容": {
            presence: {
                message: "必填欄位"
            },
        },
};
    
const addForm = function add() {
    addFormToList.addEventListener("click", checkNewTicket)
}

function handleFormSubmit(formArea, input) {
    const errors = validate(formArea, constraints);// validate the form aainst the constraints
    showErrors(form, errors || {}); // then we update the form to reflect the results
    if (!errors) {
      addNewList();
    }
}

// Updates the inputs with the validation errors
function showErrors(form, errors) {
  // We loop through all the inputs and show the errors for that input
  _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
    // Since the errors can be null if no errors were found we need to handle
    // that
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

function checkNewTicket(e) {
    e.preventDefault();
    if (formDate.value == "" || 
        formDept.value == "" ||
        formCustomer.value == "" ||
        formAddress.value == "" ||
        formContent.value == "" ||
        formCheck.value == "" || 
        formPublish.value == "") {
        inputs.forEach((item) => {
            //呈現在畫面上
            let errors = validate(formArea, constraints)
            if(errors){
                item.nextElementSibling.textContent = "";
                // console.log(Object.keys(errors)) //keys -> 屬性
                Object.keys(errors).forEach(function(keys) {
                    document.querySelector(`[data-message="${keys}"]`).textContent = errors[keys]
                })
            } 
            item.addEventListener("change", () => {
                if(errors){
                item.nextElementSibling.textContent = "";
            }
            })
        })
    }else {
        addNewList()
    }
}
function addNewList() {
    let obj = {}
    obj.id = data.length
    obj.date = formDate.value
    obj.dept = formDept.value
    obj.customer = formCustomer.value
    obj.address = formAddress.value
    obj.content = formContent.value
    obj.check = []
    
    formCheck.forEach((item, i) => {
        if (item.checked == true) {
            obj.check[i]= item.value
        }
    })
    formPublish.forEach((item) => {
        if (item.checked == true) {
            obj.publish = item.value
        }
    })
    data.push(obj)
    console.log(data);
    init()
    dataTableResponsive()
    formArea.reset()
}

function init() {
    let str = "";
    data.forEach(function (items) {
        const tableArea = document.querySelector(".tableArea")
        str += `
                <tr>
                    <td>${items.date}</td>
                    <td>${items.dept}</td>
                    <td>${items.customer}</td>
                    <td>${items.address}</td>
                    <td>${items.content}</td>
                    <td>${items.check}</td>
                    <td>${items.publish}</td>
                </tr>
        `
        tableArea.innerHTML = str;
    })
}

export  { addForm };