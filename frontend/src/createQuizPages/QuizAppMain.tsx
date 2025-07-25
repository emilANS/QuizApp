import { UseAuth } from "../context/AuthContext";

export default function QuizAppMain() {
  const { isAuthenticated } = UseAuth();

  function redirectToCreateQuiz() {
    window.location.pathname = "/create-quiz";
  }

  function redirectToLogin() {
    window.location.pathname = "/login";
  }

  function redirectToRegister() {
    window.location.pathname = "/register";
  }

  function redirectToBrowseQuizzes() {
    window.location.pathname = "/browse-quizzes";
  }

  function redirectToMultiplayer() {
    window.location.pathname = "/multiplayer-choose";
  }

  return (
    <div>
      <h1>Test</h1>

      <button onClick={redirectToCreateQuiz}>Create your quiz!</button>

      <br></br>

      <button onClick={redirectToLogin}>Go To Login Page</button>

      <br></br>

      <button onClick={redirectToRegister}>Go To Register Page</button>

      <br></br>

      <button onClick={redirectToBrowseQuizzes}>Browse Quizzes</button>

      <br></br>

      <button onClick={redirectToMultiplayer}>Play multiplayer!</button>

      {isAuthenticated && <button>Log out</button>}
    </div>
  );
}
