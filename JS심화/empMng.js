init();

function init() {
  //초기 세팅
  document.getElementById('init').addEventListener('click', reset);

   // 전체조회 후 화면에 출력
   findAllEmpList();
}
function reset(){
  let init = Array.from(document.getElementsByTagName('input'));

  init.forEach(tag => tag.value = '');
}

function findAllEmpList(){
  fetch('http://192.168.0.11:8099/empList')
  .then(response => response.json())
  .then(result => {
    addEmpList(result);
  })
  .catch(err => console.log(err));
}

function addEmpInfo