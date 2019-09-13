var theCobWeb = {
    biggestWeb: {
      item: "comb",
      biggerWeb: {
        items: ["glasses", "paperclip", "bubblegum"],
        smallerWeb: {
          item: "toothbrush",
          tinyWeb: {
            items: ["toenails", "lint", "wrapper", "homework"]
          }
        }
      },
      otherBigWeb: {
        item: "headphones"
      }
    }
  };


// Create a function using JavaScript (NOT jQuery) for which you can pass the name of an item and theCobWeb
// and the function returns the smallest web it was found inside of.
// Your code should work if someone were to modify theCobWeb.  
//  for example if you gave your program 
//    comb it should give back biggestWeb
//    toenails it should give back tinyWeb
//    headphones it should give back otherBigWeb
// HINT: you should use recursion






    //         theCobWeb *
    //             |
    //         biggestWeb*--------------
    //         /    \                 \
    //       item*   biggerWeb*         otherBigWeb
    //        /      /     \			  \
    //     'comb'* items*   smallerWeb*	  item
    //              /         /     \		 \
    //   ['glasses'etc]*    item   tinyWeb*  'headphones'
    //                      /         \
    //              'toothbrush'       items*
    //                                    \
    //                                  ['tonenails','lint','wrapper','homework']


let currentLevel = '',
    itemFound = 0;

function returnLastWeb(strPath) {
    var returnedWeb = '';
    returnedWeb = strPath.slice(0, strPath.lastIndexOf('Web') + 3);
    returnedWeb = returnedWeb.slice(returnedWeb.lastIndexOf('.') + 1);
    return returnedWeb;
}

function findSmallestWeb(itemName, obj) {
    // Check if obj is an object or a primitive.
    // console.log('The current obj is: ' + obj.constructor.name);
    // if ((typeof obj) === 'object') {

        /* This tests if the current object contains a string or array or
            if it contains more objects. */
    if (obj[0] === undefined) {

        console.log('The current obj contains objects.');
        for (var i = 0; i < Object.keys(obj).length; i++) {
            if (itemFound === 1) {
                return returnLastWeb(currentLevel);
            }
            /* I will then run this function on each property of the object.
                This will again test if the containing properties are objects 
                or primitives. */
            if (currentLevel.length === 0) {
                currentLevel += Object.keys(obj)[i];
            } else {
                currentLevel += '.' + Object.keys(obj)[i];
            }
            console.log('currentLevel is currently: ' + currentLevel);
            console.log('I will now seach through the property: ' + Object.keys(obj)[i]);
            if (Object.keys(obj)[i] === 'otherBigWeb') {
                currentLevel = 'biggestWeb.otherBigWeb';
            }
            findSmallestWeb(itemName, (_.get(theCobWeb, currentLevel)));
        }
    } else {
        console.log('The current obj contains strings or an array.');
        console.log('The current obj is a/an: ' + (typeof obj));
        console.log(obj);
        if  (obj.includes(itemName)) {
            console.log('Object Found in ' + returnLastWeb(currentLevel));
            console.log(returnLastWeb(currentLevel));
            itemFound = 1;
            return returnLastWeb(currentLevel);
        } else {
            currentLevel = currentLevel.slice(0, currentLevel.lastIndexOf('.'));
        }
    }
}
