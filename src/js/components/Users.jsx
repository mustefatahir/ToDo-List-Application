import React from "react";

const Users = props => {
  console.log(props);
  return (
    <div>
      hello Users
      {props.children}
    </div>
  );
};

export default Users;
