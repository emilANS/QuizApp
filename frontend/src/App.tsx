import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import QuizAppMain from "./createQuizPages/QuizAppMain";
import CreateQuiz from "./createQuizPages/CreateQuiz";
import LoginPage from "./LoginRegisterPages/LoginPage";
import RegisterPage from "./LoginRegisterPages/RegisterPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { BrowseQuiz } from "./browseQuiz/BrowseQuiz";
import { PlayQuizMain } from "./playQuiz/PlayQuizMain";
import { QuizMultiplayerChoose } from "./multiplayerMode/QuizMultiplayerChoose";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <QuizAppMain />
              </AuthProvider>
            }
          ></Route>

          <Route
            path="/create-quiz"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <CreateQuiz />
                </ProtectedRoute>
              </AuthProvider>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <AuthProvider>
                <LoginPage />
              </AuthProvider>
            }
          ></Route>

          <Route
            path="/multiplayer-choose"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <QuizMultiplayerChoose />
                </ProtectedRoute>
              </AuthProvider>
            }
          ></Route>

          <Route path="/register" element={<RegisterPage />}></Route>

          <Route path="/browse-quizzes" element={<BrowseQuiz />}></Route>

          <Route path="/browse-quizzes/play-quiz" element={<PlayQuizMain />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
