const inputText = $('input');
const message = $('.message');

function isValid(str) {
  let stack = [];
  let brackets = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  for (let ch of str) {
    if ([')', '}', ']'].includes(ch)) {
      if (brackets[ch] !== stack.pop()) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}

const button = $('.btn').on('click', () => {
  if (isValid(inputText.val())) {
    message.removeClass('no').addClass('ok').text('Отлично, все правильно');
  } else {
    message.removeClass('ok').addClass('no').text('Ошибка, проверьте ввод');
  }
});
