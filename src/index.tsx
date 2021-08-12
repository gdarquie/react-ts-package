import React, {useState} from "react";

const SayHello = (): JSX.Element => {
  const [count] = useState(0);

  return (
    <div>Hello World {count}</div>
  )
};

export default SayHello;