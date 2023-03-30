"use strict";

const mediaQueryPc = window.matchMedia("(min-width: 1251px");
const mediaQueryTablet = window.matchMedia("(min-width: 768px)");
const mediaQueryMobile = window.matchMedia("(min-width: 0)");

//видео

function findVideos() {
  //поиск видео на странице
  let videos = document.querySelectorAll(".video");

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  //основная функция
  let link = video.querySelector(".video__link");
  let button = video.querySelector(".video__button");
  let id = parseMediaURL(link);

  video.addEventListener("click", () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute("href");
  video.classList.add("video--enabled");
}

function parseMediaURL(link) {
  let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  let url = link.getAttribute("href");
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__media");

  return iframe;
}

function generateURL(id) {
  let query = "?rel=0&showinfo=0&autoplay=1&mute=1";

  return "https://www.youtube.com/embed/" + id + query;
}

findVideos();

// свайп-слайдер------------------------------------------------------------

function swipeSlider(data) {
  const $sliderList = document.getElementById(`${data.listId}`);
  const $sliderItems = $sliderList.querySelectorAll(`.${data.itemsClass}`);
  const $sliderBtnLeft = document.getElementById(`${data.buttonLeftId}`);
  const $sliderBtnRight = document.getElementById(`${data.buttonRightId}`);
  const $indicatorContainer = document.getElementById(`${data.indicatorId}`);
  let xTouch,
    yTouch,
    startTime,
    xDiff,
    yDiff,
    moveTime,
    bgTime,
    numOfVisibleElements,
    numOfSlides,
    elementWidth,
    elementMLeft,
    elementMRight,
    totalWidth;

  function getVisibleElements() {
    if (mediaQueryMobile.matches)
      numOfVisibleElements = data.visibleElementsMobile;
    if (mediaQueryTablet.matches)
      numOfVisibleElements = data.visibleElementsTablet;
    if (mediaQueryPc.matches) numOfVisibleElements = data.visibleElements;

    //изначальное добавление видимости нескольким элементам
    $sliderItems.forEach((element) => element.classList.remove("active"));

    for (let i = 0; i < $sliderItems.length; i++) {
      if (i < numOfVisibleElements) $sliderItems[i].classList.add("active");
    }

    //считаем количество перелистываемых слайдов
    numOfSlides = Math.ceil($sliderItems.length / numOfVisibleElements);
  }

  getVisibleElements();

  //счетчики
  let counter = 0;
  let timeCounter = 0;

  //изначальное отключение левой кнопки
  if (counter === 0 && data.buttonLeftId)
    $sliderBtnLeft.style.visibility = "hidden";
  if (counter === 0 && data.buttonRightId && numOfSlides == 1) {
    $sliderBtnRight.style.visibility = "hidden";
    data.swipeEnable = false;
  }

  if (data.forTestSection) {
    document.getElementById("js--test__progressFill").style.width = `${
      100 / $sliderItems.length
    }%`;
  }

  //функция переключения слайда---------------------
  function goToSlide(n = counter) {
    if (counter < 0) n = 0;
    if (counter >= numOfSlides) n = numOfSlides - 1;

    if (!data.valveOnMargin) {
      //display:none
      $sliderItems.forEach((element) => element.classList.remove("active"));
    } else {
      // или translateX
      $sliderItems.forEach((element) => element.classList.add("active"));
    }

    if (data.indicatorId) {
      $itemsForIndicationArray.forEach((element) =>
        element.classList.remove("active")
      );
      $itemsForIndicationArray.forEach((element) =>
        element.classList.remove("near")
      );
    }

    if (!data.valveOnMargin) {
      // переключение li с помощью display:none

      for (let i = 0; i < $sliderItems.length; i++) {
        if (i >= n * numOfVisibleElements && i < (n + 1) * numOfVisibleElements)
          $sliderItems[i].classList.add("active");
      }
    } else {
      // переключение li с помощью translateX

      elementWidth = $sliderItems[0].offsetWidth;
      elementMLeft = +window
        .getComputedStyle($sliderItems[0])
        .marginLeft.slice(0, -2);
      elementMRight = +window
        .getComputedStyle($sliderItems[0])
        .marginRight.slice(0, -2);
      totalWidth = elementWidth + elementMLeft + elementMRight;

      $sliderList.style.transform = `translateX(-${
        totalWidth * (n * numOfVisibleElements)
      }px)`;
    }

    if (data.buttonLeftId && data.buttonRightId) {
      if (n < 1) {
        //прятать кнопки при граничных значениях
        $sliderBtnLeft.style.visibility = "hidden";
        $sliderBtnRight.style.visibility = "initial";
      } else if (n >= 0 && n < numOfSlides - 1) {
        $sliderBtnLeft.style.visibility = "initial";
        $sliderBtnRight.style.visibility = "initial";
      } else if (n >= numOfSlides - 1) {
        $sliderBtnLeft.style.visibility = "initial";
        $sliderBtnRight.style.visibility = "hidden";
      }
    }

    if (data.indicatorId) {
      $itemsForIndicationArray[n].classList.add("active");
      if ($itemsForIndicationArray[n - 1])
        $itemsForIndicationArray[n - 1].classList.add("near");
      if ($itemsForIndicationArray[n + 1])
        $itemsForIndicationArray[n + 1].classList.add("near");
    }

    if (data.forTestSection) {
      document.getElementById("js--test__progressFill").style.width = `${
        (n + 1) * (100 / $sliderItems.length)
      }%`;
    }

    counter = n;
  }

  if (data.forTestSection) {
    $sliderItems[0].parentNode.addEventListener("click", function (event) {
      if (event.target.classList.contains(`${data.classOfTestButton}`)) {
        counter++;
        goToSlide(counter);
      }
    });
  }

  if (data.buttonLeftId) {
    $sliderBtnLeft.addEventListener("click", function () {
      let currentTime = new Date().getTime();
      if (currentTime - timeCounter > data.timeInterval) {
        counter--;
        goToSlide(counter);
        timeCounter = currentTime;
      }
    });
  }

  if (data.buttonLeftId) {
    $sliderBtnRight.addEventListener("click", function () {
      let currentTime = new Date().getTime();
      if (currentTime - timeCounter > data.timeInterval) {
        counter++;
        goToSlide(counter);
        timeCounter = currentTime;
      }
    });
  }

  if (data.swipeEnable) {
    //прокрутка прикосновением
    $sliderItems[0].parentNode.addEventListener("touchstart", function (event) {
      xTouch = parseInt(event.touches[0].clientX);
      yTouch = parseInt(event.touches[0].clientY);
      startTime = new Date().getTime();
    });
    $sliderItems[0].parentNode.addEventListener("touchmove", function (event) {
      if (!xTouch || !yTouch) return;
      xDiff = xTouch - parseInt(event.touches[0].clientX);
      yDiff = yTouch - parseInt(event.touches[0].clientY);
      moveTime = new Date().getTime();
      if (
        Math.abs(xDiff) > 10 &&
        Math.abs(xDiff) > Math.abs(yDiff) &&
        moveTime - startTime < 50
      ) {
        startTime = 0;
        if (xDiff > 0) {
          bgTime = moveTime;
          counter++;
          goToSlide(counter);
        } else if (xDiff < 0) {
          bgTime = moveTime;
          counter--;
          goToSlide(counter);
        }
      }
    });
  }

  window.addEventListener("orientationchange", function () {
    setTimeout(getVisibleElements, 100);
    setTimeout(goToSlide, 100);
  });
}

// форматы
const $formatSlides = document.querySelectorAll(".format__listWrapper");
const $formatBtns = document.querySelectorAll(".format__button");

function setFormatItem(x) {
  $formatSlides.forEach((element) => element.classList.remove("active"));
  $formatBtns.forEach((element) => element.classList.remove("active"));
  $formatSlides[x].classList.add("active");
  $formatBtns[x].classList.add("active");
}

for (let i = 0; i < $formatSlides.length; i++) {
  $formatBtns[i].addEventListener("click", function () {
    setFormatItem(i);
  });
}

// модальное меню в header

function openModal(data) {
  let $modalMenuOpenButton = document.getElementById(`${data.openBtn}`);
  let $modalMenuWindow = document.getElementById(`${data.modalWindow}`);
  let $modalMenuCloseButton = document.getElementById(`${data.closeBtn}`);

  $modalMenuOpenButton.addEventListener("click", function () {
    $modalMenuWindow.classList.add("active");
  });

  $modalMenuCloseButton.addEventListener("click", function () {
    $modalMenuWindow.classList.remove("active");
  });

  document.addEventListener("click", function (event) {
    if (
      event.target !== $modalMenuWindow &&
      event.target !== $modalMenuOpenButton
    )
      $modalMenuWindow.classList.remove("active");
  });
}

new openModal({
  openBtn: "js--header__menuOpen",
  modalWindow: "js--headerModalWindow",
  closeBtn: "js--header__closeBtn",
});

// Вызов всех слайдеров

if (document.getElementById("js--testList")) {
  new swipeSlider({
    listId: "js--testList",
    itemsClass: "test__item",
    buttonLeftId: false,
    buttonRightId: false,
    visibleElements: 1,
    visibleElementsTablet: 1,
    visibleElementsMobile: 1,
    swipeEnable: false,
    forTestSection: true,
    classOfTestButton: "test__itemNextButton",
    indicatorId: false,
    timeInterval: 1000,
    valveOnMargin: false,
  });

  new swipeSlider({
    listId: "js--teamList",
    itemsClass: "team__item",
    buttonLeftId: "js--team__leftButton",
    buttonRightId: "js--team__rightButton",
    visibleElements: 1,
    visibleElementsTablet: 1,
    visibleElementsMobile: 1,
    swipeEnable: true,
    indicatorId: false,
    timeInterval: 1000,
    valveOnMargin: true,
  });

  new swipeSlider({
    listId: "js--talkList",
    itemsClass: "talk__item",
    buttonLeftId: "js--talk__leftButton",
    buttonRightId: "js--talk__rightButton",
    visibleElements: 3,
    visibleElementsTablet: 2,
    visibleElementsMobile: 1,
    swipeEnable: true,
    indicatorId: false,
    timeInterval: 1000,
    valveOnMargin: true,
  });

  new swipeSlider({
    listId: "js--galleryList",
    itemsClass: "gallery__item",
    buttonLeftId: "js--gallery__leftButton",
    buttonRightId: "js--gallery__rightButton",
    visibleElements: 1,
    visibleElementsTablet: 1,
    visibleElementsMobile: 1,
    swipeEnable: true,
    indicatorId: false,
    timeInterval: 1000,
    valveOnMargin: true,
  });

  new swipeSlider({
    listId: "js--formatList1",
    itemsClass: "format__item1",
    buttonLeftId: "js--format__leftButton1",
    buttonRightId: "js--format__rightButton1",
    visibleElements: 2,
    visibleElementsTablet: 2,
    visibleElementsMobile: 1,
    swipeEnable: true,
    indicatorId: false,
    timeInterval: 500,
    valveOnMargin: true,
  });

  new swipeSlider({
    listId: "js--formatList2",
    itemsClass: "format__item2",
    buttonLeftId: "js--format__leftButton2",
    buttonRightId: "js--format__rightButton2",
    visibleElements: 2,
    visibleElementsTablet: 2,
    visibleElementsMobile: 1,
    swipeEnable: true,
    indicatorId: false,
    timeInterval: 500,
    valveOnMargin: true,
  });

  new swipeSlider({
    listId: "js--formatList3",
    itemsClass: "format__item3",
    buttonLeftId: "js--format__leftButton3",
    buttonRightId: "js--format__rightButton3",
    visibleElements: 2,
    visibleElementsTablet: 2,
    visibleElementsMobile: 1,
    swipeEnable: true,
    indicatorId: false,
    timeInterval: 500,
    valveOnMargin: true,
  });
}

// модальное окно секции "Формат мероприятий" и другие модалки

const modalFormatWindow = document.getElementById("js--modalDescr");
const overlay = document.getElementById("js--modalOverlay");
const testFinalButton = document.getElementById("js--formLast");
const modalTestWindow = document.getElementById("js--modalTest");
const modalThanksWindow = document.getElementById("js--modalThanks");
const modalVideoButton = document.getElementById("js--chooseAbout");
const modalVideoWindow = document.getElementById("js--modalVideo");
const modalGiftWindow = document.getElementById("js--modalGift");
const modalGiftButton = document.getElementById("js--giftButton");
const modalTeamWindow = document.getElementById("js--modalTeam");
const modalTeamButton = document.getElementById("js--teamButton");
const modalProgButton = document.getElementById("js--progButton");
const modalHeaderButton = document.getElementById("js--headerButton");
const modalFooterButton = document.getElementById("js--footerButton");

const loading = document.getElementById("js--loading");

// $(function () {
//   $(".heart").on("click", function () {
//     $(this).toggleClass("is-active");
//   });
// });

document.querySelector(".heart").addEventListener("click", () => {
  document.querySelector(".heart").classList.toggle("is-active");
  console.log("hi");
});

let dataModalFormat = {};

if (document.getElementById("js--format")) {
  const formatSection = document.getElementById("js--format");

  formatSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("format__itemButton")) {
      let buttonParent = event.target.parentNode;

      dataModalFormat.title =
        buttonParent.querySelector(".format__itemTitle").innerHTML;
      dataModalFormat.imgSrc =
        buttonParent.querySelector(".format__itemImg").src;
      dataModalFormat.list =
        buttonParent.querySelector(".format__itemList").innerHTML;
      dataModalFormat.description = buttonParent.querySelector(
        ".format__itemTextFull"
      ).innerHTML;

      modalFormatWindow.querySelector(".modalDescr__title").innerHTML =
        dataModalFormat.title;
      modalFormatWindow.querySelector(".modalDescr__image").src =
        dataModalFormat.imgSrc;
      modalFormatWindow.querySelector(".modalDescr__list").innerHTML =
        dataModalFormat.list;
      modalFormatWindow.querySelector(".modalDescr__text").innerHTML =
        dataModalFormat.description;

      modalFormatWindow.classList.add("active");
      overlay.classList.add("active");
    }
  });
}

overlay.addEventListener("click", function () {
  if (overlay) overlay.classList.remove("active");
  if (modalFormatWindow) modalFormatWindow.classList.remove("active");
  if (modalTestWindow) modalTestWindow.classList.remove("active");
  if (modalThanksWindow) modalThanksWindow.classList.remove("active");
  if (modalVideoWindow) modalVideoWindow.classList.remove("active");
  if (modalGiftWindow) modalGiftWindow.classList.remove("active");
  if (modalTeamWindow) modalTeamWindow.classList.remove("active");
  if (galleryModalWindow) galleryModalWindow.classList.remove("active");
});

if (document.getElementById("js--modalDescr__closeBtn")) {
  document
    .getElementById("js--modalDescr__closeBtn")
    .addEventListener("click", function () {
      modalFormatWindow.classList.remove("active");
      overlay.classList.remove("active");
    });
}

// модалка теста
if (testFinalButton) {
  testFinalButton.addEventListener("click", function () {
    modalTestWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//модалка видео
if (modalVideoButton) {
  modalVideoButton.addEventListener("click", function () {
    modalVideoWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//модалка подарка
if (modalGiftButton) {
  modalGiftButton.addEventListener("click", function () {
    modalGiftWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//модалка команды
if (modalTeamButton) {
  modalTeamButton.addEventListener("click", function () {
    modalTeamWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//модалка программы
if (modalProgButton) {
  modalProgButton.addEventListener("click", function () {
    modalTeamWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//модалка header
if (modalHeaderButton) {
  modalHeaderButton.addEventListener("click", function () {
    modalTeamWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//модалка footer
if (modalFooterButton) {
  modalFooterButton.addEventListener("click", function () {
    modalTeamWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//Обработка формы

let chooseForm = document.getElementById("js--chooseForm");
let formatForm = document.getElementById("js--formatForm");
let teamForm = document.getElementById("js--teamForm");
let giftForm = document.getElementById("js--giftForm");
let restForm = document.getElementById("js--restForm");
let testForm = document.getElementById("js--testForm");
let mangForm = document.getElementById("js--mangForm");

function validatePhone(phone) {
  let regex = /[+][7]\s[(][0-9]{3}[)]\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}/;
  return regex.test(phone);
}

function getQueryParameters() {
  var params = window.location.search.replace(/^\?/, "");
  return params.split("&");
}

function addHandlerToForm(formNode) {
  formNode.addEventListener("submit", formSend);

  async function formSend(event) {
    event.preventDefault();

    if (!validatePhone(formNode.querySelector('input[type="tel"]').value))
      return;

    let formData = new FormData(formNode);

    formData.append("_query", getQueryParameters().join("\n"));

    if (overlay) overlay.classList.remove("active");
    if (modalFormatWindow) modalFormatWindow.classList.remove("active");
    if (modalTestWindow) modalTestWindow.classList.remove("active");
    if (modalThanksWindow) modalThanksWindow.classList.remove("active");
    if (modalVideoWindow) modalVideoWindow.classList.remove("active");
    if (modalGiftWindow) modalGiftWindow.classList.remove("active");
    if (modalTeamWindow) modalTeamWindow.classList.remove("active");

    loading.classList.add("active");

    //отправка
    let response = await fetch("send.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      loading.classList.remove("active");
      modalThanksWindow.classList.add("active");
      overlay.classList.add("active");
      formNode.reset();
    } else {
      loading.classList.remove("active");
      alert("Ошибка отправки");
    }
  }
}
if (chooseForm) {
  addHandlerToForm(chooseForm);
}
if (teamForm) {
  addHandlerToForm(teamForm);
}
if (formatForm) {
  addHandlerToForm(formatForm);
}
if (giftForm) {
  addHandlerToForm(giftForm);
}
if (restForm) {
  addHandlerToForm(restForm);
}
if (testForm) {
  addHandlerToForm(testForm);
}
if (mangForm) {
  addHandlerToForm(mangForm);
}

// маска для номера телефона
var tel1 = document.getElementById("tel1");
var tel2 = document.getElementById("tel2");
var tel3 = document.getElementById("tel3");
var tel4 = document.getElementById("tel4");
var tel5 = document.getElementById("tel5");
var tel6 = document.getElementById("tel6");
var tel7 = document.getElementById("tel7");

var maskOptions = {
  mask: "+{7} (000) 000 00 00",
};

if (tel1) var mask1 = IMask(tel1, maskOptions);
if (tel2) var mask2 = IMask(tel2, maskOptions);
if (tel3) var mask3 = IMask(tel3, maskOptions);
if (tel4) var mask4 = IMask(tel4, maskOptions);
if (tel5) var mask5 = IMask(tel5, maskOptions);
if (tel6) var mask6 = IMask(tel6, maskOptions);
if (tel7) var mask7 = IMask(tel7, maskOptions);

// галлерея

const galleryList = document.getElementById("js--galleryGrid");
const galleryModalWindow = document.getElementById("js--galleryModalWindow");

if (galleryList) {
  galleryList.addEventListener("click", function (event) {
    let newImg = event.target.outerHTML;
    galleryModalWindow.innerHTML = `${newImg}`;
    galleryModalWindow.querySelector("img").classList.remove("gallery__img");
    galleryModalWindow.classList.add("active");
    overlay.classList.add("active");
  });
}

//ссылки-якоря футера

const anchorsContainer = document.getElementById("js--footerList");
const anchors = anchorsContainer.querySelectorAll("a");

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    if (!e.target.classList.contains("toInner")) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

if (localStorage.getItem("fromInnerPageFromFooter")) {
  let localStorageValueOfFromInnerPageFromFooter = localStorage.getItem(
    "fromInnerPageFromFooter"
  );
  let blockIDfromFooter = anchors[localStorageValueOfFromInnerPageFromFooter]
    .getAttribute("href")
    .substr(1);

  document.getElementById(blockIDfromFooter).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  localStorage.removeItem("fromInnerPageFromFooter");
}

//ссылки-якоря в модальном меню

if (document.getElementById("js--header-list-main")) {
  const headerModalList = document.getElementById("js--headerModalList");
  const headerFormatNav = document.getElementById("js--header-list-main");

  function setLinksForScrollToFormat(list) {
    const linksArr = list.querySelectorAll("a");

    for (let i = 0; i < linksArr.length; i++) {
      linksArr[i].addEventListener("click", function () {
        let linkIndex;
        switch (i) {
          case 0:
            linkIndex = 0;
            break;
          case 1:
            linkIndex = 2;
            break;
          case 2:
            linkIndex = 1;
            break;
          case 3:
            linkIndex = 0;
            break;
        }

        document.getElementById("js--format").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setFormatItem(linkIndex);
      });
    }
  }

  setLinksForScrollToFormat(headerModalList);
  setLinksForScrollToFormat(headerFormatNav);

  if (localStorage.getItem("fromInnerPage")) {
    document.getElementById("js--format").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setFormatItem(localStorage.getItem("fromInnerPage"));
    localStorage.removeItem("fromInnerPage");
  }
}

//seo block

if (document.getElementById("seoBlock")) {
  const seoBlock = document.getElementById("seoBlock");
  const seoBtn = seoBlock.querySelector("button");

  seoBtn.addEventListener("click", function () {
    if (!seoBlock.classList.contains("active")) {
      seoBlock.classList.add("active");
      seoBtn.innerHTML = "Свернуть";
    } else {
      seoBlock.classList.remove("active");
      seoBtn.innerHTML = "Развернуть";
    }
  });
}
