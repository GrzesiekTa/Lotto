function randNumbers(quantity,max){
	const numbers=[];
	for (i=0;i<quantity;i++) {
	  const los = Math.floor(Math.random() * max + 1);
	  isNumberInArray = false;
	  for (j=0;j<numbers.length;j++){
	  	 if (numbers[j]==los) isNumberInArray=true;
	  }
	  isNumberInArray ? i--: numbers[i] = los;
	}
	return numbers;
}

function addElement(addMarker, number) {
    const parent = document.querySelector('.numbers-container');
    const elem = document.createElement(addMarker);
    elem.textContent = number;
    parent.appendChild(elem);
}

function delayAdd(constnumber,index,lastElement) {
  setTimeout(function() {
    addElement('div',constnumber[index]);

    if(index==lastElement) { 
    	document.querySelector('#start').disabled=false;
    }
  }, index * 500);
}

document.querySelector('#start').addEventListener('click', function () {
	this.disabled = true;
	document.querySelector('.numbers-container').innerHTML='';
	const number=randNumbers(6,42);
	for (index = 0; index < number.length; ++index) {
	   	delayAdd(number,index,number.length-1);
	}
}, true);