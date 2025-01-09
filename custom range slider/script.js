const inputRange = document.querySelector('.input-range');
const number = document.querySelector('.number');
const lineElement = document.querySelector('.line');
inputRange.addEventListener('input', () => {
  const value = inputRange.value;
  number.innerHTML = value;
  lineElement.style.width = value + '%';
})