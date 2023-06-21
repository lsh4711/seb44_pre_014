import { Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import DetailQuestion from 'pages/DetailQuestion';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/questions/:id" element={<DetailQuestion />} />
    </Routes>
  );
};

export default App;
