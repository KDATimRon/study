const img = document.querySelector('img');
const range = document.querySelector('input[type="range"]');

range.value = 0;
range.max = images.length - 1;
img.src = 'images/' + images[0];

range.oninput = () => {
  img.src = 'images/' + images[range.value];
};

//let createElement = tag => text => `<${tag}>${text}</${tag}>`;
