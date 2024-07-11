window.addEventListener("DOMContentLoaded", function (event) {
    this.setTimeout(() => {
        this.scrollTo(0, 0);
        // ----------global----------
        let scWidth = window.innerWidth;
        let scHeight = window.innerHeight;
        // 딜레이 후 함수 실행
        function delay(fnc, delayTime) {
            setTimeout(fnc, delayTime);
        }
        // ----------header----------
        const aboutSnb = this.document.querySelectorAll("#etc a");
        for (let i = 0; i < aboutSnb.length; i++) {
            aboutSnb[i].addEventListener("click", function (event) {
                switch (i) {
                    case 0:
                        slide(0, 0);
                        break;
                    case 1:
                        slide(0, 1)
                        break;
                }
            });
        }
        // ----------title-----------
        const tMents = document.querySelectorAll("#title p");
        const tSpans = document.querySelectorAll("#title p span");
        let tAddMents = ["안녕하세요", "안기완의 포트폴리오입니다"];
        initTitle();
        function initTitle() {
            tMents[0].textContent = "";
            for (let i = 0; i < tSpans.length; i++) {
                tSpans[i].textContent = "";
            }
            activeTitle();
        }
        function activeTitle() {
            let delayTime = 0;
            for (let i = 0; i < tAddMents[0].length; i++) {
                delay(() => { tMents[0].textContent += tAddMents[0][i]; }, delayTime);
                delayTime += 150;
            }
            delayTime += 150;
            for (let j = 0; j < tAddMents[1].length; j++) {
                if (j < 3) {
                    delay(() => { tSpans[0].textContent += tAddMents[1][j]; }, delayTime);
                }
                else {
                    delay(() => { tSpans[1].textContent += tAddMents[1][j]; }, delayTime);
                }
                delayTime += 150;
            }
        }
        // ----------about----------
        const scrollBtn = this.document.querySelectorAll("#arrowWrap a");
        let slideIndex = 0;
        const aboutUl = this.document.querySelector("#intro ul");
        const arrCircle = this.document.getElementsByClassName("circle");
        // slideBtn
        for (let i = 0; i < scrollBtn.length; i++) {
            scrollBtn[i].addEventListener("click", function (event) {
                event.preventDefault();
                slide(i);
            })
        }
        // circleBtn
        for (let i = 0; i < arrCircle.length; i++) {
            arrCircle[i].addEventListener("click", function (event) {
                event.preventDefault();
                slide(0, i)
            })
        }
        // slideFunc
        function slide(dir, idx = -1) {
            if (idx == -1 && (dir == 0 && slideIndex == 0) || (dir == 1 && slideIndex == 5)) return;
            arrCircle[slideIndex].style.backgroundImage = "url(./images/circle_outline.png)";
            slideIndex = (idx == -1) ? (slideIndex + ((dir == 0) ? -1 : 1)) : idx;
            aboutUl.style.transform = `translateX(${-slideIndex * scWidth}px)`;
            arrCircle[slideIndex].style.backgroundImage = "url(./images/circle_fill.png)";
        }
        // ----------skill----------
        const skill = document.getElementById("skill");
        const skillDt = document.querySelectorAll("#skill dt");
        const skillDd = document.querySelectorAll("#skill dd");
        let isSkillActive = false;
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
                delayTime += 400;
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
        // scrollEvent
        this.window.addEventListener("scroll", function (event) {
            if (isSkillActive) return;
            if (this.window.scrollY > scHeight * 1.2) {
                activeSkill();
            }
        })
    }, this.performance.now())
})
