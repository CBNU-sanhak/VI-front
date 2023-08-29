
import { RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorPage from './Page/ErrorPage';
import { createBrowserRouter } from 'react-router-dom';
import Home from './Page/Home';
import Board from './Page/Board';
import BoardDetail from './Page/BoardDetail';
import WriteBoardPage from './Page/WriteBoardPage';
import BoardFreePage from './Page/BoardFreePage';
import Root from './Page/Root';
import Login from './Page/Login';
import Signup from './Page/Signup';
import Mypage from './Page/Mypage';
import InterviewResult from './Page/InterviewResult';
import { LoginModeProvider } from './context/LoginModeContext';
import Help from './Page/help';
import AdminPageLayout from './Page/adminPage/AdminPageLayout';
import AdminMainPage from './Page/adminPage/AdminMainPage';
import AdminCustomerService from './Page/adminPage/AdminCustomerService';
import AdminBoard from './Page/adminPage/AdminBoard';
import AdminStudygroup from './Page/adminPage/AdminStudygroup';
import AdminInterview from './Page/adminPage/AdminInterview';


const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children:[
        { index:true,element:<Home/>},
        { path: "/board/write",
          element: <WriteBoardPage />
        },
        {
          path: "/board/free",
          element: <BoardFreePage />
        },
        {
          path: "/board/:boardId",
          element: <BoardDetail />,
          errorElement: <ErrorPage />,
      
        },
        {
          path: "/board",
          element: <Board />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/board/free",
          element: <BoardFreePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/mypage",
          element: <Mypage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/help",
          element: <Help />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/interview/result/:interviewId",
          element: <InterviewResult />,
          errorElement: <ErrorPage />,
        },
      ]
      
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
      element: <AdminPageLayout />,
      errorElement: <ErrorPage />,
      children:[
        { index:true,element:<AdminMainPage/>},
        { path: "customer-service",
          element: <AdminCustomerService />
        },
        { path: "board",
          element: <AdminBoard />
        },
        { path: "studygroup",
          element: <AdminStudygroup />
        },
        { path: "interview",
          element: <AdminInterview />
        },
      ]
  }
  
]);


function App() {
  return (
    <div className="App">
      <LoginModeProvider>
        <RouterProvider router={router} ></RouterProvider>
      </LoginModeProvider>
    </div>
  );
}

export default App;
