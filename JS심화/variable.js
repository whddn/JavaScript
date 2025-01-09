/*
  변수 선언
  1) var
    - 호이스팅 : 실제 선언 위치와 상관없이 자유롭게 사용 가능
    - 중복 선언 허용
    - 함수 스코프

*/
console.log(1, text);

text = 'First';
console.log(3, text);

var text = 'Hello';   // 실제 변수 선언 위치
console.log(2, text);

var text = 'Second';
console.log(4, text);

console.clear();

(function funcScope(){
  console.log(i, j);
  for(var i = 1; i <= 3; i++){
    for(var j = 1; j <= 3; j++){
      console.log(`${i} X ${j} = ${(i * j)}`);
    }
  };
  console.log('last', i, j);
})(); 
// console.log(i, j);

/*
  2015년 이후부터 : let, const 추가
   - 공통점 : 변수 선언 후 사용, 중복 선언 불가, 블록 스코프
   - 차이점
    1. let   : 변수 
    2. const : 상수 => Object, Array의 경우 내부 값은 변경가능 
*/
(function blockScope(){
  let x, y;
  for(let i = 1; i <= 3; i++){
    for(let j = 1; j <= 3; j++){
      console.log(`${i} X ${j} = ${(i * j)}`);
      y = j;
    }
    x = i;
  };
  console.log('last', x, y);
})(); 

/*
    변수의 데이터 타입 : NUMBER, STRING, OBJECT, ARRAY, BOOLEAN, 기타
    1) 기본 타입 : NUMBER, STRING, BOOLEAN
    2) 참조 타입 : OBJECT, ARRAY
*/
// 1. 기본 타입
let name = 'Hong Kil-Dong';
let age = 28;
let isChecked = true;

let newName = 'Hong Kil-Dong';
let newAge = 28;
let isSelected = true;

newName = name;
newName = 'Kang Ho-Dong';
console.log(name);
console.log(newName);

// 2. 참조타입
let person = {
  name : 'Hong Kil-Dong',
  age : 28,
  isChecked : true
};

let newPers = person;
newPers.name = 'Han Sang-Kil';
console.log(person);
console.log(newPers);

// == 상수
const x = 1;
// x = 10; // Error Code

const y = {
  id : 'L',
  pwd : 1234
};

y.id = 'K';
y.pwd = 1024;
console.log(y);

// y = {}; // Error Code

/*
 - 값이 존재하지 않는 변수를 사용했을 때
 undefined : 자바스크립트 -> 자동으로 해당 변수에 값이 존재하지 않다고 알려줄 때 사용
 null      : 개발자가 해당 변수의 값을 삭제 
*/

let a;
console.log(a);
let b = null;
console.log(b);