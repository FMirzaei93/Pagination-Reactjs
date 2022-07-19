export const DOTS = "...";

function usePagination({ currentPage, lastPage }) {
  /*
    Rewrite the logic here to map out the pagination to be displayed

    I have already explained everything in its proper place. 
    But I'll rewrite them here in case you need to have them all in one place.


    There are some facts,conditions and exceptions in the pagination list:
     //--- Initial facts ---
  1.currentPage always have 2 siblinsgs.
  2.If currentPage is the first page, there will always be 2 siblings on its right side.
  3.If currentPage is the last page there will always be 2 siblings on its left side.
  4.We use DOTS is cases when there is at least one page between 2 pages. (otherwise it'll be meaningless, something like: [1,DOTS,2,3,4])
  5.The first and the last page will always be shown.

       //--- Conditions ---

      //----------- If there are up to 4 pages: ---------
      If there is(are) 1 OR 2 OR 3 OR 4 pages, they must be shown thoroughly without any DOTS.
    
      //-----------Else part: For situations that we've got more than 4 pages, some other conditions will be applied:-----------
      1.If currentPage is either the first page OR the one after the first.
      2.If currentPage is either the last page OR the 'second to last' page. 
      3.Otherwise, currentPage is somewhere between "the page after the first page" AND the 'second to last' page, while the number of pages are more than 4.
      
         //Here there are 3 exceptions:
            // 1. When there are 5 pages and currentPage is 3. As we know, there must be two siblings in the left and the right sides of currentPage, and the first and the last page must be shown. So rangeArray would be: [1,2,3,4,5]
            // 2. When currentPage is the '3rd to last' item; there shouldn't be any DOTS between the 'second to last' and the last item. => rangeArray=[1,...,6,7,8]
            // 3. When currentPage is the '3rd' item; there shouldn't be any DOTS between the 'first' and the '2nd' item. => rangeArray=[1,2,3,...,6,7,8]

  */

  let rangeArray = [];

  //----------- If there are up to 4 pages: ---------

  //--- initial facts ---
  /*
  1.currentPage always have 2 siblinsgs.
  2.If currentPage is the first page, there will always be 2 siblings on its right side.
  3.If currentPage is the last page there will always be 2 siblings on its left side.
  4.We use DOTS is cases when between 2 pages there is at least another page. (otherwise it'll be meaningless, something like: [1,DOTS,2,3,4])
  5.The first and last page will alway be shown.
  With that said, if there is(are) 1 OR 2 OR 3 OR 4 pages, they must be shown thoroughly without any DOTS:
*/
  if (lastPage == 1 || lastPage == 2 || lastPage == 3 || lastPage == 4) {
    for (let i = 0; i < lastPage; i++) {
      rangeArray.push(i + 1);
    }
  }
  //------------ 'else' part : For situations that we've got more than 4 pages, some conditions will be applied: ----------
  else {
    //If currentPage is either the first page OR the one after the first:
    if (currentPage == 1 || currentPage == 2) {
      rangeArray = [1, 2, 3, DOTS, lastPage];
    }

    //If currentPage is either the last page OR the 'second to last' page:
    else if (currentPage == lastPage || currentPage == lastPage - 1) {
      rangeArray = [1, DOTS, lastPage - 2, lastPage - 1, lastPage];
    }

    //Otherwise, currentPage is somewhere between "the page after the first page" AND the 'second to last' page, while the number of pages are more than 4.
    else {
      //Here there are 3 exceptions:
      // 1. When there are 5 pages and currentPage is 3. As we know there must be two siblings in the left and right sides of currentPage, and the first and the last page must be shown. So rangeArray would be: [1,2,3,4,5]
      if (lastPage == 5 && currentPage == 3) {
        rangeArray = [1, 2, 3, 4, 5];
      }
      // 2. When currentPage is the '3rd to last' item
      else if (currentPage == 3) {
        rangeArray = [1, 2, 3, 4, DOTS, lastPage];
      }
      // 3. When currentPage is the '3rd' item
      else if (currentPage == lastPage - 2) {
        rangeArray = [
          1,
          DOTS,
          lastPage - 3,
          lastPage - 2,
          lastPage - 1,
          lastPage,
        ];
      }
      //In other cases:
      else {
        rangeArray = [
          1,
          DOTS,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          DOTS,
          lastPage,
        ];
      }
    }
  }

  return rangeArray;
}

export default usePagination;
