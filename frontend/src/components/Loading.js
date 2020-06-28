import React, { useState, useEffect } from "react";

const Loading = () => {
  const [dotsCount, setDotsCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      () => setDotsCount((count) => (count % 3) + 1),
      200
    );

    return () => clearInterval(interval);
  }, []);

  return <h4>Loading{".".repeat(dotsCount)}</h4>;
};

export default Loading;
