function randNumbers(numberOfNumbers,max){
	const numbers=[];
	for (i=0;i<numberOfNumbers;i++) {
		const los = Math.floor(Math.random() * max + 1);
		isNumberInArray = false;
		for (j=0;j<numbers.length;j++){
			if (numbers[j]==los) isNumberInArray=true;
		}
		isNumberInArray ? i--: numbers[i] = los;
	}
	return numbers;
}
class LottoDraw
{
	constructor () {
		this.maxNumbers=42;
		this.numberOfNumbers=6;
		//==========================================================================
		this.selectNumbers=[];
		this.numberOfHits=0;
		//==========================================================================
		this.numbersContainer = document.querySelector('.numbersContainer');
		this.drawButton = document.querySelector('#start');
		this.resetButton = document.querySelector('#reset');
		this.loader=document.querySelector('.loader');
		this.drawNumbers=document.querySelector('.drawNumbers');
		this.numberOfHitsContainer=document.querySelector('#numberOfHits');
		//==========================================================================
		this.startLotto();
		this.showDrawNumbers();
		this.selectLottoNumbers();
		this.resetLotto();
	}
	startLotto(){
		const parent=this;
		this.drawButton.addEventListener('click', function () {
			if (parent.selectNumbers.length===parent.numberOfNumbers) {
				this.numbersContainer.innerHTML='';
				this.numberOfHits=0;
				this.loader.style.display = "block";
				this.resetButton.style.display = "block";
				this.drawButton.style.display = 'none';
				const number=randNumbers(this.numberOfNumbers,this.maxNumbers);
				for (i = 0 ; i < number.length; i++) {
					this.delayAddNumber(number,i,number.length-1);
				}
			}else{
				alert('musisz wybrac '+parent.numberOfNumbers+' liczb');
			}
		}.bind(this));
	}
	delayAddNumber(constnumber,index,lastElement){
		setTimeout(function() {
			this.addNumber('div',constnumber[index]);
			if(index==lastElement) {
				this.drawButton.style.display = 'block';
				this.loader.style.display = "none";
				this.numberOfHitsContainer.innerHTML=`trafiono ${this.numberOfHits}`;
			}
		}.bind(this), index * 100);
	}
	addNumber(addMarker, number){
		const elem = document.createElement(addMarker);
		//================================================================================
		for (i = 0 ; i < this.selectNumbers.length; i++) {
			if (this.selectNumbers[i]==number) {
				elem.classList.add("findedNumber");
				this.numberOfHits++;
			}
		}
		//================================================================================
		elem.textContent = number;
		this.numbersContainer.appendChild(elem);
	}
	showDrawNumbers(){
		let addData='';
		//================================================================================
		for (let i=1; i<=this.maxNumbers; i++){
			addData = addData + `<div class="selectedNumber" data-id="${i}">${i}</div>`;
		}
		//================================================================================
		this.drawNumbers.innerHTML=addData;
	}
	selectLottoNumbers(){
		const number=document.querySelectorAll('.selectedNumber');
		const parent=this;
		//================================================================================
		number.forEach(function (item) {
			item.addEventListener('click', function () {
				const index=parent.selectNumbers.indexOf(this.getAttribute('data-id'));
				if (index == -1) {
					if (parent.selectNumbers.length < parent.numberOfNumbers) {
						this.classList.add("selectedNumberActive");
						parent.selectNumbers.push(this.getAttribute('data-id'))
					}else{
						alert('mozesz max wybrac '+parent.numberOfNumbers+' liczb');
					}
				}else{
					this.classList.remove("selectedNumberActive");
					parent.selectNumbers.splice(index,1);
				}
			});
		});
	}
	resetLotto(){
		this.resetButton.addEventListener('click', function () {

		this.resetButton.style.display = "none";
		this.selectNumbers=[];
		this.numberOfHitsContainer.innerHTML='';
		this.numbersContainer.innerHTML='';
		//====================================================
		const number=document.querySelectorAll('.selectedNumber');
		number.forEach(function (item) {
			item.classList.remove("selectedNumberActive");
		});
		}.bind(this));
	}
}
window.onload = function() {
	const Lotto = new LottoDraw();
};