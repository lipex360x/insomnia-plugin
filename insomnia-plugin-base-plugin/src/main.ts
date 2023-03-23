import { bufferToJson } from './core/helpers'

export const requestHooks = [
  async (context: any) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await response.json()
    context.store.setItem('itemId', JSON.stringify(data))

    // debugger
  },
]

export const responseHooks = [
  async (context: any) => {
    const store = await context.store.getItem('myItem')

    const resp = bufferToJson(context.response.getBody())

    console.log('body', resp)

    console.log('response', JSON.parse(store))

    // debugger
  },
]

export const templateTags = [
  {
    name: 'getKeyInStore',
    displayName: 'Store Value',
    args: [{ defaultValue: 'itemId' }],

    async run(context: any, theKey: string) {
      const response = await context.store.getItem(theKey)
      const data = JSON.parse(response)

      console.log('Tag Data', data)
      return data.id
    },
  },
]
