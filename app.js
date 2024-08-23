const BASE_URL ="https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name === "from" && currcode==="USD"){
            newOption.selected="selected";
    }else if(select.name === "t" && currcode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    console.log(fromCurr.value);
    console.log(toCurr.value);

    
    let response=await fetch(BASE_URL);
    let data= await response.json();
    const conversionRate = data.quotes[toCurr.value.toUpperCase()] / data.quotes[fromCurr.value.toUpperCase()];
    let finalAmount=amtval*conversionRate;
    
    console.log(finalAmount);
    msg.innerText=`${amtval} ${fromCurr.value} = ${Math.floor(finalAmount)} ${toCurr.value} `;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    window.rel

}) 
window.addEventListener("load",()=>{
    updateExchangeRate();
})

