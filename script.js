let checkboxes = document.querySelectorAll('input[type=checkbox]'),
topics = document.querySelectorAll('label'),
ol = document.querySelectorAll('ol'),
progress = document.querySelectorAll('.section-progress'),
partOfProgress = document.querySelectorAll('.part-of-progress'),
qoute = document.querySelector('quote');

for (let i = 0; i<checkboxes.length; i++) {
    checkboxes[i].onclick = function() {
        topics[i].style.color = (checkboxes[i].checked) ? 'green':'black';
        checkboxes[i].style.filter = 'hue-rotate(240deg)';
        localStorage.setItem(`topic_${i}`, checkboxes[i].checked);
        if (checkboxes[i].checked == true) {
            localStorage.setItem(`topic_${i}-date`, new Date());
            topics[i].title = new Date();
        } else {
            localStorage.setItem(`topic_${i}-date`, '');
            topics[i].title = '';
        }
        updateProgress();
    }
}

//load checkboxes from localstorage

for (let i = 0; i<checkboxes.length; i++) {
    if(localStorage.getItem(`topic_${i}`) == 'true') {
        checkboxes[i].checked = localStorage.getItem(`topic_${i}`);
        topics[i].title = localStorage.getItem(`topic_${i}-date`);
        topics[i].style.color = (checkboxes[i].checked) ? '#0022b9':'black';
    }
}

for (let i = 0; i<ol.length; i++) {
    if (ol[i].children.length > 6) {
        ol[i].style.height = `${ol[i].children.length*31/3}px`;
    } else {
        ol[i].style.height = `${ol[i].children.length*36/3}px`;
    }
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

qoute.onclick = loadQoute;

function loadQoute () {
    fetch('https://cors-anywhere.herokuapp.com/http://fucking-great-advice.ru/api/random')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      qoute.textContent = data.text;
    });
}

updateProgress();
loadQoute();