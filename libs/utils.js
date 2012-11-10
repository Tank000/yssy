Date.prototype.format = function(format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1,
        //month
        "d+": this.getDate(),
        //day
        "h+": this.getHours(),
        //hour
        "m+": this.getMinutes(),
        //minute
        "s+": this.getSeconds(),
        //second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

exports.format = function(d) {
    return (d.format("yyyy-MM-dd hh:mm:ss"));
}

exports.thin = function (str){
  if(str){
    str = decodeHtml(str);
    str = str.replace(/\s+/g,'').replace(/<(?:.|\s)*?>/g,"");
    if(str.length>300)  str = str.substring(0,200);
  }
  return str;
}
var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;

var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;

var HTML_DECODE = {
        "&lt;" : "<", 
        "&gt;" : ">", 
        "&amp;" : "&", 
        "&nbsp;": " ", 
        "&quot;": "\"", 
        "&copy;": ""

        // Add more
    };

var encodeHtml = function(s){
  return (typeof s != "string") ? s :
      s.replace(REGX_HTML_ENCODE, 
                function($0){
                    var c = $0.charCodeAt(0), r = ["&#"];
                    c = (c == 0x20) ? 0xA0 : c;
                    r.push(c); r.push(";");
                    return r.join("");
                });
};

var decodeHtml = function(s){
  return (typeof s != "string") ? s :
      s.replace(REGX_HTML_DECODE,
                function($0,$1){
                    var c = HTML_DECODE[$0]; // 尝试查表
                    if(c === undefined){
                        // Maybe is Entity Number
                        if(!isNaN($1)){
                            c = String.fromCharCode(($1 == 160) ? 32 : $1);
                        }else{
                            // Not Entity Number
                            c = $0;
                        }
                    }
                    return c;
                });
};
