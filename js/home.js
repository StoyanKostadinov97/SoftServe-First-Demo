const input=document.getElementsByTagName('input')[0];

const btn=document.getElementsByClassName('btn')[0].children[0];
btn.addEventListener('click',(e)=>{
    
    const city=input.value;
    localStorage.city=city;
    
})

const footerYear=document.getElementById('year');
footerYear.innerText=new Date().getFullYear();