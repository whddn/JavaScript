init();

function init() {
  // 초기 셋팅 
  // 버튼
  document.getElementById('init')
    .addEventListener('click', formReset);
  document.getElementById('insert')
    .addEventListener('click', empInsertAjax);
  document.getElementById('update')
    .addEventListener('click', empUpdateAjax);
  document.getElementById('del')
    .addEventListener('click', empDelAjax);

  // 전체조회 후 화면에 출력
  findAllEmpList();
}

// 초기화 버튼 클릭시 동작
function formReset(event) {
  // 모든 <input> 태그 탐색
  let inputList = Array.from(document.getElementsByTagName('input'));

  // 각 <input> 태그의 value 속성 초기화
  inputList.forEach(tag => tag.value = '');
}

// 서버에 전체조회를 요청 : AJAX
function findAllEmpList() {
  fetch('http://192.168.0.11:8099/empList')
    .then(response => response.json())
    .then(result => {
      // 사원전체정보를 기준으로 <tbody/> 태그 완성
      addEmpList(result);
    })
    .catch(err => console.log(err));
}

// 사원전체정보를 기준으로 <tbody/> 태그 완성
function addEmpList(list) {
  // DOM에서 사용할 <tbody/> 탐색
  let tbodyTag = document.querySelector('#empList tbody');

  // <tbody/> 태그의 기존 정보 삭제
  tbodyTag.replaceChildren();

  for (let info of list) {
    // 사원 한 사람을 기준으로 <tr/> 태그 생성
    let trTag = addEmpInfo(info);
    // <tbody/> 태그에 추가 => DOM에 등록된 태그에 추가해야지 화면에 출력
    tbodyTag.append(trTag);
  }
}

// 사원 한 사람을 기준으로 <tr/> 태그 생성
function addEmpInfo(info) {
  // 새로운 <tr/> 태그 생성
  let trTag = document.createElement('tr');
  // <tr/> 태그의 이벤트 처리
  trTag.addEventListener('click', getEmpInfo);

  // 사원의 개별 정보를 <td/> 태그로 생성

  // 1) 사원번호
  // <td/> 태그 생성
  let tdTag = document.createElement('td');
  // <td/> 태그의 텍스트 속성 변경
  tdTag.textContent = info.employeeId; // 사원 정보 중 사원번호
  // <tr/> 태그에 추가
  trTag.append(tdTag);

  // 2) 이름
  tdTag = document.createElement('td');
  tdTag.textContent = info.lastName; // 사원 정보 중 이름
  trTag.append(tdTag);

  // 3) 업무
  tdTag = document.createElement('td');
  tdTag.textContent = info.jobId; // 사원 정보 중 업무
  trTag.append(tdTag);

  return trTag;
}

// <tr/> 태그를 click 한 경우 동작
function getEmpInfo(event) {
  // 선택한 <tr/> 태그에서 사원번호 가져오기
  let trTag = event.currentTarget;
  let firstTdTag = trTag.firstElementChild;
  let employeeId = firstTdTag.textContent;

  // 사원번호를 기준으로 서버에 단건조회 요청
  findEmpInfoByEmployeeId(employeeId);
}

// 사원번호를 기준으로 서버에 단건조회 요청 : AJAX
function findEmpInfoByEmployeeId(empId) {

  fetch(`http://192.168.0.11:8099/empInfo?employeeId=${empId}`)
    .then(response => response.json())
    .then(result => {
      // 사원정보를 <input> 태그에 출력
      displayEmpInfo(result);
    })
    .catch(err => console.log(err));
}

function displayEmpInfo(emp) {
  // 사원이 가진 정보를 각 <input> 태그에 출력하기
  document.getElementsByName('employeeId')[0].value = emp.employeeId; // 사원 정보 중 사원번호
  document.getElementsByName('lastName')[0].value = emp.lastName; // 사원 정보 중 이름
  document.getElementsByName('email')[0].value = emp.email; // 사원 정보 중 이메일
  document.getElementsByName('hireDate')[0].value = emp.hireDate; // 사원 정보 중 입사일자
  document.getElementsByName('jobId')[0].value = emp.jobId; // 사원 정보 중 업무

  // let tagList = document.querySelectorAll('#empInfo input');
  // tagList.forEach(tag => {
  //   tag.value = emp[tag.name];
  // });
}

// 등록 버튼을 클릭할 경우 동작
function empInsertAjax(event) {
  // 새로운 값인지 확인
  let empIdTag = document.getElementsByName('employeeId')[0];
  if (empIdTag.value != '') {
    alert('새로운 정보가 아닙니다.');
    return; // 함수 종료
  }

  // 현재 입력된 자료 가져오기
  let empInfo = formEmpInfo();

  // 새로 등록할 정보를 서버에 전송 : AJAX
  fetch('http://192.168.0.11:8099/empInsert', {
      method: 'post',
      // content-type : application/x-www-form-urlencoded 일 경우
      body: new URLSearchParams(empInfo)
    })
    .then(response => response.json())
    .then(result => {
      // 서버가 응답한 정보 중 사원번호를 <input> 태그에 출력
      empIdTag.value = result.employeeId;
      // 전체조회 후 화면에 출력
      findAllEmpList();
    })
    .catch(err => console.log(err));
}

function formEmpInfo() {
  // 서버에 전송할 객체 생성
  let empObj = {};

  // 각 <input> 태그가 가진 사원이 가진 정보를 객체에 담기
  empObj.employeeId = document.getElementsByName('employeeId')[0].value;
  empObj.lastName = document.getElementsByName('lastName')[0].value;
  empObj.email = document.getElementsByName('email')[0].value;
  empObj.hireDate = document.getElementsByName('hireDate')[0].value;
  empObj.jobId = document.getElementsByName('jobId')[0].value;

  return empObj;
}

// 수정 버튼을 클릭할 경우 동작
function empUpdateAjax(event) {
  // 새로운 값인지 확인
  let empIdTag = document.getElementsByName('employeeId')[0];
  if (empIdTag.value == '') {
    alert('수정할 수 있는 정보가 아닙니다.');
    return; // 함수 종료
  }

  // 현재 입력된 자료 가져오기
  let empInfo = formEmpInfo();

  // 수정할 정보를 서버에 전송 : AJAX
  fetch('http://192.168.0.11:8099/empUpdate', {
      method: 'post',
      // content-type : application/json 일 경우
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(empInfo)
    })
    .then(response => response.json())
    .then(result => {
      // 전체조회 후 화면에 출력
      findAllEmpList();
    })
    .catch(err => console.log(err));
}

// 삭제 버튼을 클릭할 경우 동작
function empDelAjax(event) {
  // 새로운 값인지 확인
  let empId = document.getElementsByName('employeeId')[0].value;
  if (empId == '') {
    alert('삭제할 수 있는 정보가 아닙니다.');
    return; // 함수 종료
  }

  // 삭제할 사원 정보를 서버에 전송 : AJAX
  fetch(`http://192.168.0.11:8099/empDelete?employeeId=${empId}`)
    .then(response => response.json())
    .then(result => {
      // 모든 <input> 태그 초기화
      formReset();
      // 전체조회 후 화면에 출력
      findAllEmpList();
    })
    .catch(err => console.log(err));
}