/*
 * Retrieve the titles from addresses using promises
 */
function retrieve(addresses) {

   var titlesCount=addresses.length;
   var titles=[];

   return new Promise(function (resolve, reject) {
        var parseUrls = function (response) {

                var url=addresses[addresses.length-titlesCount];
                var pattern = /^((http|https):\/\/)/;
                if(!pattern.test(url))
                     url = "http://" + url;

                var fetchUrl = require("fetch").fetchUrl;
                fetchUrl(url, function(error, meta, body){
                    if(error)
                      reject(error);
                    var title = body.toString().match(/<title[^>]*>([^<]+)<\/title>/)[1];
                    titles[addresses.length-titlesCount]=title;
                    titlesCount--;
                    if(titlesCount)
                      parseUrls();
                    else
                      resolve(titles);
                });
       };
       parseUrls();
    });

}

/* ***************************** Module Exports ******************************* */
exports.retrieve = retrieve;
