const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector(".exchange");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(currCode);
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newoption.selected="selected";
        }
        select.appendChild(newoption);
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target)
        })

    }

}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;

    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data= await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount=rate * amountVal;
    msg.innerText=`${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


})