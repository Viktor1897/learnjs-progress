let checkboxes = document.querySelectorAll('input[type=checkbox]');
let topics = document.querySelectorAll('label');
let ol = document.querySelectorAll('ol');
let progress = document.querySelectorAll('.section-progress');
let partOfProgress = document.querySelectorAll('.part-of-progress');

for (let i = 0; i<checkboxes.length; i++) {
    checkboxes[i].onclick = function(){
        topics[i].style.color = (checkboxes[i].checked) ? 'green':'black';
        checkboxes[i].style.filter = 'hue-rotate(240deg)';
        localStorage.setItem(`topic_${i}`, checkboxes[i].checked);
        updateProgress();
    }
}

//load checkboxes from localstorage

for (let i = 0; i<checkboxes.length; i++) {
    if(localStorage.getItem(`topic_${i}`) == 'true') {
        checkboxes[i].checked = localStorage.getItem(`topic_${i}`);
        topics[i].style.color = (checkboxes[i].checked) ? '#0022b9':'black';
    }
}

for (let i = 1; i<ol.length; i++) {
    ol[i].style.height = `${ol[i].children.length*14.5}px`;
    ol[i].style.listStyle = `"${i+1}. "`;
    for (let j = 0; j<ol[i].children.length; j++) {
        if(ol[i].children[j].children[0].children[0].checked == true)
        console.log('true');
    }
}

function updateProgress() {
    for (let i = 0; i<ol.length; i++) {
        let isComplete = 0;
        for (let j = 0; j<ol[i].children.length; j++) {
            if(ol[i].children[j].children[0].children[0].checked == true)
            isComplete++;
        }
        progress[i].value=isComplete;
        partOfProgress[i].textContent = `(${Math.round(isComplete/progress[i].max*100)}%)`;
    }
}

updateProgress();