import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TypePage from "./pages/TypesPage";
import ChampionsPage from "./pages/ChampionsPage";
import ChampionPage from "./pages/ChampionPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./authContext/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import CollectionPage from "./pages/CollectionPage";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/types" element={<TypePage />} />
              <Route exact path="/champions" element={<ChampionsPage />} />
              <Route
                exact
                path="/champions/name-:name"
                element={<ChampionPage />}
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/collection/:username/champions"
                element={
                  <PrivateRoute>
                    <CollectionPage />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/collection/:username/champions/:name"
                element={
                  <PrivateRoute>
                    <ChampionPage />
                  </PrivateRoute>
                }
              />
            </Routes>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
