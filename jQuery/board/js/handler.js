init();

// 최초 셋팅
function init() {

    document.getElementById('resetBtn').addEventListener('click', function (e) {
        document.querySelector('input[name="keyword"]').value = '';
    });

    // 검색
    $('button#searchBtn').on('click', searchBoardInfo);

    // 초기화
    document.getElementById('initBtn').addEventListener('click', formInit);

    // 저장, 수정
    $('button#saveBtn').on('click', addBoardInfo);

    // 삭제
    $('button#delBtn').on('click', deleteBoardInfo);

    getBoardList();
}

// 초기화
function formInit() {
    let insertList = document.querySelectorAll('#info input');
    insertList.forEach(el => el.value = '');
}

function getBoardList() {
    $.ajax(`http://192.168.0.11:8099/boardList`)
        .done(result => {
            // 서버가 응답한 데이터를 확인
            addTbody(result);
        })
        .fail(err => console.log(err));
}

function addTbody(list) {
    $('table#empList tbody').empty();

    $.each(list, function (idx, info) {
        let trTag = $('<tr></tr>');

        trTag.on('click', function (event) {
            let trTag = event.currentTarget;
            let selectId = trTag.firstElementChild.textContent;
            findBoardNo(selectId);
        });

        // 번호
        let tdTag = $('<td></td>');
        tdTag.text(info.boardNo);
        trTag.append(tdTag);
        // 제목
        tdTag = $('<td></td>');
        tdTag.text(info.boardTitle);
        trTag.append(tdTag);
        // 작성자
        tdTag = $('<td></td>');
        tdTag.text(info.boardWriter);
        trTag.append(tdTag);
        // 작성일
        tdTag = $('<td></td>');
        tdTag.text(info.boardRegdate);
        trTag.append(tdTag);

        $('table#empList tbody').append(trTag);
    })
}

function findBoardNo(boardNo) {
    $.ajax(`http://192.168.0.11:8099/boardInfo?boardNo=${boardNo}`)
        .done(result => {
            getBoardInfo(result);
        })
        .fail(err => console.log(err));
}

function getBoardInfo(board) {
    $(`#info [name="boardNo"]`).val(board.boardNo);
    $(`#info [name="boardTitle"]`).val(board.boardTitle);
    $(`#info [name="boardWriter"]`).val(board.boardWriter);
    $(`#info [name="boardContent"]`).val(board.boardContent);
    $(`#info [name="boardRegdate"]`).val(board.boardRegdate);
}

function addBoardInfo(event) {
    let boardInfo = formBoardInfo();
    if ($('#info [name="boardNo"]').val() == '') {

        $.ajax(`http://192.168.0.11:8099/boardInsert`, {
                type: 'post',
                data: boardInfo
            })
            .done(result => {
                $('table#info input[name="boardNo"]').val(result.boardNo);
                getBoardList()
            })
            .fail(err => console.log(err));
    } else if ($('#info [name="boardNo"]').val() != '') {

        $.ajax('http://192.168.0.11:8099/boardUpdate', {
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(boardInfo)
            })
            .done(result => {
                getBoardList();
            })
            .fail(err => console.log(err));
    }
}

function formBoardInfo() {
    let tags = $('table#info [name]');

    let obj = {};
    tags.each(function (idx, tag) {
        obj[tag.name] = tag.value;
    });
    console.log(obj);
    return obj;
}

function deleteBoardInfo(event) {
    let boardNo = $('#info input[name="boardNo"]').val();

    $.ajax(`http://192.168.0.11:8099/boardDelete?boardNo=${boardNo}`)
        .done(result => {
            if (result == null) {
                alert('삭제완료 안됨');
            } else {
                alert(`${boardNo}, 삭제 완료`)
                let tags = $('#info input');
                tags.each(function (idx, tag) {
                    tag.value = '';
                })
                getBoardList();
            }
        })
        .fail(err => console.log(err));
}

function searchBoardInfo(event) {
    let searchOption = event.currentTarget.parentElement.children[1].value;
    let searchKeyword = event.currentTarget.parentElement.children[2].value;

    $.ajax(`http://192.168.0.11:8099/boardList?${searchOption}=${searchKeyword}`)
        .done(result => {
            addTbody(result);
        })
        .fail(err => console.log(err));
}