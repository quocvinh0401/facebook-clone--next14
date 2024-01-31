export interface Query {
  filters: any;
  pagination: QueryPagination;
}

export interface QueryPagination {
  page: string;
  size: string;
}
