import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import RecentQuotes from './components/RecentQuotes';
import Socials from './components/Socials';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Socials />
      <RecentQuotes />
    </div>

  );
}

export default App;
