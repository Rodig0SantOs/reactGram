import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <button onClick={() => alert("Hello, world!")}>Click me</button>
    </div>
  );
};

export default Home;
