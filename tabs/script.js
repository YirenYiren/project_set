const tabBtns = document.querySelectorAll('.tab-btn');
const contentElements = document.querySelectorAll('.content');
const lineElemnt = document.querySelector('.line');

tabBtns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    tabBtns.forEach(btn => {btn.classList.remove('active')});
    btn.classList.add('active');
    lineElemnt.style.width = e.target.offsetWidth + 'px';
    lineElemnt.style.left = e.target.offsetLeft + 'px';

    contentElements.forEach(content => {content.classList.remove('active')});
    contentElements[index].classList.add('active');
  })
})