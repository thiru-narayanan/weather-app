//console.log("client side javascript file is loaded");

const searchForm = document.querySelector("form");
const InputText = document.querySelector("input");
const textPara1 = document.querySelector('#text1')
const textPara2 = document.querySelector('#text2')

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  textPara2.textContent='Loading';
  fetch("http://localhost:3001/weather?address="+InputText.value).then((res) => {
    res.json().then((data) => {
        if(data.error){
            console.log(data.error);
            textPara2.textContent=textPara2.textContent +  " " + data.error;
        }else{
            console.log(data.temperature);
            console.log(data.feelslike);
            console.log(data.forecast);
            textPara2.textContent=textPara2.textContent +  " " + data.forecast;
        }
      
    });
  });

  
});
