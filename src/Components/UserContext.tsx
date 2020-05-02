import React, { Component } from "react";

type User = {
  name: String;
  mail: String;
  number: String;
  age: number;
  gender: String;
  photo?: any;
};
type UserContext = {
  signed: Boolean;
  user?: User;
  toggleAuth: () => void;
  setUser: (value: User) => void;
};
const UserContext = React.createContext<UserContext | undefined>(undefined);
class UserProvider extends Component<{}, UserContext> {
  // Context state
  constructor(props: any) {
    super(props);
    this.state = {
      signed: false,
      user: {
        name: "vasavi",
        mail: "vasavi@mail.com",
        age: 20,
        gender: "Female",
        number: "7986542310",
      },
      toggleAuth: this.toggleAuth,
      setUser: this.setUser,
    };
    this.toggleAuth = this.toggleAuth.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  toggleAuth() {
    this.setState({ signed: !this.state.signed });
  }

  // Method to update state
  setUser(user: any) {
    this.setState({ user });
  }

  render() {
    // const { children } = this.props
    // const { user } = this.state
    // const { setUser } = this

    return (
      <UserContext.Provider
        value={{
          //signed:this.state.signed,
          signed: this.state.signed,
          user: this.state.user,
          toggleAuth: this.toggleAuth,
          setUser: this.setUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider };
