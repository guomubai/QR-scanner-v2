/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      firstname
      lastname
      email
      title
      cardnumber
      cardbalance
      Admin
      username
      createdAt
      updatedAt
    }
  }
`;
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        email
        title
        cardnumber
        cardbalance
        Admin
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const employeesByUsername = /* GraphQL */ `
  query EmployeesByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    employeesByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstname
        lastname
        email
        title
        cardnumber
        cardbalance
        Admin
        username
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
