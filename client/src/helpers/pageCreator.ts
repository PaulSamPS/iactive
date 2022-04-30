export const createPages = (pages: number[], totalPage: number, currentPage: number) => {
  if (totalPage > 6) {
    if (currentPage > 3) {
      for (let i = currentPage - 3; i <= currentPage + 1; i++) {
        pages.push(i);
        if (i === totalPage) break;
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
        if (i === totalPage) break;
      }
    }
  } else {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
  }
};
