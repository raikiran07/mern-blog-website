import './App.css';
import {Route,Routes} from 'react-router-dom'
import Layout from "./components/Layout"
import Post from "./components/Post"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import CreatePost from "./Pages/CreatePost"
import PostPage from "./Pages/PostPage"
import MyPost from "./Pages/MyPost"
import EditPostPage from "./Pages/EditPostPage"
import {UserContextProvider} from "./ContextData/Context"






function App() {
  return (
    <UserContextProvider>

      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<HomePage/>} />
      <Route path={'/login'} element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path='/create' element={<CreatePost />} />
      <Route path='/post/:id' element={<PostPage/>} />
      <Route path='/post/mypost' element={<MyPost/>} />
      <Route path='/post/edit/:id' element={<EditPostPage/>} />
      </Route>
    
    </Routes>
   
      
    </UserContextProvider>
   
  );
}

export default App;
