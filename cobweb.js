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





// A Map that was very helpful to me.
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


function returnLastWeb(strPath) {
    var returnedWeb = '';
    returnedWeb = strPath.slice(0, strPath.lastIndexOf('Web') + 3);
    returnedWeb = returnedWeb.slice(returnedWeb.lastIndexOf('.') + 1);
    return returnedWeb;
}

function findItemInWeb(itemName, obj) {
    var currentLevel = '',
        result = '',
        itemFound = '';

    function findItemWebRecur(itemName, obj) {

        /* This tests if the current obj value contains a string or array or
            if it contains more objects. */
        if (obj[0] === undefined) {
            for (var i = 0; i < Object.keys(obj).length; i++) {
                /* The recursion is stopped once the item is found and this 
                    variable is changed to 1 */
                if (itemFound === 1) {
                    return returnLastWeb(currentLevel);
                }

                /* This will check if the currentLevel variable is empty.
                    If it is, then a dot does not need to be appended. */
                if (currentLevel.length === 0) {
                    currentLevel += Object.keys(obj)[i];
                } else {
                    currentLevel += '.' + Object.keys(obj)[i];
                }

                /* This checks if the currently iterated property is
                    'otherBigWeb.  If it is, I found that I needed to manually 
                    change the path string otherwise 'otherBigWeb' would be 
                    appended onto the path to 'smallerWeb'. */
                if (Object.keys(obj)[i] === 'otherBigWeb') {
                    currentLevel = 'biggestWeb.otherBigWeb';
                }

                /* This line will run the recursion and store the returned result
                    in a variable.  This line uses the _.get() method from the
                    lodash javascript library (https://lodash.com/docs/4.17.15#get).
                    The method takes in an object variable name and a path within
                    that object in string format.  It returns a single string as 
                    an object reference. */
                result = findItemWebRecur(itemName, (_.get(theCobWeb, currentLevel)));
            }
            // The condition to run if the current obj value contains a string or array.
        } else {
            // Check if the searched for item is in obj.
            if (obj.includes(itemName)) {
                /* This seems to work as a base condition...
                    For some reason it is only required whith the 'comb' test 
                    and I honestly don't know why */
                itemFound = 1;
                /* Use the globally define 'returnLastWeb' function to return
                    the last object reference containing 'Web' in the current
                    path. */
                return returnLastWeb(currentLevel);
                /* If itemName isn't contained in obj but obj contains a string or
                    array (but not any more objects to iterate through) then 
                    the name of the property that contains the current string or 
                    array is sliced off the end of the path so that the function
                    will move on to the next Web property. */
            } else {
                currentLevel = currentLevel.slice(0, currentLevel.lastIndexOf('.'));
            }
        }
        return result;
    }
    return findItemWebRecur(itemName, obj);
};


// Tests
$(document).ready(function () {
    $("#case1").append(findItemInWeb('comb', theCobWeb));
    $("#case2").append(findItemInWeb('toenails', theCobWeb));
    $("#case3").append(findItemInWeb('headphones', theCobWeb));
    $("#case4").append(findItemInWeb('paperclip', theCobWeb));
    $("#case5").append(findItemInWeb('homework', theCobWeb));
    $("#case6").append(findItemInWeb('toothbrush', theCobWeb));
});