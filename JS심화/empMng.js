init();

function init() {
  //초기 세팅
  document.getElementById('init').addEventListener('click', reset);

  document.getElementById('insertBtn')
    .addEventListener('click', addUserInfo);

  document.getElementById('updateBtn')
    .addEventListener('click', updateUserInfo);

  document.getElementById('delBtn')
    .addEventListener('click', deleteUserInfo);

  // 데이터를 가져오는 작업
  getUserList();
};

function reset(){
  
}

// 회원데이터 전체조회
function getUserList() {
  fetch('http://192.168.0.11:8099/empList')
    .then(response => response.json())
    .then(result => {
      addTbody(result);
    })
    .catch(err => console.log(err));
}

function addTbody(list) {
  document.querySelector('#empList tbody').replaceChildren();

  for (let info of list) {
    let trTag = document.createElement('tr');
    trTag.addEventListener('click', function (event) {
      let selectTr = event.currentTarget;
      let selectId = selectTr.children[1].textContent;
      findUserById(selectId);
    });

    //사원번호
    let tdTag = document.createElement('td');
    tdTag.textContent = info.id;
    trTag.append(tdTag);

    //이름
    tdTag = document.createElement('td');
    tdTag.textContent = info.name;
    trTag.append(tdTag);

    //가입일자
    tdTag = document.createElement('td');
    tdTag = textContent = (info.hireDate).slice(0, 10);
    trTag = append(tdTag);

    //직업
    tdTag = document.createElement('td');
    tdTag.tex

    document.querySelector('#empList tbody').append(trTag);

  }
}

function addTrTag(info) {
  let theads = [ 'id', 'name', ]
}