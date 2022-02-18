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


const addForm = function add() {
    addFormToList.addEventListener("click", addNewList)
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