
// SOAL 1
function printDigitValue(numberString) {
  const digitsString = numberString.replace(/\./g, '');

  for (let i = 0; i < digitsString.length; i++) {
    const digit = digitsString[i];
    let position;
    let value;

    if (digitsString.length - i === 1) {
      position = 'ones';
      value = 1;
    } else if (digitsString.length - i === 2) {
      position = 'tens';
      value = 10;
    } else if (digitsString.length - i === 3) {
      position = 'hundreds';
      value = 100;
    } else if (digitsString.length - i === 4) {
      position = 'thousands';
      value = 1000;
    } else if (digitsString.length - i === 5) {
      position = 'ten thousands';
      value = 10000;
    } else if (digitsString.length - i === 6) {
      position = 'hundred thousands';
      value = 100000;
    } else if (digitsString.length - i === 7) {
      position = 'millions';
      value = 1000000;
    }else if (digitsString.length - i === 8) {
      position = 'millions';
      value = 2000000;
    }


    const digitValue = digit * value;
    document.writeln(digitValue + "<br>");
  }
}
document.writeln("<h3>SOAL 1</h3>")
printDigitValue("9.327.421");

// SOAL 2
function displayNumbers() {
  for (let i = 1; i <= 9; i++) {
    let row = "";
    for (let j = i; j <= 9; j++) {
      row += j + " ";
    }
    document.write(row + "<br>");
  }
}
document.writeln("<h3>SOAL 2</h3>")
displayNumbers()

// SOAL 3
function oddCount(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (i%2 != 0) {
      arr.push(i)
    }
  }
   document.writeln(arr.length + "--->","[", arr ,"]") ;
   console.log(arr.length + "--->","[", arr ,"]") ;
}
document.writeln("<h3>SOAL 3</h3>")
oddCount(7)
document.write("<br>")
oddCount(15)