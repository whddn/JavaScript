// 1) 함수 선언문 : 호이스팅, 중복 선언 가능
console.log(firstPlus);

let result = firstPlus(10, 15);
console.log(result);

function firstPlus(x, y) {
  let sum = x + y;
  return sum;
}

function firstPlus() {
  console.log('Overloading');
}

// 2) 함수 표현식 : 선언 이후 사용, 중복 선언 불가
// console.log(secondFunc); // Error 

// result = secondFunc(11, 22); // Error
console.log(result);

const secondFunc = function (x, y) {
  return (x + y);
}

console.log(secondFunc);

result = secondFunc(11, 22);
console.log(result);

// 일급객체 및 일급함수
/*
  일급객체의 조건
  1) 변수에 할당 할 수 있다.
  2) 함수의 매개변수로 전달 받는다. 매개변수(Parameter)
  3) 함수의 결과로 반환 할 수 있다. 인자(Argument)

  일급함수의 조건 => 자바스크립트는 함수를 객체로 취급한다
  1) 변수에 함수를 할당 할 수 있다.
  2) 함수의 매개변수로 다른 함수를 전달 받는다. 매개변수(Parameter)
  3) 함수의 결과로 다른 함수를 반환 할 수 있다. 인자(Argument)
*/

const printMsg = function (msg) {
  if (msg != '') {
    console.log(msg);
    return 'completed!';
  } else {
    return 'fail : No Message';
  }
}

let isSuccessed = printMsg('Hello, JS');
console.log(1, isSuccessed);
isSuccessed = printMsg('');
console.log(2, isSuccessed);

function addMessage(info, funcVar) {
  let newMsg = `New Msg : ${info}`;
  let result = funcVar(newMsg);
  console.log(funcVar, result);
}

addMessage('Today is ...', printMsg);

function newFunction() {
  return function () {
    console.log('새로운 함수');
  }
}

const sampleFunc = newFunction();
console.log(newFunction, sampleFunc);
sampleFunc();

// 일급함수 => 고차함수, 콜백함수, 클로저
// 1) 고차함수 : 함수를 매개변수로 받거나 결과값으로 반환하는 함수
[10, 5, 23, 1].forEach(function (value, index, array) {
  console.log(`${index} : ${value}`);
});
// 2) 콜백함수 : 매개변수로 넘어가는 함수, 함수를 실행하는 주체가 고차함수
// 3) 클로저 : 특정 함수를 생성할 때 선언된 환경을 기억함

// 내부함수(중첩함수)
function outFunc() {
  function inFunc() {
    console.log('내부 함수')
  }
  inFunc();
}
outFunc();
// inFunc(); Error

// 즉시 실행 함수
// 익명함수
(function (x = 9) {
  for (let i = 1; i <= 9; i++) {
    console.log(`${x} X ${i} = ${ x * i}`);
  }
})();

// 생성자 함수
let obj = {
  id: 'Hog',
  pwd: 1234,
  showInfo :  function(){
    console.log(this.id, this.pwd);
  }
};

function User(id, pwd) {
  //필드
  this.id = id;
  this.pwd = pwd;

  // 메서드
  this.showInfo = function(){
    console.log(this.id + ' : ' + this.pwd);
  }
} 

let hong = new User('Hong', 1234); //생성자함수는 앞자리는 대문자, new를 써줘야 객체생성
let kang = new User('Kang', 1111);
console.log(hong);
console.log(kang);
hong.id = 'Kil-Dong';
hong.showInfo();
kang.id = 'KangHan';
kang.showInfo();

// 화살표 함수 : () => {}, 콜백함수에서 가장 많이 사용
[10, 5, 23, 1]
  .forEach((value, index, array) => {
    console.log(`${index} : ${value}`);
  });

// 함수표현식
let testFunc = (id, message) => { return `${id}, ${message}` };
let msg = testFunc('First', 'Wellcomd!');
console.log(msg);
  
// 1. 매개변수가 없는 경우  2. 하나의 값만 반환하는 경우
testFunc = () => `매개변수가 없는 화살표 함수`;
msg = testFunc();
console.log(msg);

// 3. 매개변수가 하나밖에 없는 경우  4. 실행하고자 하는 명령어가 하나인 경우
testFunc = data => console.log(`${data}를 매개변수로 받았습니다`);
testFunc(100);


// 매개변수
// 메서드 오버로딩 X
function logger() {
  for(let arg of arguments){ // arguments : 자동생성, 매개변수들 값 저장
    console.log(arg);
  }
}

logger('a');
logger('a', 'b', 'c');

// Rest 매개변수 : 선언된 매개변수외 추가로 들어오는 값을 저장, 배열
// 매개변수 기본값 : 주어진 인자값이 없는 경우 사용할 값
function plus(x = 0, y = 0, ...rest){
  let sum = x + y;
  for(let num of rest){
    sum += num;
  }
  return sum;
}
console.log(plus(1,1));
console.log(plus(1,2,3,4));
console.log(plus(1));

// Spread문법 : 펼침연산자
let aAry = [1, 2, 3];
let bAry = [9, 8, 7];
let newAry = [ ...bAry, ...aAry];
console.log(newAry);