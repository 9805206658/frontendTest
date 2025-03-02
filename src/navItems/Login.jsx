import { useState, useEffect } from "react";

const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <h1>Count: {count}</h1>;
};

 


function Login()
{
    return(
        <div>
            <Timer/>
        </div>
    )
}
export default Login;