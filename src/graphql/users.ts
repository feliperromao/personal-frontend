import { gql } from "@apollo/client";

export const LIST_STUDENTS_QUERY = gql`
  query listStudents($personal_id: String!) {
    listStudents(personal_id: $personal_id){
      id
      name
      email
      personal_id
      blocked
      type
      }
    }
`;

export const CREATE_STUDENT_MUTATION = gql`
mutation CreateStudent($name: String!, $email: String!, $password: String!, $personal_id: String!) {
  createStudent(user: {
    name: $name
    email: $email
    password: $password
    personal_id: $personal_id
  }) {
    id
    name
    email
    personal_id
    blocked
    type
  }
}
`;


export const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudents($id: ID!) {
    deleteStudents(
      ids: [$id]
    )
  }
`;