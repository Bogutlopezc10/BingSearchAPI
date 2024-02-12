import './App.css';
import BingSearch from './components/BingSearchApi';

function App() {
  return (
    <div className="container">
      <div className="row mt-3" style={{ minHeight: '100vh' }}>
        <div className="col-md-12 justify-content-center align-items-center">
          <h1 className="text-center mb-4 font-weight-bold">Bing Search API</h1>
          <BingSearch />
        </div>
      </div>
    </div>
  );
}

export default App;
