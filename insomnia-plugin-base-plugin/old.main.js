const bufferToJsonObj = buf => JSON.parse(buf.toString('utf-8'));

module.exports.requestHooks = [
    context => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    }
];

module.exports.responseHooks = [
    context => {
        const resp = bufferToJsonObj(context.response.getBody())
        const postId = resp[0].id
        context.store.setItem("post_id", postId)
    }
];

module.exports.templateTags = [{
    name: 'postId',
    displayName: 'Post ID extract',
    args: [
        {
            // displayName: 'Key',
            defaultValue: 'post_id'
        }
    ],

    async run (context, key) {
        context.store.all().then(tags => {
            console.log('tags', tags)
        })

        return context.store.getItem(key)
    }
}];

module.exports.requestActions = [
    {
      label: 'See request data',
      action: async (context, data) => {
        const { request } = data;
        const html = `<code>${JSON.stringify(request, null, 2)}</code>`;
        context.app.showGenericModalDialog('Results', { html });
      },
    },
  ];

  module.exports.requestGroupActions = [
    {
      label: 'Send Requests',
      action: async (context, data) => {
        const { requests } = data;
  
        let results = [];
        for (const request of requests) {
          const response = await context.network.sendRequest(request);
          results.push(`<li>${request.name}: ${response.statusCode}</li>`);
        }
  
        const html = `<ul>${results.join('\n')}</ul>`;
  
        context.app.showGenericModalDialog('Results', { html });
      },
    },
  ];