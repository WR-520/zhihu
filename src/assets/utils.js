export const isPlainObject = function isPlainObject(obj){
  let prototype;
  return Object.prototype.toString.call(obj) === '[object Object]' 
      && (prototype = Object.getPrototypeOf(obj), prototype === null || 
      prototype == Object.getPrototypeOf({}))
};

// 处理最大宽度
export const handleMaxWidth = function handleMaxWidth(){
  let HTML =  document.documentElement 
  let app = document.querySelector('#app')
  let size =  parseFloat( HTML.style.fontSize )
  console.log(size)
  if( size > 75){
    HTML.style.fontSize = '75px'
    app.style.width = '750px'
    return 
  }
  app.style.width = 'auto'

}
// 处理后端返回的日期
export const formatTime = function formatTime(time, template){
    if( typeof time !== 'string'){
      time = new Date().toLocaleString('zh-CN',{ hour12: false})
    }
    if( typeof template !== 'string'){
         template = "{0}年{1}月{2}日 {3}:{4}:{5}"
    }
    let arr = []
    // 解析出年月日
    if( /^\d{8}$/.test(time) ){
        let [,$1, $2, $3] = /^(\d{4})(\d{2})(\d{2})$/.exec(time)
        arr.push($1,$2,$3)
    }else{
        arr = time.match(/\d+/g);
    }
    // 把获取的数据替换模板
    return template.replace(/\{(\d+)\}/g,(_,$1) => {
      let item = arr[$1] || "00";
      if(item.length < 2)  item = '0' + item;
        return item;

    })

}