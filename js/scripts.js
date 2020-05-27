  var questionIdx = 0; // Номер вопроса
  var answers = []; // Ответы пользователя

  function choosePic(e, val) {	
  	if (e.classList.contains("quiz_option_active")) {
  		e.setAttribute("class", "quiz__option");
  	} else {
  		var body = e.parentElement;
  		body.querySelectorAll("li").forEach(el => {el.setAttribute("class", "quiz__option")});
	  	e.setAttribute("class", "quiz_option_active");
  	}
  	answers[0] = val;
  }

  function next(e) {
  	choose();
  	if (!answers[questionIdx]) {
  		alert("Необходимо выбрать значение!");
  		return;
  	}
  	if (questionIdx === questions.length - 1)
  	{
  		showResult();
  		return;
  		// fin
  	}
  	questionIdx++;
  	createQuestion(questionIdx);
  }

  function prev(e) {
  	if (questionIdx == 0)
  	{
  		return;
  		// back should be disabled
  	}
  	questionIdx--;
  	createQuestion(questionIdx);
  }

  function createQuestion(idx) {
  	var element = document.getElementById("question");
  	element.innerHTML = questions[idx].question;

  	if (questions[idx].type === 0) {
  		createHTMLquestion(idx);
  	}

  	if (questions[idx].type === 1) {
  		createRadio(idx);
  	}
  	
  }

  function createRadio(idx) {
  	var element = document.getElementById("question_body");

  	var radioList = '<ul>';
    var item;
    var input = '';
    for (var i = 0; i < questions[idx].choices.length; i++) {
      item = '<li>';
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[idx].choices[i];
      item += input;
      radioList += item;
    }

    element.innerHTML = radioList;
  }

  function createHTMLquestion(idx) {
  	var element = document.getElementById("question_body");
  	element.innerHTML = questions[idx].choices[0];
  }

  function choose() {
  	if (questions[questionIdx].type !== 0) {
  		var val = document.querySelector('input[name="answer"]:checked');
    	answers[questionIdx] = val && val.value;
	}
  }

  function showResult() {
  	alert(answers);
  }

  var questions = [
  {
  	question: "1. Какой тип сайта Вам нужен?",
  	choices: [`<li class="quiz__option" onclick="choosePic(this, 1)">
				<p class="quiz__heading">Одностраничный - лэндинг с несколькими разделами</p>
				
				<svg width="95" height="64" viewBox="0 0 95 64" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M24.4721 23.5995L22.4874 24.26C22.3052 24.3213 18.8961 25.5235 17.4703 29.5482C16.0016 27.9356 14.3905 27.3643 14.268 27.323L12.251 26.6522V28.7763C12.251 31.0766 11.519 32.5912 10.594 34.1717C8.56781 31.9021 6.29662 31.8393 6.1251 31.8393H4.59362V33.3707C4.59362 38.1703 3.73974 40.6923 2.91526 43.1274L2.91205 43.1369C2.20145 45.2319 1.53066 47.2106 1.53066 50.2169C1.53066 51.612 1.95335 52.7606 2.64098 53.7178C2.05442 53.9935 1.52453 54.3917 1.09265 54.8986C0.218179 55.9277 -0.157034 57.2892 0.0604362 58.6338C0.41574 60.8207 2.43576 62.4686 4.75595 62.4686H8.85113C9.69345 63.4013 10.8987 64.0001 12.251 64.0001H24.5029C25.8552 64.0001 27.0604 63.4013 27.9027 62.4686H31.9979C34.3196 62.4686 36.3381 60.8207 36.6934 58.6353C36.9124 57.2892 36.5357 55.9277 35.6612 54.9001C35.2293 54.3932 34.6995 53.995 34.1129 53.7193C34.8005 52.7606 35.2232 51.612 35.2232 50.2169C35.2232 49.6717 35.1941 49.1693 35.1543 48.6854H94.9509V45.0206L91.4684 41.27C85.1854 34.5058 79.6939 27.1545 75.0043 19.3081C73.2703 17.1752 71.8704 14.6689 70.9024 11.9034C69.0146 8.24456 67.2845 4.49307 65.7441 0.640231L65.4872 0H41.7148L41.4579 0.640231C39.8438 4.67528 38.021 8.61878 36.0155 12.4657L35.2934 14.4262L32.8939 18.0561H32.9337C30.615 22.0302 28.0865 25.8819 25.359 29.5972C24.849 28.4869 24.5029 27.2847 24.5029 25.7134V23.6064L24.4721 23.5995ZM32.1603 31.8393V33.3707C32.1603 34.6801 32.2276 35.8088 32.3379 36.8227L33.6489 35.184C39.6017 27.7426 42.8806 18.3976 42.8806 8.86727H45.9436C45.9436 18.3976 49.2225 27.7426 55.1753 35.184L63.5265 45.6225H71.6878L70.1792 43.8812C59.5431 31.6095 51.0618 17.7682 44.9297 2.7414H43.9128C39.5742 13.3545 33.8801 23.3641 26.9976 32.5376L27.0367 32.6042L27.0369 32.6046C27.1325 32.7673 27.2278 32.9296 27.3208 33.0966C28.9702 31.876 30.4909 31.8393 30.6288 31.8393H32.1603ZM5.81904 44.1013L5.81267 44.1201L5.81165 44.1231C5.15814 46.0515 4.59362 47.7173 4.59362 50.2169C4.59362 51.8663 5.83565 52.9214 7.40388 53.5984C7.41154 53.5999 7.41881 53.601 7.42609 53.6022C7.43336 53.6033 7.44064 53.6045 7.4483 53.606L7.44523 53.6183C9.43003 54.4652 11.9064 54.7102 13.0872 54.7806C12.5696 53.8832 12.251 52.8571 12.251 51.7483C12.251 50.4328 12.686 49.128 13.4747 48.0728L18.3769 41.538L23.2777 48.0728C24.0679 49.128 24.5029 50.4328 24.5029 51.7483C24.5029 52.8556 24.1843 53.8817 23.6682 54.7791C25.7939 54.6489 32.1603 53.946 32.1603 50.2169C32.1603 47.7173 31.5957 46.0515 30.9422 44.1231L30.9412 44.1201L30.9377 44.1097C30.2004 41.9316 29.3787 39.5041 29.1555 35.5286C27.8109 36.5179 26.0343 39.0663 26.0343 45.6225H22.9714C22.9714 40.7493 23.9163 37.619 25.1384 35.5822C24.7923 34.8379 24.3957 34.1242 23.9561 33.3922L23.9551 33.3905L23.9551 33.3905C23.1054 31.9743 22.1748 30.4234 21.7217 28.3628C20.8212 29.2878 19.9084 30.8484 19.9084 33.3707V37.9651H16.8455V36.4337C16.8455 33.9037 15.9327 32.3447 15.0337 31.4212C14.5804 33.4856 13.6493 35.04 12.7978 36.4566C12.7228 36.5838 12.6488 36.7119 12.5747 36.8401L12.5744 36.8406C12.5138 36.9454 12.4532 37.0504 12.3919 37.155C13.2113 39.1444 13.7825 41.8551 13.7825 45.6225H10.7195C10.7195 39.08 8.95068 36.5302 7.59838 35.5362C7.37695 39.502 6.55559 41.9269 5.81904 44.1013ZM15.925 49.9106C15.5314 50.4374 15.314 51.0898 15.314 51.7483C15.314 53.4375 16.6877 54.8113 18.3769 54.8113C20.0662 54.8113 21.4399 53.4375 21.4399 51.7483C21.4399 51.0898 21.2224 50.4374 20.8273 49.9106L18.3769 46.644L15.925 49.9106ZM3.08358 58.1422C3.19844 58.8513 3.93355 59.4057 4.75595 59.4057H7.65658C7.65658 58.5787 7.89242 57.8145 8.27529 57.1437C7.67649 56.9783 7.0884 56.7807 6.52022 56.5495C5.88619 56.4193 5.2399 56.3427 4.59362 56.3427C4.14336 56.3427 3.71761 56.5388 3.4251 56.8833C3.12799 57.231 3.007 57.6782 3.08358 58.1422ZM10.7195 59.4057C10.7195 60.2495 11.4056 60.9371 12.251 60.9371H24.5029C25.3482 60.9371 26.0343 60.2495 26.0343 59.4057C26.0343 58.5618 25.3482 57.8742 24.5029 57.8742H22.9714H13.7825H12.251C11.4056 57.8742 10.7195 58.5618 10.7195 59.4057ZM29.0973 59.4057H31.9979C32.8203 59.4057 33.5539 58.8513 33.6703 58.1422C33.7453 57.6782 33.6244 57.231 33.3288 56.8833C33.0363 56.5388 32.6105 56.3427 32.1603 56.3427C31.5216 56.3427 30.883 56.4132 30.2582 56.5403C29.6823 56.7761 29.085 56.9768 28.477 57.1437C28.8614 57.8145 29.0973 58.5787 29.0973 59.4057ZM33.0975 40.7784C33.3318 41.6131 33.5861 42.3834 33.8418 43.1369C34.1206 43.9593 34.3916 44.7664 34.6198 45.6225H59.6028L52.7847 37.0968C48.8534 32.1823 46.0186 26.4899 44.4136 20.4559C42.8086 26.4883 39.9739 32.1823 36.0426 37.0968L33.0975 40.7784ZM72.4949 41.8765L75.7416 45.6225H91.3305L89.2263 43.3559C78.1598 31.4396 69.438 17.7789 63.2906 2.7414H48.2576C54.2228 17.0085 62.3534 30.1746 72.4949 41.8765Z" fill="#222F5D"/>
				</svg>
			</li>

			<li class="quiz__option" onclick="choosePic(this, 2)">
				<p class="quiz__heading">Небольшой сайт - несколько разделов до 15 страниц</p>
				
				<svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M93 74.4105L89.589 70.737C83.1089 63.7605 77.4884 56.1465 72.7393 48H83.9999V44.4105L80.5889 40.737C69.7723 29.088 61.2957 15.7005 55.3932 0.942L55.0152 0H31.984L31.606 0.942C25.7034 15.699 17.2268 29.088 6.41025 40.737L2.99922 44.4105V48H32.257C29.986 51.8925 27.5094 55.665 24.8379 59.304C24.3384 58.2165 23.9994 57.039 23.9994 55.5V53.4195L22.0254 54.0765C21.8469 54.1365 18.5079 55.314 17.1113 59.256C15.6728 57.6765 14.0948 57.117 13.9748 57.0765L11.9993 56.4195V58.5C11.9993 60.753 11.2823 62.2365 10.3763 63.7845C8.39177 61.5615 6.16725 61.5 5.99925 61.5H4.49923V63C4.49923 67.707 3.66073 70.1775 2.85222 72.5655C2.15621 74.6175 1.49921 76.5555 1.49921 79.5C1.49921 80.8665 1.91321 81.9915 2.58672 82.929C2.01221 83.199 1.49321 83.589 1.0702 84.0855C0.213696 85.0935 -0.153807 86.427 0.0591944 87.744C0.407197 89.886 2.38571 91.5 4.65823 91.5H8.66927C9.49428 92.4135 10.6748 93 11.9993 93H23.9994C25.3239 93 26.5044 92.4135 27.3294 91.5H31.3405C33.6145 91.5 35.5915 89.886 35.9395 87.7455C36.154 86.427 35.785 85.0935 34.9285 84.087C34.5055 83.5905 33.9865 83.2005 33.412 82.9305C34.0855 81.9915 34.4995 80.8665 34.4995 79.5C34.4995 78.966 34.471 78.474 34.432 78H93V74.4105ZM78.3914 42.78L80.4539 45H71.0548C68.5723 40.4655 66.3298 35.7855 64.3932 30.942L64.0152 30H53.9997V5.3235C59.9532 19.131 68.1283 31.7295 78.3914 42.78ZM8.60777 42.78C19.4469 31.1085 27.9894 17.7285 34.0105 3H48.7346C42.8906 16.974 34.9285 29.8695 24.9954 41.331L21.8139 45H6.54525L8.60777 42.78ZM25.7844 45L27.2619 43.2945C37.1245 31.917 45.0806 19.1535 50.9996 5.34V30H40.984L40.606 30.942C38.677 35.7645 36.4435 40.4535 33.952 45H25.7844ZM31.4995 63V61.5H29.9995C29.8645 61.5 28.3749 61.536 26.7594 62.7315C26.6559 62.5455 26.5494 62.3655 26.4429 62.184C33.184 53.199 38.761 43.395 43.0106 33H44.0066C50.0126 47.718 58.3197 61.275 68.7373 73.2945L70.2148 75H62.2212L54.0417 64.776C48.2111 57.4875 44.9996 48.3345 44.9996 39H41.9996C41.9996 48.3345 38.788 57.4875 32.9575 64.776L31.6735 66.381C31.5655 65.388 31.4995 64.2825 31.4995 63ZM5.69324 73.5285C6.41625 71.394 7.22476 69.0165 7.44226 65.121C8.76677 66.0945 10.4993 68.592 10.4993 75H13.4993C13.4993 71.31 12.9398 68.655 12.1373 66.7065C12.2708 66.4785 12.4013 66.249 12.5348 66.0225C13.3688 64.635 14.2808 63.1125 14.7248 61.0905C15.6053 61.995 16.4993 63.522 16.4993 66V67.5H19.4994V63C19.4994 60.5295 20.3934 59.001 21.2754 58.095C21.7194 60.114 22.6314 61.6335 23.4639 63.021C23.8944 63.738 24.2829 64.437 24.6219 65.166C23.4249 67.161 22.4994 70.227 22.4994 75H25.4994C25.4994 68.5785 27.2394 66.0825 28.5564 65.1135C28.7754 69.0135 29.5825 71.3925 30.3055 73.5285C30.946 75.4185 31.4995 77.0505 31.4995 79.5C31.4995 83.1525 25.2639 83.841 23.1819 83.9685C23.6874 83.0895 23.9994 82.0845 23.9994 81C23.9994 79.7115 23.5734 78.4335 22.7994 77.4L17.9993 70.9995L13.1978 77.4C12.4253 78.4335 11.9993 79.7115 11.9993 81C11.9993 82.086 12.3113 83.091 12.8183 83.97C11.6618 83.901 9.23627 83.661 7.29226 82.8315L7.29526 82.8195C7.28026 82.8165 7.26676 82.815 7.25176 82.812C5.71574 82.149 4.49923 81.1155 4.49923 79.5C4.49923 77.0505 5.05274 75.4185 5.69324 73.5285ZM14.9993 81C14.9993 80.355 15.2123 79.716 15.5978 79.2L17.9993 76.0005L20.3994 79.2C20.7864 79.716 20.9994 80.355 20.9994 81C20.9994 82.6545 19.6539 84 17.9993 84C16.3448 84 14.9993 82.6545 14.9993 81ZM4.65823 88.5C3.85273 88.5 3.13272 87.957 3.02022 87.2625C2.94522 86.808 3.06372 86.37 3.35472 86.0295C3.64123 85.692 4.05823 85.5 4.49923 85.5C5.13224 85.5 5.76524 85.575 6.38625 85.7025C6.94275 85.929 7.51876 86.1225 8.10526 86.2845C7.73026 86.9415 7.49926 87.69 7.49926 88.5H4.65823ZM23.9994 90H11.9993C11.1713 90 10.4993 89.3265 10.4993 88.5C10.4993 87.6735 11.1713 87 11.9993 87H13.4993H22.4994H23.9994C24.8274 87 25.4994 87.6735 25.4994 88.5C25.4994 89.3265 24.8274 90 23.9994 90ZM31.3405 88.5H28.4994C28.4994 87.69 28.2684 86.9415 27.8919 86.2845C28.4874 86.121 29.0724 85.9245 29.6364 85.6935C30.2485 85.569 30.874 85.5 31.4995 85.5C31.9405 85.5 32.3575 85.692 32.644 86.0295C32.9335 86.37 33.052 86.808 32.9785 87.2625C32.8645 87.957 32.146 88.5 31.3405 88.5ZM33.1465 72.5655C32.896 71.8275 32.647 71.073 32.4175 70.2555L35.302 66.6495C39.1525 61.836 41.9291 56.259 43.5011 50.3505C45.0731 56.2605 47.8496 61.836 51.7001 66.6495L58.3782 75H33.9085C33.685 74.1615 33.4195 73.371 33.1465 72.5655ZM74.1853 75L71.0053 71.331C61.0722 59.8695 53.1087 46.974 47.2661 33H61.9902C68.0113 47.7285 76.5539 61.1085 87.393 72.78L89.454 75H74.1853Z" fill="#222F5D"/>
				</svg>
			</li>

			<li class="quiz__option" onclick="choosePic(this, 3)">
				<p class="quiz__heading">Крупный сайт - внушительные объемы</p>
				
				<svg width="110" height="85" viewBox="0 0 110 85" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M16.356 74.7368L19.8497 74.1557L20.4308 77.6494L16.9371 78.2305L16.356 74.7368Z" fill="#222F5D"/>
				<path d="M15.1927 67.7513L18.6864 67.1703L19.2678 70.6657L15.7741 71.2468L15.1927 67.7513Z" fill="#222F5D"/>
				<path d="M14.0294 60.7671L17.523 60.186L18.1041 63.6797L14.6105 64.2608L14.0294 60.7671Z" fill="#222F5D"/>
				<path d="M109.896 40.2546L84.0951 7.08333H81.4583H78.8216H69.0625V5.3125C69.0625 2.38354 66.679 0 63.75 0H35.4167C32.4877 0 30.1042 2.38354 30.1042 5.3125V7.08333H25.7267L0 38.3244V42.5H3.8126L10.3063 81.4583H0V85H109.792V81.4583H103.027L109.896 40.2546ZM60.3146 65.9441C66.7923 63.6774 72.2447 59.5691 76.2167 54.3469C73.8455 61.2637 70.3021 67.7769 65.6944 73.5356L60.0614 80.5765L49.2858 69.8009L60.3146 65.9441ZM79.6875 31.875V24.7917H83.2292V31.875H79.6875ZM68.4604 75.7492C74.4423 68.2709 78.733 59.5921 81.0989 50.3926C82.8343 58.8395 86.1564 66.9039 91.0067 74.1802L95.8588 81.4583H63.8952L68.4604 75.7492ZM81.4583 10.625H82.3632L106.147 41.2038L99.574 80.6473L93.9551 72.2181C86.9391 61.6941 83.2292 49.4452 83.2292 36.7961V35.4167H86.7708V21.25H76.1458V35.4167H79.6184C78.9066 47.708 70.8705 58.4977 59.1458 62.6007L56.6667 63.4667V41.3366L80.5534 10.625H81.4583ZM65.5208 5.3125V8.85417C65.5208 9.83167 64.7275 10.625 63.75 10.625C62.7725 10.625 61.9792 9.83167 61.9792 8.85417V5.3125C61.9792 4.335 62.7725 3.54167 63.75 3.54167C64.7275 3.54167 65.5208 4.335 65.5208 5.3125ZM36.2472 14.1667H60.2083L46.9271 31.875H21.4891L36.2472 14.1667ZM33.6458 5.3125C33.6458 4.335 34.4392 3.54167 35.4167 3.54167H58.7633C58.565 4.09771 58.4375 4.68917 58.4375 5.3125V8.85417C58.4375 9.4775 58.565 10.069 58.7633 10.625H35.4167C34.4392 10.625 33.6458 9.83167 33.6458 8.85417V5.3125ZM27.3983 10.625H30.4318C30.8107 11.6875 31.5014 12.6012 32.4169 13.2299L13.9276 35.4167H48.6979L64.708 14.0693C66.5887 13.724 68.108 12.3888 68.7367 10.625H76.0679L54.0299 38.9583H4.06583L27.3983 10.625ZM7.40208 42.5H53.125V64.708L42.7975 68.3241L55.9335 81.4583H13.8957L7.40208 42.5Z" fill="#222F5D"/>
				</svg>
			</li>`],
  	type: 0 // pic
  },
  {
  	question: "2. У вас есть прототип сайта?",
    choices: ['Да, у меня есть прототип', 'Нет, мне нужен сайт с нуля'],
    type: 1 // radio
  }, 
  {
  	question: "3. Сколько страниц будет у сайта?",
  	choices: ['1 страница, лендинг', '2-4 страницы', '5-8 страниц', '9-14 страниц', '15-20 страниц'],
  	type: 1
  },
  {
  	question: "4. Какой функционал?",
  	choices: ['Стандарт: меню, формы заявки, всплывающие окна, виджеты', 
  	'Интернет-магазин / каталог: корзина, карточки товаров (5-10 шт.), сортировка + стандартный функционал',
  	'Анимация на сайте + стандартный функционал'],
  	type: 1
  }];