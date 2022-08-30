import StoreProvider from "./store/StoreProvider";

function App() {

  return (
    <StoreProvider>
      <div className="App">
        <header>
          <h1>Hello World</h1>              
        </header>    
      </div>
    </StoreProvider>
  );
}

export default App;