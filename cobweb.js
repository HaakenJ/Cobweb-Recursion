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


let smallestWeb = '';
let lastLevel = '';
let exitCondition = 0;
let returnedValue = '';

function returnLastWeb(strPath) {
    var returnedWeb = '';
    returnedWeb = strPath.slice(0, strPath.lastIndexOf('Web') + 3);
    returnedWeb = returnedWeb.slice(returnedWeb.lastIndexOf('.') + 1);
    return returnedWeb;
}

function findSmallestWeb(itemName, obj) {
    // Check if obj is an object or a primitive.
    if (exitCondition === 1) {
        return;
    }
    console.log('The current obj is: ' + obj);
    if ((typeof obj) === 'object') {
        // If it is an object then I will search through its properties.
        console.log('The current obj is an Object.');
        for (var i = 0; i < Object.keys(obj).length; i++) {
            /* I will then run this function on each property of the object.
                This will again test if the containing properties are objects 
                or primitives. */
            if (lastLevel.length === 0) {
                lastLevel += Object.keys(obj)[i];
            } else {
                lastLevel += '.' + Object.keys(obj)[i];
            }
            console.log('lastLevel is currently: ' + lastLevel);
            console.log('I will now seach through the property: ' + Object.keys(obj)[i]);
            return findSmallestWeb(itemName, (_.get(theCobWeb, lastLevel)));
        }
    /* This is the case for if the obj passed in is a string or an array that
        I can search through. */
    } else {
        // Now I look to see if the obj passed in includes the searched for item.
        var lastPeriod = lastLevel.lastIndexOf('.');
        console.log('The current obj is a/an: ' + (typeof obj));
        if (obj.includes(itemName)) {
            console.log('***********The item has been found.');
            /* Here is where I would want to assign the name of the containing 
            web object to the smallestWeb variable.*/
            exitCondition = 1;
            console.log(lastLevel.slice(lastPeriod + 1));
            lastLevel = lastLevel.slice(0, lastPeriod);
            return returnLastWeb(lastLevel);
        // If the item is not found then I return, aka stop searching this branch.
        } else {
            console.log('++++++++++++The item is not in this array/string')
            // if (!isNaN(lastLevel.slice(-1))) {
            //     console.log('-----------This property is in an array.')
            //     lastLevel = lastLevel.slice(0, lastLevel.lastIndexOf('.'));
            //     console.log('The number has been removed: ' + lastLevel);
            //     lastLevel = lastLevel.slice(0, lastLevel.lastIndexOf('.'));
            //     
            // } else {
                lastLevel = lastLevel.slice(0, lastPeriod);
                console.log('&&&&&&&&&&&& The lastLevel is now: ' + lastLevel);
            }
            
        }
    }

// To search through the next level I will want to pass "theCobWeb." + Object.keys(obj)[i] into the function.  This will give me the second level.includes
// if I want to search through the next level I will need to store the value of Object.keys(obj)[i] or "biggestWeb" in a variable to use like this

// "theCobWeb." + lastLevel + '.' + 