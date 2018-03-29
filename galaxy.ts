import {
  compact,
  Dictionary,
  invert,
  map,
  reduce,
  repeat,
  sum,
} from 'lodash';

class Galaxy {
  get symbolValueMapping() {
    return {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    } as Dictionary<number>;
  }

  get valueToSymbolMapping() {
    return invert(this.symbolValueMapping);
  }

  toRoman(num: number, times: number) {
    const one = this.valueToSymbolMapping[1 * times];
    const five = this.valueToSymbolMapping[5 * times];

    if (num < 4) {
      return repeat(one, num);
    }
    // if (num === 4) {
    //   return `${one}${five}`;
    // }
    // if (num === 5) {
    //   return five;
    // }
    //
    if (num >= 4 && num <= 8) {
      return `${repeat(one, 5 - num)}${five}${repeat(one, num - 5)}`
    }

    return `${one}${this.valueToSymbolMapping[10 * times]}`;
    // MCMIII 1000 100 1000 1 1 1
    // I II III IV V VI VII VIII IX X
  }

  romansToNumerals(romans: string) {
    const romansArr = this.splitRomans(romans);
    return sum(map(romansArr, (item: string, index: number) => {
      if (index < romansArr.length - 1
        && this.symbolValueMapping[item] < this.symbolValueMapping[romansArr[index + 1]]) {
        return -this.symbolValueMapping[item];
      }
      return this.symbolValueMapping[item];
    }));
  }

  numeralsToRomans(num: number) {
    const digits = this.splitNumeralsToDigits(num);
    const result = digits.reverse()
      .map((i: string, index: number) => {
        return this.toRoman(Number(i), Math.pow(10, index));
      })
      .reverse();
    return compact(result).join('');
  }

  splitRomans(romans: string) {
    return romans.split('');
  }

  splitNumeralsToDigits(num: number) {
    return String(num).split('');
  }


  get baseUnit() {
    return {
      glob: 'I',
      prok: 'V',
      pish: 'X',
      tegj: 'L',
    } as Dictionary<string>;
  }

  get prices() {
    return {
      silver: galaxy.countUnitPrice('glob glob', 34),
      gold: galaxy.countUnitPrice('glob prok', 57800),
      iron: galaxy.countUnitPrice('pish pish', 3910),
    } as Dictionary<any>;
  }

  getAmount(amount: string) {
    const romanNum = reduce(amount.split(' '), (res: string, item: string) => {
      return `${res}${this.baseUnit[item]}`
    }, '');
    return this.romansToNumerals(romanNum);
  }

  countUnitPrice(amount: string, price: number) {
    if (this.getAmount(amount) <= 0) {
      return;
    }
    return price / this.getAmount(amount);
  }

  getPrice(amount: string, goods: string) {
    const num = this.getAmount(amount);
    return num * this.prices[goods];
  }
}

const galaxy = new Galaxy();
// console.log(galaxy.numeralsToRomans(1903));
console.log(galaxy.numeralsToRomans(34));
console.log(galaxy.romansToNumerals('MCMIII'));
console.log('prices', galaxy.prices);
console.log('pish tegj glob glob ', galaxy.romansToNumerals('XLII'));
console.log('glob prok Silver', galaxy.getPrice('glob prok', 'silver'));
console.log('glob prok Gold', galaxy.getPrice('glob prok', 'gold'));
console.log('glob prok Iron', galaxy.getPrice('glob prok', 'iron'));

// 2 silver = 34 1+1+x = 34
// IV gold = 57800 1+5+ x = 57800
// XX iron = 3910 10+10+x = 3910
// XLII
// XXX
// IV
