const input = document.querySelectorAll('.form-input')
const err = document.querySelectorAll('.err')
const formBtn = document.querySelector('.addons3 .btn.right')
const btn = document.querySelectorAll('.top .btn.right')
const nextPage = document.querySelectorAll('.top')
const nextSection = document.querySelectorAll('.round')
// const visible = document.querySelector('.visible')
const submit = document.getElementById('formSubmit')
const addToArr = document.getElementById('addToArr')
const checkedInput = document.getElementById('checkedInput')
const yearlyDisplay = document.querySelectorAll('.monthly')
const packageSelected = document.querySelectorAll('.package')
const toggler = document.getElementById('switch')
const tickInput = document.querySelectorAll('.tick')
const selectContainer = document.querySelectorAll('.extras')
const priceType = document.querySelectorAll('.price .fig')
const priceTypeDays = document.querySelectorAll('.price .days')
const planName = document.querySelectorAll('.name-type')
const addOnPackage = document.querySelectorAll('.addon-type')
const addOnPackagePrice = document.querySelectorAll('.priceFixed')
const packageDuration = document.querySelectorAll(' .packageDuration')
const addOnBtn = document.getElementById('addOnBtn')
const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
const monthlyDuration = document.querySelector('.duration-type .left').innerHTML
const yearlyDuration = document.querySelector('.duration-type .right').innerHTML
const returnBackToTwo = document.getElementById('returnback2')
const returnBackToStart = document.getElementById('returnStart')
const returnBackToOne = document.getElementById('returnback1')
const chng = document.getElementById('change')
const confirmed = document.getElementById('confirmState')
let index = 0
const num = 0
var dex = 0
let arr = []
let pickOnArr = []

function formValidation () {
  let Index = 0
  for (i = 0; i < input.length; i++) {
    //   checking if input is empty
    if (input[i].value == '' || input[i].value == null) {
      err[i].innerHTML = 'This field is required'
      input[i].style.cssText = 'border-color: var(--Strawberry-red)'
    } else if (input[i].id === 'email') {
      // validating with regEx to know if this is an email
      if (!input[i].value.match(emailPattern)) {
        err[i].innerHTML = 'Not an email'
        input[i].style.cssText = 'border-color: var(--Strawberry-red)'
      } else {
        //   if email fulfils regEx condition
        err[i].innerHTML = ''
        input[i].style.cssText = 'border-color : var(--Light-gray)'
      }
    } else {
      if (input[i].value != '' || input[i].value != null) {
        // resetting input state
        err[i].style.display = 'none'
        input[i].style.cssText = 'border-color : var(--Light-gray)'
        // making present section not visible
        nextPage[Index].classList.replace('visible', 'notVisible')
        nextSection[Index].classList.remove('active')
        //   popping next section
        const newIndex = Index + 1
        nextSection[newIndex].classList.add('active')
        nextPage[newIndex].classList.replace('notVisible', 'visible')
      }
    }
  }
}

function btnClick () {
  submit.addEventListener('click', e => {
    e.preventDefault()
    formValidation()
  })
}

// toggling the switch button and displaying the hidden span text

function switchPlanType () {
  toggler.addEventListener('click', () => {
    if (checkedInput.checked == true) {
      // changing the state of the label text
      toggler.previousElementSibling.classList.remove('switchActive')
      toggler.nextElementSibling.classList.add('switchActive')
      //   to write to the span tag with class Monthly
      yearlyDisplay.forEach(e => {
        e.innerHTML = '2 months free'
      })
      for (let n = 0; n < priceType.length; n++) {
        priceType[0].innerHTML = '90'
        priceType[1].innerHTML = '120'
        priceType[2].innerHTML = '150'
        priceTypeDays[n].innerHTML = 'yr'
      }
    } else {
      if (checkedInput.checked == false) {
        // changing the state of the label text
        toggler.nextElementSibling.classList.remove('switchActive')
        toggler.previousElementSibling.classList.add('switchActive')
        // resetting the span tag to empty
        yearlyDisplay.forEach(e => {
          e.innerHTML = ''
        })
        for (let n = 0; n < priceType.length; n++) {
          priceType[0].innerHTML = '9'
          priceType[1].innerHTML = '12'
          priceType[2].innerHTML = '15'
          priceTypeDays[n].innerHTML = 'mo'
        }
      }
    }
  })
}
//  function selecting the type of payment plan

function planType () {
  let num2 = 0
  for (let i = 0; i < packageSelected.length; i++) {
    packageSelected[i].addEventListener('click', () => {
      // removing the class name from the first selected class
      packageSelected[dex].classList.remove('selected')
      if (num2 < packageSelected.length) {
        // resetting index from zero back to loop index[i]
        dex = i
        let newArr = {
          plan: planName[dex].innerHTML,
          price: priceType[dex].innerHTML,
          type: yearlyDisplay[dex].innerHTML,
          days: priceTypeDays[dex].innerHTML,
          daysFor: '',
          duration: ''
        }
        if (arr.length == 0) {
          //   sending a new value to the array
          arr.push(newArr)
        } else {
          if (arr.length != 0) {
            // just want only one value in the array
            arr.splice(0, 1, newArr)
          }
        }
        // adding the removed class to the selected container
        packageSelected[dex].classList.add('selected')
      }
    })
  }
}
function planSelect () {
  const nIndex = num + 1
  addToArr.addEventListener('click', () => {
    let newArr = {
      plan: planName[dex].innerHTML,
      price: priceType[dex].innerHTML,
      type: yearlyDisplay[dex].innerHTML,
      days: priceTypeDays[dex].innerHTML,
      daysFor: '',
      duration: ''
    }
    if (checkedInput.checked == true) {
      newArr['daysFor'] = 'year'
      newArr['duration'] = 'yearly'
      packageDuration[0].innerHTML = 'yr'
      packageDuration[1].innerHTML = 'yr'
      packageDuration[2].innerHTML = 'yr'
      addOnPackagePrice[0].innerHTML = 10
      addOnPackagePrice[1].innerHTML = 20
      addOnPackagePrice[2].innerHTML = 20
    } else {
      if (checkedInput.checked == false) {
        newArr['daysFor'] = 'month'
        newArr['duration'] = 'monthly'
        packageDuration[0].innerHTML = 'mo'
        packageDuration[1].innerHTML = 'mo'
        packageDuration[2].innerHTML = 'mo'
        addOnPackagePrice[0].innerHTML = 1
        addOnPackagePrice[1].innerHTML = 2
        addOnPackagePrice[2].innerHTML = 2
      }
    }
    console.log(arr)
    checkedInputAddonBox()

    if (arr.length == 0) {
      //   sending a new value to the array
      arr.push(newArr)
      // hide present section
      nextPage[nIndex].classList.replace('visible', 'notVisible')
      nextSection[nIndex].classList.remove('active')
      // show next section
      const newIndex = nIndex + 1
      nextSection[newIndex].classList.add('active')
      nextPage[newIndex].classList.replace('notVisible', 'visible')
    } else {
      if (arr.length != 0) {
        // just want only one value in the array
        arr.splice(0, 1, newArr)
        //   hide current section
        let nIndex = 1
        nextPage[nIndex].classList.replace('visible', 'notVisible')
        nextSection[nIndex].classList.remove('active')
        //   show nextsection
        let newIndex = nIndex + 1
        nextSection[newIndex].classList.add('active')
        nextPage[newIndex].classList.replace('notVisible', 'visible')
      }
    }
  })
}

// giving functionality to the add-on section

function checkedInputAddonBox () {
  for (let j = 0; j < tickInput.length; j++) {
    let newPickOnArr = {
      type: addOnPackage[j].innerHTML,
      amount: addOnPackagePrice[j].innerHTML
    }
    if (tickInput[j].checked) {
      selectContainer[j].style.cssText =
        'border : .1rem solid var(--Purplish-blue)'
      // push already  selected checkbox to arr
      pickOnArr.push(newPickOnArr)
      arr['addOn'] = pickOnArr
    } else {
      selectContainer[j].style.cssText =
        'border : .1rem solid var(--Light-gray)'
    }
  }
}

function addOns () {
  for (let x = 0; x < selectContainer.length; x++) {
    selectContainer[x].addEventListener('click', () => {
      // if checkbox not selected, change state
      let newPickOnArr = {
        type: addOnPackage[x].innerHTML,
        amount: addOnPackagePrice[x].innerHTML
      }
      // check if check box is false
      if (tickInput[x].checked == false) {
        tickInput[x].checked = true
        selectContainer[x].style.cssText =
          'border : .1rem solid var(--Purplish-blue)'
        //   push the new arr
        arr['addOn'].push(newPickOnArr)
      } else {
        //   check if checkbox is true
        if (tickInput[x].checked == true) {
          tickInput[x].checked = false
          selectContainer[x].style.cssText =
            'border : .1rem solid var(--Light-gray)'
          // filter arr to remove unselected then reset filtered
          arr['addOn'] = arr['addOn'].filter(function (el) {
            return el.type != addOnPackage[x].innerHTML
          })
        }
      }
    })
  }
}

function returnBtns () {
  chng.addEventListener('click', () => {
    //   hide current page
    let nIndex = 1
    nextPage[nIndex].classList.replace('notVisible', 'visible')
    nextSection[nIndex].classList.add('active')
    //   move to nextpage
    let newIndex = nIndex + 2
    nextPage[newIndex].classList.replace('visible', 'notVisible')
    nextSection[newIndex].classList.remove('active')
    //   empty arr on return
    arr.addOn.splice(0)
    //   set final output to null
    document.getElementById('final-output-addon').innerHTML = ''
  })

  returnBackToTwo.addEventListener('click', () => {
    //   show to prevPage
    let nIndex = 2
    nextPage[nIndex].classList.replace('notVisible', 'visible')
    nextSection[nIndex].classList.add('active')
    // hide currentpage
    let newIndex = nIndex + 1
    nextPage[newIndex].classList.replace('visible', 'notVisible')
    nextSection[newIndex].classList.remove('active')

    //   resetting final output display to null on return click
    document.getElementById('final-output-addon').innerHTML = ''
  })

  returnBackToStart.addEventListener('click', () => {
    let nIndex = 0
    let newIndex = nIndex + 1
    //   show to prevPage
    nextPage[nIndex].classList.replace('notVisible', 'visible')
    nextSection[nIndex].classList.add('active')
    // hide currentpage
    nextPage[newIndex].classList.add('notVisible')
    nextSection[newIndex].classList.remove('active')
  })

  returnBackToOne.addEventListener('click', () => {
    // show prev pag
    let nIndex = 1
    nextPage[nIndex].classList.replace('notVisible', 'visible')
    nextSection[nIndex].classList.add('active')
    // hide currentpage
    let newIndex = nIndex + 1
    nextPage[newIndex].classList.replace('visible', 'notVisible')
    nextSection[newIndex].classList.remove('active')
    //   resetting arr.addOn to null on return click
    arr.addOn.splice(0)
  })
}
function showSelected () {
  let totalPrice = 0
  // first check if array is empty
  if (arr != 0) {
    //   check if the addOns selected is in the array
    if (arr.addOn != 0) {
      // loop through the addOns
      for (let i = 0; i < arr.addOn.length; i++) {
        let addOn_output = `<div class='middle'>
            <span>${arr.addOn[i].type}</span>
             <span class='span-right'>+$${arr.addOn[i].amount}/${arr[0].days}</span>
        </div>`
        //   display addONs to DOM
        document.getElementById('final-output-addon').innerHTML += addOn_output
      }
      // computing the total amount in the arr.addOn
      for (let w = 0; w < arr.addOn.length; w++) {
        totalPrice += parseInt(arr.addOn[w].amount)
      }
    }
    // changing the html display and computing grandtotal
    let total = `<span>Total (per ${arr[0].daysFor})</span>
                <span class="span-right">+$${
                  parseInt(totalPrice) + parseInt(arr[0].price)
                }/${arr[0].days}</span>`
    //   display to DOM
    document.getElementById('total-price').innerHTML = total
    document.getElementById(
      'final-output-selectedPrice'
    ).innerHTML = `$${arr[0].price}/${arr[0].days}`
    document.getElementById(
      'final-output-selected'
    ).innerHTML = `${arr[0].plan} (${arr[0].duration})`
  }
}

function moveNext () {
  addOnBtn.addEventListener('click', () => {
    const next = 2
    let nIndex = next
    const newIndex = nIndex + 1
    if (nextPage[nIndex].hasChildNodes('visible')) {
      nextPage[nIndex].classList.add('notVisible')
      nextSection[nIndex].classList.remove('active')
      nextPage[newIndex].classList.replace('notVisible', 'visible')
      nextSection[newIndex].classList.add('active')
    }
    showSelected()
  })
  confirmed.addEventListener('click', () => {
    let nIndex = 3
    nextPage[nIndex].classList.replace('visible', 'notVisible')
    nextSection[nIndex].classList.add('active')
    let newIndex = nIndex + 1
    nextPage[newIndex].classList.replace('notVisible', 'visible')
  })
}

switchPlanType()
planType()
planSelect()
addOns()
btnClick()
returnBtns()
moveNext()
