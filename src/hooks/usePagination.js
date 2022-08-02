export const DOTS = "...";

function usePagination({ currentPage, lastPage }) {
  let rangeArray = [];

  //----------- If there are up to 3 pages: ---------

  //If there is(are) 1 OR 2 OR 3 pages, they must be shown thoroughly without any DOTS:

  if (lastPage <= 3) {
    for (let i = 0; i < lastPage; i++) {
      rangeArray.push(i + 1);
    }
  }
  //------------ If we have more than 3 pages ----------
  else {
    //If currentPage is the first page :
    if (currentPage === 1) {
      rangeArray = [1, 2, 3, DOTS, lastPage];
    }

    //If currentPage is the last page:
    else if (currentPage === lastPage) {
      rangeArray = [1, DOTS, lastPage - 2, lastPage - 1, lastPage];
    }
    // If currentPage is somewhere between the first and the last page:
    else {
      const righSibling = currentPage + 1;
      const leftSibling = currentPage - 1;

      let rightDots = false,
        leftDots = false;

      if (lastPage - righSibling >= 1) rightDots = true;
      if (leftSibling - 1 >= 1) leftDots = true;

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
