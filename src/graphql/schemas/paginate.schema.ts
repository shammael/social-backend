const paginateSchema = `#graphql 

interface Paginate {
  totalDocs: Int!
  limit: Int!
  hasPrevPage: Boolean!
  hasNextPage: Boolean!
  page: Int
  totalPages: Int!
  offset: Int!
  prevPage: Int
  nextPage: Int
  pagingCounter: Int!
}


`;

export default paginateSchema;
