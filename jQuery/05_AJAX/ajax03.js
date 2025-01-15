function jQueryFun(selector){
  return{
    tagList : document.querySelectorAll(selector),
    val : function (data){
      this.tagList.forEach(tag => {
        tag.value = data;
      })
    },
    text : function (data){
      this.tagList.forEach(tag => {
        tag.textContent  = data;
      })
    }
  }
}

init();

// 초기 셋팅
function init() {

  // 초기화 버튼
  $('button#init').on('click', function (event) {
    $('table#empInfo [name]').val('');
  })

  // 등록
  $('button#insert').on('click', addEmpInfo);

  // 수정
  $('button#update').on('click', updateUserInfo);

  // 삭제
  $('button#delete').on('click',deleteInfo);

  // 전체조회
  findAllEmpList();
}

function findAllEmpList() {
  $.ajax(`http://192.168.0.11:8099/empList`)
    .done(result => {
      addEmpList(result);
    })
    .fail(err => console.log(err));
}

function addEmpList(list) {
  $('table#empList tbody').empty(); // 자식요소 전부 제거

  $.each(list, function (idx, info) {
    let trTag = $('<tr></tr>');

    trTag.on('click', getUserInfo)

    // 1) 사원번호
    let tdTag = $('<td></td>');
    tdTag.text(info.employeeId);
    trTag.append(tdTag);

    // 2) 이름
    tdTag = $('<td></td>');
    tdTag.text(info.lastName);
    trTag.append(tdTag);

    // 3) 업무
    tdTag = $('<td></td>');
    tdTag.text(info.jobId);
    trTag.append(tdTag);

    $('table#empList tbody').append(trTag);
  })
}

function addEmpList(list) {

  $.each(list, function (idx, info) {
    let trTag = $('<tr></tr>').on('click', getUserInfo);
    for (let field of ['employeeId', 'lastName', 'jobId']) {
      trTag.append(`<td>${info[field]}</td>`);
    }
    $('table#empList tbody').append(trTag);
  })
}

function getUserInfo(event) {
  let trTag = event.currentTarget;
  let firstTdTag = trTag.firstElementChild;
  let eId = firstTdTag.textContent;

  eId = event.currentTarget.firstElementChild.textContent;
  OneUserList(eId);
};

function OneUserList(empId) {
  $.ajax(`http://192.168.0.11:8099/empInfo?employeeId=${empId}`)
    .done(result => {
      displayEmpInfo(result);
    })
    .fail(err => console.log(err));
}

function displayEmpInfo() {
  let empObj = {};

  empObj.no = $('#empInfo [name="no"]').val();
  empObj.employeeId = $('#empInfo [name="employeeId"]').val();
  empObj.lastName = $('#empInfo [name="lastName"]').val();
  empObj.email = $('#empInfo [name="email"]').val();
  empObj.hireDate = $('#empInfo [name="hireDate"]').val();
  empObj.jobId = $('#empInfo [name="jobId"]').val();

  return empObj;
}

function displayEmpInfo(emp) {
  for (let field in emp) {
    $(`#empInfo [name="${field}"]`).val(emp[field]);
    // document.querySelector(`#empInfo [name=${field}"]`).value = emp[field];
  }
}

function addEmpInfo(event){
  let employeeId = $('table#empInfo input[name="employeeId"]').val();
  if(employeeId != ''){
    alert('새로운 데이터가 아닙니다')
    return;
  }
  // 현재 입력된 자료 가져오기
  let userInfo = formUserInfo();
  // 새로 등록할 정보를 서버에 전송 : AJAX
  $.ajax(`http://192.168.0.11:8099/empInsert`,{
    type : 'post',
    // content-type : application/x-www.form-urlencoded
    data : userInfo
  })
  .done(result =>{
    $('table#empInfo input[name="employeeId"]').val(result.employeeId);
    findAllEmpList();
  })
  .fail(err => console.log(err));
}

function formUserInfo() {
  let tags = $('table#empInfo [name]');

  let obj = {}; 
  tags.each(function(idx, tag){
    obj[tag.name] = tag.value;
  });
  console.log(obj);
  return obj;
}

function updateUserInfo() {
  let userInfo = formUserInfo();

  $.ajax(`http://192.168.0.11:8099/empUpdate`,{
    type : 'post',
    contentType : 'application/json',
    data : JSON.stringify(userInfo)
  })
  .done(result => {
    findAllEmpList();
  })
  .fail(err => console.log(err));
}

function deleteInfo(
  
){

}