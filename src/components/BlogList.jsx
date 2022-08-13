import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [selectedPageSize, setSelectedPageSize] = React.useState(15);
  const [initialIndexOfThePage, setInitialIndexOfThePage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  // We can do the slicing calculation in two different ways to avoid re-calculation on each re-render:

  //--------------- The first way ---------------
  // const [currentPaginationData, setCurrentPaginationData] = React.useState(
  //   blogs.posts.slice(0, 15)
  // );

  // React.useEffect(() => {
  //   setCurrentPaginationData(
  //     blogs.posts.slice(
  //       initialIndexOfThePage,
  //       initialIndexOfThePage + selectedPageSize
  //     )
  //   );
  // }, [initialIndexOfThePage, selectedPageSize]);

  // --------------- The second way ----------------

  const currentPaginationData = React.useMemo(
    () =>
      blogs.posts.slice(
        initialIndexOfThePage,
        initialIndexOfThePage + selectedPageSize
      ),
    [initialIndexOfThePage, selectedPageSize]
  );

  const allUploadedPostsNumber =
    (currentPage - 1) * selectedPageSize + currentPaginationData.length;

  const updateRowsPerPage = (selectedOption) => {
    setCurrentPage(1);
    setInitialIndexOfThePage(0);
    setSelectedPageSize(selectedOption);
  };

  const updatePage = (chosenPage) => {
    const initialIndex = (chosenPage - 1) * selectedPageSize;
    setInitialIndexOfThePage(initialIndex);
    setCurrentPage(chosenPage);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={selectedPageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
        allUploadedPostsNumber={allUploadedPostsNumber}
      />
      <ul aria-label="blog list">
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
