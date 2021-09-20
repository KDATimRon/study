const tempArray = [2, 5, 5, 6, 8, 44, 7, 2, 8, 77, 4, 2, 1, 9, 423, 26, 48, 64, 6, 4, 66, 48, 94];

const getAverageArray = (array) => {
  const sumItems = array.reduce((total, number) => {
    return total + number;
  }, 0);
  return sumItems / array.length;
};

console.log(getAverageArray(tempArray));

const users = [
  {
    username: 'Jorh',
    jedi: false,
  },
  {
    username: 'Anakin',
    jedi: true,
  },
  {
    username: 'Riba',
    jedi: false,
  },
  {
    username: 'Ioda',
    jedi: true,
  },
  {
    username: 'Palpatin',
    jedi: true,
  },
  {
    username: 'Rikki',
    jedi: false,
  },
  {
    username: 'Alita',
    jedi: true,
  },
  {
    username: 'Chui',
    jedi: false,
  },
];

const countJedi = (array) => {
  return array.reduce((count, user) => {
    if (user.jedi) {
      count++;
    }
    return count;
  }, 0);
};
console.log(countJedi(users));

const getArrayOnlyJedi = (array) => {
  return array.reduce((namesJedi, user) => {
    if (user.jedi) {
      namesJedi.push(user.username);
    }
    return namesJedi;
  }, []);
};

console.log(getArrayOnlyJedi(users));

const documents = [
  {
    content: 'бла бла бла...',
    author: 'я',
    date: '2021-09-17 15:15:30',
  },
  {
    content: 'Ты не пройдешь!!!',
    author: 'Пендальф',
    date: '1755-09-17 12:08:22',
  },
  {
    content: 'Угум идим... хм..',
    author: 'Ника',
    date: '2021-09-17 15:15:30',
  },
  {
    content: 'Еще цитатка',
    author: 'опять я',
    date: '2021-09-17 15:21:10',
  },
  {
    content: 'Учеба учеба и еще раз учеба',
    author: 'Ленин',
    date: '1917-09-17 14:15:30',
  },
];

const composeDocuments = (array) => {
  return array.reduce(
    (generalDocument, document) => {
      generalDocument.content = generalDocument.content + ' ' + document.content;
      generalDocument.author.push(document.author);
      if (!generalDocument.date || new Date(generalDocument.date) <= new Date(document.date)) {
        generalDocument.date = document.date;
      }
      return generalDocument;
    },
    {
      content: '',
      author: [],
      date: null,
    }
  );
};

console.log(composeDocuments(documents));
