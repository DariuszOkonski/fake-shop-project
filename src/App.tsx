import Header from "./components/Header";
import StoreProvider from "./store/StoreProvider";

function App() {

  return (
    <StoreProvider>
      <div className="App">
        <Header />
      </div>
    </StoreProvider>
  );
}

export default App;