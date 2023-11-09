
const freeEmailDomains = [
  'gmail.com',
  'yandex.ru',
  'hotmail.com',
  'yahoo.com',
];

const emails = [
  'info@gmail.com',
  'info@yandex.ru',
  'info@hotmail.com',
  'mk@host.com',
  'support@hexlet.io',
  'key@yandex.ru',
  'sergey@gmail.com',
  'vovan@gmail.com',
  'vovan@hotmail.com',
];

// BEGIN (write your solution here)
const fill = (array, value, start = 0, end = array.length ) => {
  if (array.length === 0) return array;

  end = (end > array.length) ? array.length  : end;
  start = (start >= 0) ? start : 0;

  for( let i = start; i < end; i++) {
    array[i] = value;
  }

  return array;
}
const array =  [1, 2, 3, 4];
fill(array, '*');
// console.log(test(emails));