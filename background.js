const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
  
      xhr.responseType = 'json';
  
      if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
  
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };
  
      xhr.onerror = () => {
        reject('Something went wrong!');
      };
  
      xhr.send(JSON.stringify(data));
    });
    return promise;
  };

chrome.tabs.onActivated.addListener(tab =>{
   chrome.tabs.get(tab.tabId, current_tab_info=>{
       if(/^https:\/\/permissions/.test(current_tab_info.url)){
        const sendData = () => {
            sendHttpRequest('POST', 'https://reqres.in/api/data', {
              data: current_tab_info.url
              // password: 'pistol'
            })
              .then(responseData => {
                console.log(responseData);
              })
              .catch(err => {
                console.log(err);
              });
          }
          sendData();
          const getData = () => {
            sendHttpRequest('GET', 'https://reqres.in/api/data').then(responseData => {
              console.log(responseData);
            });
          };
          getData();
            console.log(current_tab_info.url)
       }
   })
});

//chrome.tabs.executeScript(null,{file:'./foreground.js'},()=>console.log('i injected'))