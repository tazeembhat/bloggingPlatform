import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Blogs } from "./Pages/Blogs";
import { Blog } from "./Pages/Blog";
import { MessageFailure, MessageSuccess } from "./components/Message";
import { Publish } from "./Pages/Publish";
import { MyBlogs } from "./Pages/Myblogs";
import { UpdateBlog } from "./Pages/Update";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/update" element={<UpdateBlog />} />
        <Route path="/messagefailure" element={<MessageFailure />} />
        <Route path="/messagesuccess" element={<MessageSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
