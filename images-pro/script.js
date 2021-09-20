const imageOut = document.querySelector('.image-out');
const info = document.querySelector('.info');

for (let itemName in orcs) {
  let img = document.createElement('img');
  img.dataset.key = itemName;
  img.src = `images/${itemName}.png`;
  imageOut.append(img);
}
const imagesList = imageOut.querySelectorAll('img');

imageOut.addEventListener('click', showInfo);

function showInfo(event) {
  let key = event.target.dataset.key;
  let str = '';
  if (key === undefined) {
    return;
  }
  imagesList.forEach((item) => item.classList.remove('active'));
  event.target.classList.add('active');
  const { name, description } = orcs[key];
  const { power, dexterity, health, intelligence } = orcs[key]['specifications'];
  str = ` <h3>${name}</h3>
        <p class="description">${description}</p>
        <div class="specifications">
        <h4>Характеристики:</h4>
        <p>Сила: ${power}</p>
        <p>Ловкость: ${dexterity}</p>
        <p>Жизни: ${health}</p>
        <p>Интеллект: ${intelligence}</p>`;
  info.innerHTML = str;
}
