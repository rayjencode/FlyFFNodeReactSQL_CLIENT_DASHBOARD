import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { fetchPosts } from '@/api/exampleApi';
// import { Post } from '@/types/post';
import Login from '@/components/Frontend/Login';
import SignUp from '@/components/Frontend/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyEmail from '@/components/Frontend/VerifyEmail';
import ForgotPassword from '@/components/Frontend/ForgotPassword';
// import ForgotPassword from '@/components/Frontend/ForgotPassword';
// import SignIn from '@/components/Frontend/SignIn';
const Layout = () => {
   const [form, setForm] = useState('signin');
   //   const { data, isLoading, error } = useQuery<Post[]>({
   //     queryKey: ["posts"],
   //     queryFn: fetchPosts,
   //     // optional: additional options...
   //   });

   //   if (isLoading) return <div>Loading...</div>;
   //   if (error) return <div>Error occurred</div>;

   const handleForm = (form: string) => {
      setForm(form);
   };

   return (
      <div>
         {/* <Login /> */}

         {/* <h1>Posts</h1>
      {data?.map((post: Post) => (
        <div key={post.id}>{post.title}</div>
      ))} */}
         {/* <h1>Login</h1> */}
         <ToastContainer />
         {form === 'signin' && <Login handleForm={handleForm} />}
         {form === 'signup' && <SignUp handleForm={handleForm} />}
         {form === 'verify-email' && <VerifyEmail handleForm={handleForm} />}
         {form === 'forgot-password' && (
            <ForgotPassword handleForm={handleForm} />
         )}
      </div>
   );
};

export default Layout;
