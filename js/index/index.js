// ----------global----------
let scWidth = window.innerWidth;
let scHeight = window.innerHeight;
let baseSize = setBaseSize();
let scrollIndex = -1;
let isScrolling = false;
let maxIndex = 5;
let scrollDelay = 0;
let isReady = false;

const aboutWrap = document.getElementById("aboutWrap");
// calc 기준값 반환
function setBaseSize() {
    let returnVal = 1920;
    if (scWidth < 481) {
        returnVal = 480;
    }
    else if (scWidth < 769) {
        returnVal = 768;
    }
    else if (scWidth < 1441) {
        returnVal = 1440;
    }
    else {
        returnVal = 1920;
    }
    return returnVal;
}
// 해상도에 따른 비율 계산값 반환
function calcSize(size) {
    return scWidth * (size / baseSize);
}
// 딜레이 후 함수 실행
function delay(fnc, delayTime) {
    setTimeout(fnc, delayTime);
}
// ----------header----------
const modeBtn = document.getElementById("modeBtn");
const anchor = document.querySelectorAll("#gnb li a");
const snbAnchor = document.querySelectorAll(".snbWrap li a");
for (let i = 0; i < anchor.length; i++) {
    anchor[i].addEventListener("click", function (event) {
        event.preventDefault();
    })
}
for (let i = 0; i < snbAnchor.length; i++) {
    snbAnchor[i].addEventListener("click", function (event) {
        console.log(i);
        switch (i) {
            case 0:
                abSecondScroll(1);
                scrollIndex = 1;
                break;
            case 1:
                abSecondScroll(2);
                scrollIndex = 2;
                break;
            case 2:
                window.scroll({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
                if (!isSkillDone) {
                    scrollDelay = 3500;
                    activeSkill();
                    isSkillDone = true;
                }
                scrollIndex = 4;
                break;
            case 3:
                window.scroll({
                    top: window.innerHeight * 2,
                    behavior: 'smooth'
                });
                scrollIndex = 5;
                break;
        }
    })
}
// heaer스크롤이벤트
function hdReverseColor() {
    modeBtn.style.color = "#191919";
    modeBtn.style.transition = "0.5s";
}
// ----------about----------
const secAbout = document.getElementById("about");
const aboutMask = document.getElementById("aboutMask");
const aboutList = document.getElementsByClassName("aboutInner");
const aboutListWrap = document.getElementById("aboutWrap");
const abSecondDt = document.querySelector("#aboutIntroduce dl dt");
const abSecondDd = document.querySelectorAll("#aboutIntroduce dl dd");
const abThirdTitle = document.querySelector("#aboutCareer > dl > dt");
const abThirdDt = document.querySelectorAll(".innerCareer dt");
const abThirdDd = document.querySelectorAll(".innerCareer dd");
let abMoveAmount;

// about 사이즈지정
function setSize() {
    for (let i = 0; i < aboutList.length; i++) {
        aboutList[i].style.width = `${scWidth - calcSize(100)}px`;
        aboutList[i].style.height = `${scHeight - calcSize(100)}px`;
    }
    aboutWrap.style.height = "fit-content";
    abMoveAmount = scHeight - calcSize(100);
}
//about스크롤이벤트
function abModifySize() {
    secAbout.style.paddingBottom = `${calcSize(10)}px`;
    aboutMask.style.width = `${scWidth - calcSize(100)}px`;
    aboutMask.style.height = `${scHeight - calcSize(100)}px`;
    aboutMask.style.borderRadius = `${calcSize(40)}px`;
    aboutMask.style.transition = "0.5s";
    abMoveAmount = aboutList[0].clientHeight;
    setSize();
    delay(() => {
        for (let i = 0; i < aboutList.length; i++) {
            aboutList[i].style.opacity = "1.0";
            abFirstScroll();
        }
    }, 500)

}
function abFirstScroll() {
    aboutList[0].children[0].style.opacity = "1";
    aboutList[0].children[0].style.transform = "translateY(0px)";
    aboutList[0].children[0].style.transition = "0.5s";
}
function abSecondScroll(index) {
    aboutListWrap.style.transform = `translateY(-${index * abMoveAmount}px)`;
    aboutListWrap.style.transition = "0.5s";
    switch (index) {
        case 1:
            abSecondColor();
            break;
        case 2:
            abThirdColor();
            break;
    }
    aboutList[index].children[0].style.color = "white";
}
function abSecondColor() {
    abSecondDt.style.color = "white";
    for (let i = 0; i < abSecondDd.length; i++) {
        abSecondDd[i].style.color = "white";
    }
}
function abThirdColor() {
    abThirdTitle.style.color = "white";
    for (let i = 0; i < abThirdDd.length; i++) {
        abThirdDd[i].style.color = "white";
        if (i >= abThirdDt.length) {
            continue;
        }
        abThirdDt[i].style.color = "white";
    }
}
// ----------project----------
const skill = document.getElementById("skill");
const skillDt = document.querySelectorAll("#skill dt");
const skillDd = document.querySelectorAll("#skill dd");

initSkill();
for (let i = 0; i < skillDt.length; i++) {
    skillDt[i].addEventListener("transitionend", () => {
        skillDt[i].style.transition = "0";
    })
}
for (let i = 0; i < skillDd.length; i++) {
    skillDd[i].addEventListener("transitionend", () => {
        skillDd[i].style.transition = "0";
    })
}
for (let i = 0; i < skillDd.length; i++) {
    skillDd[i].addEventListener("mouseenter", () => {
        skillDd[i].style.transform = "translateY(10px)";
    })
    skillDd[i].addEventListener("mouseleave", () => {
        skillDd[i].style.transform = "translateY(0px)";
    })
}
function initSkill() {
    for (let i = 0; i < skillDt.length; i++) {
        skillDt[i].style.opacity = "0";
        skillDt[i].style.transition = "0.5s";
    }
    for (let i = 0; i < skillDd.length; i++) {
        skillDd[i].style.opacity = "0";
        skillDd[i].style.transition = "0.5s";
    }
}
function activeSkill() {
    let delayTime = 0;
    for (let i = 0; i < skillDt.length; i++) {
        delay(() => {
            skillDt[i].style.opacity = "1.0";
        }, delayTime)
        delayTime += 500;
    }
    for (let i = 0; i < skillDd.length; i++) {
        delay(() => {
            skillDd[i].style.opacity = "1.0";
        }, delayTime)
        delayTime += 100;
    }
}
// ----------project2----------
let isSkillDone = false;
const proDt = document.querySelector("#proDetail dl");
const proDtImg = proDt.children[0];
const proDtTitle = proDt.children[1].children[0];
const proDtMemo = proDt.children[1].children[1];
const proDtMy = proDt.children[1].children[2];
const proDtWork = proDt.children[1].children[3];
const proDtEtc = proDt.children[1].children[4];
const proDl = document.getElementsByClassName("proDl");
for (let i = 0; i < proDl.length; i++) {
    proDl[i].addEventListener("mouseenter", function (event) {
        setDetailInfo(i);
    })
}
function setDetailInfo(index) {
    let info = proDl[index].children[2];
    proDtImg.style.backgroundImage = `${getComputedStyle(proDl[index].parentElement).backgroundImage}`;
    proDtTitle.innerText = info.getAttribute('data-title');
    proDtMemo.innerText = info.getAttribute('data-memo1');
    proDtMy.innerText = info.getAttribute('data-memo2');
    proDtWork.innerText = info.getAttribute('data-memo3');
    proDtEtc.innerText = info.getAttribute('data-memo4');
}
// ----------wheelEvent----------
window.addEventListener("wheel", function (event) {
    if (isScrolling || !isReady) return;
    let dir = event.deltaY > 0;
    if ((dir && scrollIndex > maxIndex) || (!dir && scrollIndex <= 0)) return;
    isScrolling = true;
    (event.deltaY > 0) ? scrollIndex++ : scrollIndex--;
    scrollDelay = 500;
    console.log(scrollIndex);
    switch (scrollIndex) {
        case 0:
            if (dir) {
                abModifySize();
                hdReverseColor();
                scrollDelay = 1200;
            }
            else {
                aboutListWrap.style.transform = `translateY(0px)`;
            }
            break;
        case 1:
            abSecondScroll(1);
            break;
        case 2:
            abSecondScroll(2);
            if (!dir) {
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            break;
        case 3:
            if (dir) {
                window.scroll({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
            else {
                if (isSkillDone) {
                    abSecondScroll(2);
                    scrollIndex = 2;
                    window.scroll({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
            break;
        case 4:
            if (dir && !isSkillDone) {
                scrollDelay = 3500;
                activeSkill();
                isSkillDone = true;
            }
            else if (dir && isSkillDone) {
                scrollIndex = 5;
                window.scroll({
                    top: this.window.innerHeight * 2,
                    behavior: 'smooth'
                });
            }
            else {
                window.scroll({
                    top: this.window.innerHeight,
                    behavior: 'smooth'
                });
            }
            break;
        case 5:
            window.scroll({
                top: this.window.innerHeight * 2,
                behavior: 'smooth'
            });
            break;
    }
    delay(() => {
        isScrolling = false;
    }, scrollDelay)
})
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
        isReady = true;
        setSize();
        abModifySize();
        hdReverseColor();
        scrollIndex = 0;
    }, performance.now());
})
window.addEventListener("resize", () => {
    setSize();
})