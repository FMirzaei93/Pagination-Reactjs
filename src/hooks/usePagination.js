export const DOTS = "...";

function usePagination({ currentPage, lastPage }) {
  /*
    Rewrite the logic here to map out the pagination to be displayed


    There are some facts,conditions and exceptions in the pagination list:
     //-------------------- Initial facts -----------------
  1.currentPage always have 2 siblinsgs.
  2.If currentPage is the first page, there will always be 2 siblings on its right side.
  3.If currentPage is the last page there will always be 2 siblings on its left side.
  4.We use DOTS is cases when there is at least one page between 2 pages. (otherwise it'll be meaningless, something like: [1,DOTS,2,3,4])
  5.The first and the last page will always be shown.

       //-------------------- Conditions --------------------

      // If there are up to 4 pages:
      If there is(are) 1 OR 2 OR 3 OR 4 pages, they must be shown thoroughly without any DOTS.
    
      //----------- If we've got more than 4 pages -----------
      1.If currentPage is the first page: rangeArray = [1, 2, 3, DOTS, lastPage];
      2.If currentPage is the last page: rangeArray = [1, DOTS, lastPage - 2, lastPage - 1, lastPage];
      3.If currentPage is somewhere between the first and the last page. 
        //In this case we will calculate the distance between the left/right sibling and the first/last page to determine if we should apply DOTS or not:      
        //Here there are 4 situations:
            // 1.We need DOTS in the both sides of the currentPage: rangeArray= [1, ..., 3, currentPage, 5, ... ,8]
            // 2.We need DOTS in the left side of the currentPage: rangeArray= [1, ...,6 ,currentPage ,8]
            // 3.We need DOTS in the right side of the currentPage: rangeArray= [1, currentPage, 3, ..., 8]
            // 4.We do not need DOTS: rangeArray= [1,2,3,4,5]

  */

  let rangeArray = [];

  //----------- If there are up to 4 pages: ---------

  //With having initial facts(that are said above), if there is(are) 1 OR 2 OR 3 OR 4 pages, they must be shown thoroughly without any DOTS:

  if (lastPage == 1 || lastPage == 2 || lastPage == 3 || lastPage == 4) {
    for (let i = 0; i < lastPage; i++) {
      rangeArray.push(i + 1);
    }
  }
  //------------ If we've got more than 4 pages ----------
  else {
    //If currentPage is the first page :
    if (currentPage == 1) {
      rangeArray = [1, 2, 3, DOTS, lastPage];
    }

    //If currentPage is the last page:
    else if (currentPage == lastPage) {
      rangeArray = [1, DOTS, lastPage - 2, lastPage - 1, lastPage];
    }
    // If currentPage is somewhere between the first and the last page:
    else {
      const righSibling = currentPage + 1;
      const leftSibling = currentPage - 1;

      let rightDots = false,
        leftDots = false;

      if (lastPage - righSibling > 1) rightDots = true;
      if (leftSibling - 1 > 1) leftDots = true;

      if (leftDots && rightDots) {
        rangeArray = [
          1,
          DOTS,
          leftSibling,
          currentPage,
          righSibling,
          DOTS,
          lastPage,
        ];
      } else if (leftDots && !rightDots) {
        if (righSibling !== lastPage)
          rangeArray = [
            1,
            DOTS,
            leftSibling,
            currentPage,
            righSibling,
            lastPage,
          ];
        else rangeArray = [1, DOTS, leftSibling, currentPage, lastPage];
      } else if (rightDots && !leftDots) {
        if (leftSibling !== 1)
          rangeArray = [
            1,
            leftSibling,
            currentPage,
            righSibling,
            DOTS,
            lastPage,
          ];
        else rangeArray = [1, currentPage, righSibling, DOTS, lastPage];
      } else if (!leftDots && !rightDots)
        rangeArray = [1, currentPage, lastPage];
    }
  }

  return rangeArray;
}

export default usePagination;
