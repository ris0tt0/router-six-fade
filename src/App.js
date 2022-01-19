import Logger from 'js-logger';
import SideBar from './components/side';
import './index.css';
import AppProviders from './providers';
import AppRoutes from './routes';

// eslint-disable-next-line react-hooks/rules-of-hooks
Logger.useDefaults();

function App() {
  return (
    <AppProviders>
      <div className="flex h-screen font-light background bg-stone-300">
        <div className="border border-purple-400 w-44">
          <SideBar />
        </div>
        <div className="w-full border border-purple-800">
          <AppRoutes />
        </div>
      </div>
    </AppProviders>
  );
}

export default App;
