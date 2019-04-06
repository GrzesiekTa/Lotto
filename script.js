/**
 * rand numbers 
 * 
 * @param int numberOfNumbers
 * @param int max
 * 
 * @returns array
 */
function randNumbers(numberOfNumbers, max) {
    const numbers = [];
    for (i = 0; i < numberOfNumbers; i++) {
        const los = Math.floor(Math.random() * max + 1);
        isNumberInArray = false;
        for (j = 0; j < numbers.length; j++) {
            if (numbers[j] === los)
                isNumberInArray = true;
        }
        isNumberInArray ? i-- : numbers[i] = los;
    }
    return numbers;
}
class LottoDraw {
    /**
     * @param int maxNumbers
     * @param int numberOfNumbers
     */
    constructor(maxNumbers, numberOfNumbers) {
        this.maxNumbers = maxNumbers;
        this.numberOfNumbers = numberOfNumbers;

        this.selectNumbers = [];
        this.numberOfHits = 0;

        this.numbersContainer = document.querySelector('.numbersContainer');
        this.drawButton = document.querySelector('#start');
        this.resetButton = document.querySelector('#reset');
        this.loader = document.querySelector('.loader');
        this.drawNumbers = document.querySelector('.drawNumbers');
        this.numberOfHitsContainer = document.querySelector('#numberOfHits');

        this.startLotto();
        this.showDrawNumbers();
        this.selectLottoNumbers();
        this.resetLotto();
    }
    /**
     * start lotto
     */
    startLotto() {
        const parent = this;
        this.drawButton.addEventListener('click', () => {
            if (parent.selectNumbers.length === parent.numberOfNumbers) {
                this.numbersContainer.innerHTML = '';
                this.numberOfHits = 0;
                this.loader.style.display = "block";
                this.resetButton.style.display = "block";
                this.drawButton.style.display = 'none';
                const randNumbersArray = randNumbers(this.numberOfNumbers, this.maxNumbers);

                for (i = 0; i < randNumbersArray.length; i++) {
                    this.delayShowNumber(randNumbersArray, i, randNumbersArray.length - 1);
                }
            } else {
                alert('musisz wybrac ' + parent.numberOfNumbers + ' liczb');
            }
        });
    }
    /**
     * delay show number 
     * 
     * @param array randNumbers
     * @param int index
     * @param int lastElement
     * 
     * @returns void
     */
    delayShowNumber(randNumbers, index, lastElement) {
        setTimeout(() => {
            this.addNumber('div', randNumbers[index]);
            if (index === lastElement) {
                this.drawButton.style.display = 'block';
                this.loader.style.display = "none";
                this.numberOfHitsContainer.innerHTML = `trafiono ${this.numberOfHits}`;
            }
        }, index * 100);
    }
    /**
     * add number
     * 
     * @param string addMarker
     * @param int number
     * 
     * @returns void
     */
    addNumber(addMarker, number) {
        const elem = document.createElement(addMarker);

        for (i = 0; i < this.selectNumbers.length; i++) {
            if (this.selectNumbers[i] == number) {
                elem.classList.add("findedNumber");
                this.numberOfHits++;
            }
        }

        elem.textContent = number;
        this.numbersContainer.appendChild(elem);
    }
    /**
     * show draw numbers
     * 
     * @returns void
     */
    showDrawNumbers() {
        let addData = '';

        for (let i = 1; i <= this.maxNumbers; i++) {
            addData = addData + `<div class="selectedNumber" data-id="${i}">${i}</div>`;
        }

        this.drawNumbers.innerHTML = addData;
    }
    /**
     * select lotto numbers
     * 
     * @returns void
     */
    selectLottoNumbers() {
        const number = document.querySelectorAll('.selectedNumber');
        const parent = this;

        number.forEach(function (item) {
            item.addEventListener('click', function () {
                const index = parent.selectNumbers.indexOf(this.getAttribute('data-id'));
                if (index === -1) {
                    if (parent.selectNumbers.length < parent.numberOfNumbers) {
                        this.classList.add("selectedNumberActive");
                        parent.selectNumbers.push(this.getAttribute('data-id'))
                    } else {
                        alert('mozesz max wybrac ' + parent.numberOfNumbers + ' liczb');
                    }
                } else {
                    this.classList.remove("selectedNumberActive");
                    parent.selectNumbers.splice(index, 1);
                }
            });
        });
    }
    /**
     * reset action
     */
    resetLotto() {
        this.resetButton.addEventListener('click', () => {
            this.resetButton.style.display = "none";
            this.selectNumbers = [];
            this.numberOfHitsContainer.innerHTML = '';
            this.numbersContainer.innerHTML = '';

            const selectedNumber = document.querySelectorAll('.selectedNumber');

            selectedNumber.forEach(function (item) {
                item.classList.remove("selectedNumberActive");
            });
        });
    }
}
//init lotto
window.onload = function () {
    const Lotto = new LottoDraw(42, 6);
};