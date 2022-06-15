const lineaSuperiorDisplay=document.querySelector('#lineaSuperior');
const lineaInferiorDisplay=document.querySelector('#lineaInferior');
const espacioSimboloDisplay=document.querySelector('#simbolo');
const numeros=document.querySelectorAll('.num');
const operadores=document.querySelectorAll('.operator');
const clear=document.querySelector('#clear');
const result=document.querySelector('#result');
const del=document.querySelector("#del")

let primerNumero='';
let primerImpresor='';
let segundoNumero='';
let operador='';
let includeOperator=false;
let operatorId='';


//Codigo para los botones de numeros, funciona diferente para antes y despues del operador.
numeros.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        //Codigo para no empezar con el numero cero.
        if(lineaInferiorDisplay.textContent=='' && e.target.textContent==0 )return;
        //Codigo para no repetir el punto(.).
        if(e.target.textContent==='.' && primerNumero.includes('.') || primerNumero.length>11)return;
        //Si la linea superior del display esta vacia, indica que vamos a introducir el primer numero de la operacion.
        if(lineaSuperiorDisplay.textContent==''){
            primerNumero+=e.target.textContent;
            lineaInferiorDisplay.textContent=primerNumero;
        //Si la linea superior tiene contenido, indica que vamos a introducir el segundo numero de la operacion.
        }else if(lineaSuperiorDisplay.textContent!='') {
            //Codigo para no repetir el punto(.).
            if(e.target.textContent==='.' && segundoNumero.includes('.') || segundoNumero.length>11)return;
            primerImpresor=lineaSuperiorDisplay.textContent;
            segundoNumero+=e.target.textContent;
            lineaInferiorDisplay.textContent=segundoNumero;    
        }
    })    
})

//Codigo para cuando se clickea el operador
operadores.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        if(lineaInferiorDisplay.textContent==''&&lineaSuperiorDisplay.textContent=='')return;
        if(lineaInferiorDisplay.textContent!=''&&lineaSuperiorDisplay.textContent!='' && espacioSimboloDisplay!='')return;
        if(e.target.className==='operator'){
            if(includeOperator===false){
                primerImpresor=primerNumero;
                lineaSuperiorDisplay.textContent=primerNumero;
                primerNumero='';
                operador=e.target.textContent;
                espacioSimboloDisplay.textContent=operador;
                includeOperator=true;
                operatorId=e.target.id;
                lineaInferiorDisplay.textContent='';
            }else if(includeOperator===true){
                operador=e.target.textContent;
                espacioSimboloDisplay.textContent=operador;
                operatorId=e.target.id;
                lineaInferiorDisplay.textContent='';
            }
        }
    })
})

//Codigo para activar el calculo cuando se clickea el igual
result.addEventListener('click',()=>{
    calculate();
    segundoNumero='';
})

//Funcion para seleccionar la operacion 
function calculate(){
    let respuesta;
    if(operatorId==='add'){
        respuesta=(Number(primerImpresor)*100+Number(segundoNumero)*100)/100;
    }else if(operatorId==='subtract'){
        respuesta=(Number(primerImpresor)*100-Number(segundoNumero)*100)/100;
    }else if(operatorId==='multiply'){
        respuesta=(Number(primerImpresor)*100*Number(segundoNumero)*100)/10000;
    }else if(operatorId==='divide'){
        respuesta=(Number(primerImpresor)*100/Number(segundoNumero)*100)/10000;
    }
    lineaInferiorDisplay.textContent='';
    espacioSimboloDisplay.textContent='';  
    lineaSuperiorDisplay.textContent=parseFloat(respuesta);  
}

//Codigo para borrar todo
clear.addEventListener('click',()=>{
    lineaInferiorDisplay.textContent='';
    lineaSuperiorDisplay.textContent='';
    espacioSimboloDisplay.textContent='';
    primerNumero='';
    primerImpresor='';
    segundoNumero='';
    operatorId='';
    operador='';
    includeOperator=false;
})



//Codigo para borrar ultimo digito
let newArr=[];
let newArr2=[];
let aux;
let aux2;
del.addEventListener('click',()=>{  
    if(lineaSuperiorDisplay.textContent==''){
        for(let i=0;i<lineaInferiorDisplay.textContent.length;i++){
            newArr.push(lineaInferiorDisplay.textContent[i])
        }
        newArr.pop();
        aux=newArr.join('');
        lineaInferiorDisplay.textContent=aux;
        newArr=[];
        primerNumero=aux;
        primerImpresor=aux;
    }else if(lineaSuperiorDisplay.textContent!=''){
        for(let i=0;i<lineaInferiorDisplay.textContent.length;i++){
            newArr2.push(lineaInferiorDisplay.textContent[i])
        }
        newArr2.pop();
        aux2=newArr2.join('');
        segundoNumero=aux2;
        lineaInferiorDisplay.textContent=aux2;
        newArr2=[];
    }    
})
