
const validate = require("validate.js");
import { dataTableRWD } from '../js/component';

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
const editAreaSave = document.querySelector(".js-editSave")



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

function checkNewTicket(e) {
    e.preventDefault();
    if (formDate.value == "" || 
        formDept.value == "" ||
        formCustomer.value == "" ||
        formAddress.value == "" ||
        formContent.value == "" ||
        formCheck.value == "" || 
        formPublish.value == "") {
        console.log(formAddress.value);
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
let i = 0
function addNewList() {
    let obj = {}
    obj.id = ++i
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
    init()
    dataTableRWD
    formArea.reset()
    console.log("addNewList",data);
}

function init() {
    let str = "";
    data.forEach(function (items) {
        const tableArea = document.querySelector(".tableArea")
        str += `
                <tr data-id="${items.id}">
                    <td>${items.date}</td>
                    <td>${items.dept}</td>
                    <td>${items.customer}</td>
                    <td>${items.address}</td>
                    <td>${items.content}</td>
                    <td>${items.check}</td>
                    <td>${items.publish}</td>
                    <td><i class="fa-solid fa-pen-to-square mx-2 js-edit"data-bs-toggle="modal" data-bs-target="#editModal"></i><i class="fa-solid fa-trash-can js-delete"></i></td>
                </tr>
        `
        tableArea.innerHTML = str;
    })
}
const deletedItem =  () => {
    $(document).on('click', '.js-delete', function (e) {
        const selected = $(this).parents("tr").attr("data-id")
        if (confirm("確定刪除嗎?")) {
            e.target.parentNode.parentNode.remove()
            data = data.filter(function (item) {
                return item.id !== Number(selected)
            })
            console.log("deletedItem",data);
        }
    })
}
const editItem =  () => {
    $(document).on('click', '.js-edit', function (e) {
        const selectedId = $(this).parents("tr").attr("data-id")
        // const currentItem = data[selectedId]
        data.forEach((item, index) => {
            if (item.id == Number(selectedId)) {
                document.querySelector(".js-editDate").value = item.date
                document.querySelector(".js-editDept").value = item.dept
                document.querySelector(".js-editCustomer").value = item.customer
                document.querySelector(".js-editAddress").value = item.address
                document.querySelector(".js-editContent").value = item.content
                document.querySelector(".js-editSave").dataset.id = item.id
                editAreaSave.addEventListener("click", (e) => {
                    const dataID = e.target.getAttribute('data-id');
                    if (item.id == dataID) {
                        item.date = document.querySelector(".js-editDate").value 
                        item.dept = document.querySelector(".js-editDept").value
                        item.customer = document.querySelector(".js-editCustomer").value
                        item.address = document.querySelector(".js-editAddress").value 
                        item.content = document.querySelector(".js-editContent").value
                        init()
                    }
                })
            }
        })
    })
}


export  { addForm,deletedItem,editItem };