import "./App.css";
import CardList from "../src/components/CardsList";

function App() {
  return (
    <div className="App">
      <header>
        <h1>The Rijksmuseum - RijksData API</h1>
      </header>
      <main>
        <CardList />
      </main>
    </div>
  );
}

export default App;
