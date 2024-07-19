document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector("#main");
  const qna = document.querySelector("#qna");
  const result = document.querySelector("#result");

  const endPoint = 12;
  const select = Array(endPoint).fill(0);

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
    resultImg.src = `img/image-${point}.png`;
    resultImg.alt = point;
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
            select[type]++;
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