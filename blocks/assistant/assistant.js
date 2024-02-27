import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'assistant-card-image';
      else div.className = 'assistant-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


//assistant-card-body

let searchBox = document.createElement("div");
searchBox.setAttribute("class", "searchBox");
searchBox.innerHTML = '<input type="text" placeholder="Got a question? Ask away here for instant answers from our website." class="searchbox" autocomplete="off">';
document.getElementsByClassName("assistant")[0].getElementsByTagName("h2")[0].parentElement.appendChild(searchBox);
document.getElementsByClassName("assistant")[0].getElementsByClassName("button")[0].setAttribute("target", "_blank");


document.getElementsByClassName("searchbox")[0].addEventListener("keyup", function(event){
  event.preventDefault();

  if (event.keyCode === 13) {
    console.log("in loadData", this.value);
    let vfsUrl = "https://chat-test01.vfsai.com/acf4ca7e2a98cd3763372fe1f76c581f";
    (this.value !== "")?vfsUrl=vfsUrl+"/vfs-copilot?question="+this.value:vfsUrl=vfsUrl;
    window.open(vfsUrl,'_blank');
  }


  /*
  let form = document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0];

  if(form.getElementsByClassName("questions-list").length==0) {
    form.insertAdjacentHTML("beforeend", "<div class='questions-list'></div>");
  }

  if(form.getElementsByClassName("answers-list").length==0) {
    form.insertAdjacentHTML("beforeend", "<div class='answers-list'></div>");
  }

  document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("questions-list")[0].innerHTML = '';
  document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("questions-list")[0].style.display = 'block';
  document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("answers-list")[0].innerHTML = '';
  document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("answers-list")[0].style.display = 'none';

  if(this.value.length>=3) {
    console.log("value more than equal to 3", this.value.length);

    var settings = {
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Cookie": "affinity=\"134ec73574ac85a9\"; cq-authoring-mode=TOUCH"
      }
    };

    fetch("/blocks/assistant/data.json", settings)
    .then(response => response.json())
    .then(body => {
      console.log("body: ", body);
      body.assistant.questions.forEach((item) => {

        var targetElm = document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("questions-list")[0];
        console.log("searchBoxVal ", this.value);

        if(item.question.toLowerCase().includes(this.value.toLowerCase())) {
          console.log("this question includes ", item.question);
          targetElm.insertAdjacentHTML("beforeend", "<a class='questions-item' data-answer='"+item.answer+"'>"+item.question+"</a>");
        }

      });
    });
  } else {
    document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("questions-list")[0].style.display = 'none';
  }

  */

});

function findParentByTagName(element, tagName) {
  var parent = element;
  while (parent !== null && parent.tagName !== tagName.toUpperCase()) {
      parent = parent.parentNode;
  }
  return parent;
}

function handleAnchorClick(event) {
  event = event || window.event;

  if (findParentByTagName(event.target || event.srcElement, "A")) {
      //event.preventDefault();
      console.log("An anchor was clicked!", event.target);
      let targetClass = event.target.getAttribute("class");

      if(targetClass=='questions-item'){
        let targetText =  event.target.text;
        let targetDataAnswer =  event.target.getAttribute("data-answer");
        console.log("targetDataAnswer: ", targetDataAnswer);
        
        document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("questions-list")[0].innerHTML = '';
        document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("questions-list")[0].style.display = 'none';
        document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByTagName("input")[0].value=targetText;

        document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("answers-list")[0].innerHTML = '';
        document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("answers-list")[0].style.display = 'block';
      
        var targetElm = document.getElementsByClassName("assistant")[0].getElementsByTagName("form")[0].getElementsByClassName("answers-list")[0];
        targetElm.innerHTML=targetDataAnswer;
      }

  }
}

document.documentElement.addEventListener("click", handleAnchorClick, false);

