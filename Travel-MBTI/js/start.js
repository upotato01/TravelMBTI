document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector("#main"); // id가 "main"인 요소를 선택
  const qna = document.querySelector("#qna"); // id가 "qna"인 요소를 선택
  const result = document.querySelector("#result"); // id가 "result"인 요소를 선택

  const endPoint = 16; // 총 질문 개수를 16으로 설정
  const select = Array(16).fill(0); // 16개의 0으로 초기화된 배열을 생성 (타입 선택 횟수를 기록)

  function calResult() {
    // 성향별 점수를 합산하여 가장 높은 점수를 받은 성향의 인덱스를 반환
    const typeScores = select.reduce((acc, curr, idx) => {
      acc[Math.floor(idx / 4)] += curr; // 4개의 질문마다 성향 점수에 합산
      return acc;
    }, Array(4).fill(0));
    
    return typeScores.indexOf(Math.max(...typeScores)); // 점수가 가장 높은 성향의 인덱스를 반환
  }

  function setResult() {
    let point = calResult(); // 결과 타입의 인덱스를 계산
    const resultName = document.querySelector('.resultname'); // 클래스가 "resultname"인 요소를 선택
    resultName.innerHTML = infoList[point].name; // 해당 타입의 이름을 결과에 표시

    const imgDiv = document.querySelector('#resultImg'); // id가 "resultImg"인 요소를 선택
    imgDiv.innerHTML = ''; // 이미지 초기화
    const resultImg = document.createElement('img'); // 새로운 img 요소를 생성
    resultImg.src = `img/image-${point}.png`; // 해당 타입의 이미지를 설정 (이미지 파일 이름은 image-1.png부터 시작)
    resultImg.alt = infoList[point].name; // 이미지 대체 텍스트 설정
    resultImg.classList.add('img-fluid'); // 클래스 'img-fluid' 추가
    imgDiv.appendChild(resultImg); // imgDiv에 이미지 추가

    const resultDesc = document.querySelector('.resultDesc'); // 클래스가 "resultDesc"인 요소를 선택
    resultDesc.innerHTML = infoList[point].desc; // 해당 타입의 설명을 결과에 표시
  }

  function goResult() {
    qna.classList.add("fadeOut"); // qna 요소에 fadeOut 클래스를 추가 (사라지는 애니메이션)
    setTimeout(() => { // 450ms 후에 실행
      result.classList.add("fadeIn"); // result 요소에 fadeIn 클래스를 추가 (나타나는 애니메이션)
      setTimeout(() => { // 450ms 후에 실행
        qna.style.display = "none"; // qna 요소를 숨김
        result.style.display = "block"; // result 요소를 표시
      }, 450);
      setResult(); // 결과 설정 함수 호출
    }, 450);
  }

  function goNext(qIdx) {
    if (qIdx === endPoint) { // 마지막 질문에 도달했을 경우
      goResult(); // 결과 화면으로 이동
      return;
    }

    const qBox = document.querySelector('.qBox'); // 클래스가 "qBox"인 요소를 선택
    qBox.innerHTML = qnaList[qIdx].q; // 현재 질문을 표시

    const answerBox = document.querySelector('.answerBox'); // 클래스가 "answerBox"인 요소를 선택
    answerBox.innerHTML = ''; // 답변 박스를 초기화

    qnaList[qIdx].a.forEach((a, idx) => { // 현재 질문의 각 답변에 대해 반복
      const answerBtn = document.createElement('button'); // 새로운 버튼 요소를 생성
      answerBtn.classList.add('answerList', 'my-3', 'py-3', 'mx-auto'); // 클래스 추가
      answerBtn.innerHTML = a.answer; // 버튼에 답변 텍스트를 설정
      answerBox.appendChild(answerBtn); // 답변 박스에 버튼 추가

      answerBtn.addEventListener('click', () => { // 버튼 클릭 이벤트 추가
        document.querySelectorAll('.answerList').forEach(btn => { // 모든 답변 버튼을 선택하여
          btn.disabled = true; // 버튼을 비활성화
          btn.classList.add("fadeOut"); // fadeOut 클래스 추가 (사라지는 애니메이션)
        });

        setTimeout(() => { // 650ms 후에 실행
          a.type.forEach(type => { // 선택된 답변의 타입에 대해 반복
            select[type - 1]++; // 해당 타입의 선택 횟수를 증가 (타입은 1부터 16까지 인덱스로 사용되므로 1을 뺌)
          });
          goNext(qIdx + 1); // 다음 질문으로 이동
        }, 650);
      });
    });

    const statusBar = document.querySelector('.statusBar'); // 클래스가 "statusBar"인 요소를 선택
    statusBar.style.width = `${(100 / endPoint) * (qIdx + 1)}%`; // 상태 바의 너비를 현재 진행 상황에 맞게 설정
  }

  function begin() {
    main.classList.add("fadeOut"); // main 요소에 fadeOut 클래스를 추가 (사라지는 애니메이션)
    setTimeout(() => { // 450ms 후에 실행
      qna.classList.add("fadeIn"); // qna 요소에 fadeIn 클래스를 추가 (나타나는 애니메이션)
      setTimeout(() => { // 450ms 후에 실행
        main.style.display = 'none'; // main 요소를 숨김
        qna.style.display = 'block'; // qna 요소를 표시
      }, 450);
      goNext(0); // 첫 번째 질문으로 이동
    }, 450);
  }

  window.begin = begin; // begin 함수를 전역에 노출하여 onclick 속성에서 접근 가능하게 함
});