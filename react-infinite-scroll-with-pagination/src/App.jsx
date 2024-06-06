import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [offSet, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products?offset=" +
            offSet +
            "&limit=5"
        );
        const data = await response.json();
        setData((pre) => [...pre, ...data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [offSet]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offSet + 5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offSet]);

  return (
    <div className="App">
      <div className="product-list">
        <h1>Product List</h1>
        {data &&
          data.map((product) => (
            <div
              className="prduct-item"
              key={product.id}
              style={{
                border: "1px solid white",
                display: "flex",
                margin: "10px",
              }}
            >
              <img
                src={JSON.parse(product.images[1])}
                alt=""
                style={{ width: "200px", height: "200px" }}
              />
              <div className="product-info">
                <h4 className="product-name">{product.title}</h4>
                <p className="product-price">{product.price}$</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
