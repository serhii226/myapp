import React from "react";
import "./App.css";
import Amplify, {
  API,
  graphqlOperation
} from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;

class App extends React.Component {
  todoMutation = async () => {
    const todoDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };
  
    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  };
  
  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };

  render() {
    return (
      <div className="App">
        <p> Pick a file</p>
        <button onClick={this.listQuery}>GraphQL Query</button>
        <button onClick={this.todoMutation}>GraphQL Mutation</button>
      </div>
    );
  }
}

const signUpConfig = {
  header: "Sign Up",
  hideAllDefaults: true,
  defaultCountryCode: "1",
  signUpFields: [
    {
      label: "My user name",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string"
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 4,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password"
    }
  ]
};

const usernameAttributes = "Email";

export default withAuthenticator(App, { signUpConfig, usernameAttributes });
