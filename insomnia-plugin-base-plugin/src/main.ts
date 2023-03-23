// import { RequestHook, StoreContext } from "./interfaces";

// module.exports.requestHooks = Array<(context: RequestHook) => void>;

export const requestHooks = [
  async (context: any) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await response.json();
    console.log(json);
  }
];

export const responseHooks = [
  (context: any) => {
    console.log('hello world')
    // context.setItem('hello', 'world')
  }
]

// module.exports.responseHooks = [
//   context => {
//       const resp = bufferToJsonObj(context.response.getBody())
//       const postId = resp[0].id
//       context.store.setItem("post_id", postId)
//   }
// ];

// const requestHooks = (context: RequestHook[]): void => {
//   context[0].
// }

// module.exports.requestHooks = [
//   context => {
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))
//   }