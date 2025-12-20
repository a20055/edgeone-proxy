async function handleRequest(event) {
  const { request } = event;
  const urlInfo = new URL(request.url);
  
  const proxyRequest = new Request(`https://google.com${urlInfo.pathname}${urlInfo.search}`, {
    method: request.method,
    body: request.body,
    headers: request.headers,
    copyHeaders: true,
  });
  proxyRequest.headers.set('Host', 'google.com');
  
  // fetch 反向代理
  const response = await fetch(proxyRequest);

  /** 添加自定义响应头 **/
  // 指定哪些源（origin）允许访问资源
  response.headers.append('Access-Control-Allow-Origin', '*');
  // 指定哪些 HTTP 方法（如 GET, POST 等）允许访问资源
  response.headers.append('Access-Control-Allow-Methods', 'GET,POST');
  // 指定了哪些 HTTP 头可以在正式请求头中出现
  response.headers.append('Access-Control-Allow-Headers', 'Authorization');
  // 预检请求的结果可以被缓存多久
  response.headers.append('Access-Control-Max-Age', '86400');
  

  
  return response;
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});
