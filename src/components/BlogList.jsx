import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [selectedPageSize, setSelectedPageSize] = React.useState(100);
  const [initialPosOfThePage, setInitialPosOfThePage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentPaginationData = blogs.posts.slice(
    initialPosOfThePage,
    initialPosOfThePage + selectedPageSize
  );

  const updateRowsPerPage = (selectedOption) => {
    setCurrentPage(1);
    setInitialPosOfThePage(0);
    setSelectedPageSize(selectedOption);
  };

  const updatePage = (chosenPage) => {
    const initialPos = (chosenPage - 1) * selectedPageSize;
    setInitialPosOfThePage(initialPos);
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
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
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
