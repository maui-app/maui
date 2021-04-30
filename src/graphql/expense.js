import { gql } from "@apollo/client";

export const TOPEXPENSES = gql`
  query TopExpenses($id: ID) {
    topExpenses(id: $id)
  }
`;

export const DAILYEXPENSES = gql`
  query DailyExpenses($number: Int, $page: Int, $date: String!, $all: Boolean) {
    dailyExpenses(number: $number, page: $page, date: $date, all: $all) {
      expenses {
        name
        amount
        time
      }
      sum
      errorId
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;

export const WEEKLYEXPENSES = gql`
  query WeeklyExpenses(
    $number: Int
    $page: Int
    $days: Int
    $date: String!
    $all: Boolean
  ) {
    weeklyExpenses(
      number: $number
      page: $page
      days: $days
      date: $date
      all: $all
    ) {
      expenses {
        name
        amount
        time
      }
      sum
      errorId
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;
