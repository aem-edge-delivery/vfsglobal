import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'announcements-card-image';
      else div.className = 'announcements-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


// Slider Left Right traverse code

let tag1 = document.getElementsByClassName("announcements")[0].getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("p")[0];
let tag2 = document.getElementsByClassName("announcements")[0].getElementsByTagName("table")[1].getElementsByTagName("tr")[0].getElementsByTagName("p")[1];

tag1.addEventListener("click", function(){
  document.getElementsByClassName("announcements")[0].getElementsByTagName("table")[1].getElementsByTagName("tr")[1].style.left = "0px";
});
tag2.addEventListener("click", function(){
  let rowTag = document.getElementsByClassName("announcements")[0].getElementsByTagName("table")[1].getElementsByTagName("tr")[1];
  let compStyle = window.getComputedStyle(rowTag);
  let leftVal = compStyle.getPropertyValue('left');
  console.log("leftVal: ", leftVal);
  document.getElementsByClassName("announcements")[0].getElementsByTagName("table")[1].getElementsByTagName("tr")[1].style.left = leftVal.substring(0,leftVal.length-2)-50+"px";
});