import { menuArray } from "./data.js";
const modal = document.getElementById('modal')
const infoForm = document.getElementById('info-form')


let finalPrice = 0
let orderArray = []
let isEmpty = true
let finalOrder = ''

render()

function render(){
    document.getElementById("food-list").innerHTML = getListHtml()
}

function getListHtml(){

    let listHtml = ``

    menuArray.forEach(function(menu){
        listHtml += `
    <div class="element">
        <img class="food_img" src="${menu.img}" alt="pizza">
        <div class="content">
            <h3 class="food_title">${menu.name}</h3>
            <p class="food_content">${menu.ingredients}</p>
            <p class="food_price">$${menu.price}</p>
        </div>
        <div class="add-btn">
        <button class="add" data-add="${menu.id}">+</button>
        </div>
    </div>
    `
    })

    return listHtml
}

document.addEventListener('click', function(e){
    if(e.target.dataset.add) handleAddClick(e.target.dataset.add)

    else if(e.target.dataset.remove) handleRemoveClick(e.target.dataset.remove)

    else if(e.target.id === 'order-btn') openModal()

    else if(e.target.id === 'modal-close-btn') closeModal()
    
})

function handleAddClick(addId){
    const targetFoodObj = menuArray.filter(function(menu){
        return menu.id == addId
    })[0]
    
    orderArray.push(targetFoodObj)
    isEmpty = false
    document.getElementById("order-list").innerHTML=templateOrder(getOrderHtml(orderArray))

}

function handleRemoveClick(removeId){
    const targetFoodObj = menuArray.filter(function(menu){
        return menu.id == removeId
    })[0]

    const index = orderArray.map(object => object.id).indexOf(targetFoodObj.id)
    orderArray.splice(index, 1)
    if(orderArray.length === 0) isEmpty = true
    document.getElementById("order-list").innerHTML=templateOrder(getOrderHtml(targetFoodObj))
}

function getOrderHtml(orderTarget){
    let orderHtml =``
    finalPrice = 0
    if(!isEmpty){
        orderArray.forEach(function(food){
        orderHtml += `
        <div class="order_line">
            <h3 class="food_title">${food.name}</h3>
            <p class="remove_txt" data-remove="${food.id}">remove</p>
            <p class="food_price_order">$${food.price}</p>
        </div>
        `
        finalPrice += food.price
        })
    }
    return orderHtml
}


function templateOrder(htmlObj){
    finalOrder =''
    if(!isEmpty){
        finalOrder = `
        <h3 class="food_title order_title">Your order</h3>
        ${htmlObj}
        <hr class="separation">

        <div class="result">
            <h3 class="food_title">Total price:</h3>
            <p class="food_price">$${finalPrice}</p>
        </div>

        <button id="order-btn" class="order_btn">Complete order</button>
        `
    }

    return finalOrder
}

function closeModal(){
    modal.style.display = 'none'
}

function openModal(){
    modal.style.display = 'inline'
}

infoForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const infoFormData = new FormData(infoForm)
    const name = infoFormData.get('name')

    finalOrder = `
    <div class="thanks_msg">
            <h1 class="thanks_txt">Thanks ${name}! Your order is on its way!</h1>
    </div>
    `
    orderArray = []
    document.getElementById("order-list").innerHTML = finalOrder
    closeModal()
})