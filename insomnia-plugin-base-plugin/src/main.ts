export const requestHooks = [
  async (context: any) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    context.store.setItem('itemId', JSON.stringify(data))
  }
];

export const responseHooks = [
  async (context: any) => {
    const store = await context.store.getItem('myItem')

    console.log('response', JSON.parse(store))
  }
]

export const templateTags = [{
  name: 'getKeyInStore',
  displayName: 'Store Value',
  args: [{ type: 'string', defaultValue: 'itemId' }],

  async run (context: any, theKey: string) {
      const response = await context.store.getItem(theKey)
      const data = JSON.parse(response)
      
      console.log('Tag Data', data)
      return data.id
  }
}];
