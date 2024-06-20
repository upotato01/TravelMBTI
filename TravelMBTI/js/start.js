document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector("#main");
  const qna = document.querySelector("#qna");
  const result = document.querySelector("#result");

  const endPoint = 16;
  const select = Array(16).fill(0);

  function calResult() {
    return select.indexOf(Math.max(...select));
  }

  function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    const imgDiv = document.querySelector('#resultImg');
    imgDiv.innerHTML = ''; // 이미지 초기화
    const resultImg = document.createElement('img');
    resultImg.src = `img/image-${point + 1}.png`; // 이미지 파일 이름은 image-1.png부터 시작
    resultImg.alt = infoList[point].name;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
  }

  function goResult() {
    qna.classList.add("fadeOut");
    setTimeout(() => {
      result.classList.add("fadeIn");
      setTimeout(() => {
        qna.style.display = "none";
        result.style.display = "block";
      }, 450);
      setResult();
    }, 450);
  }

  function goNext(qIdx) {
    if (qIdx === endPoint) {
      goResult();
      return;
    }

    const qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q;

    const answerBox = document.querySelector('.answerBox');
    answerBox.innerHTML = '';

    qnaList[qIdx].a.forEach((a, idx) => {
      const answerBtn = document.createElement('button');
      answerBtn.classList.add('answerList', 'my-3', 'py-3', 'mx-auto');
      answerBtn.innerHTML = a.answer;
      answerBox.appendChild(answerBtn);

      answerBtn.addEventListener('click', () => {
        document.querySelectorAll('.answerList').forEach(btn => {
          btn.disabled = true;
          btn.classList.add("fadeOut");
        });

        setTimeout(() => {
          a.type.forEach(type => {
            select[type - 1]++; // 타입은 1부터 16까지 인덱스로 사용되므로 1을 뺍니다.
          });
          goNext(qIdx + 1);
        }, 650);
      });
    });

    const statusBar = document.querySelector('.statusBar');
    statusBar.style.width = `${(100 / endPoint) * (qIdx + 1)}%`;
  }

  function begin() {
    main.classList.add("fadeOut");
    setTimeout(() => {
      qna.classList.add("fadeIn");
      setTimeout(() => {
        main.style.display = 'none';
        qna.style.display = 'block';
      }, 450);
      goNext(0);
    }, 450);
  }

  window.begin = begin; // begin 함수를 전역에 노출하여 onclick 속성에서 접근 가능하게 함
});