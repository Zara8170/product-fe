const promiseObj1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});
promiseObj1.then((result) => console.log("1초 지남"));

const promiseObj2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(2), 2000);
});

const promiseObj3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(3), 3000);
});

Promise.all([promiseObj1, promiseObj2, promiseObj3]).then((result) => {
  console.log(result);
});
