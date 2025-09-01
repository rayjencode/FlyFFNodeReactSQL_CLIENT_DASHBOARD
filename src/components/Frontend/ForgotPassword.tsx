// src/pages/Login.tsx
import { colors } from '@/constants/colors';
import IconLib from '@/utils/IconsLib';
import React, { useState } from 'react';
import styled from 'styled-components';
// import ButtonSignupSocial from './ButtonSignupSocial';
// import ButtonSignInSignup from './ButtonSignup';
// import LoginInput from './LoginInput';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';
import { forgetPassword, signIn } from '@/api/auth';
import LoginInput from '@/components/Frontend/LoginInput';
import ButtonSignInSignup from '@/components/Frontend/ButtonSignup';

interface Props {
   handleForm: (form: string) => void;
}

interface ApiError {
   message?: string;
   response?: {
      data?: {
         message?: string;
         errors?: string[];
         err?: string;
      };
   };
}

const ForgotPassword = ({ handleForm }: Props) => {
   const [values, setValues] = useState({
      email:
         import.meta.env.VITE_NODE_ENV === 'development' ||
         import.meta.env.VITE_NODE_ENV === 'test' ||
         import.meta.env.VITE_NODE_ENV === 'development'
            ? 'rayjenscode@gmail.com'
            : '',
   });
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async () => {
      if (!values.email) {
         setError('Email is required');
         return;
      }

      setIsLoading(true);
      const { status, data } = await forgetPassword({ email: values.email });
      console.log(`------ status`, status, data);
      console.log(`------ data`, data);

      if (status === 200) {
         toast.success('Password reset email sent');
      } else {
         toast.error('Failed to send password reset email');
      }

      setIsLoading(false);
   };

   return (
      <Wrapper>
         <Top>
            <div></div>
            <Logo>
               <LogoIcon src="logo.png" alt="FlyFF CMS" />
            </Logo>
            <Nav>{/* <NavItem>Sign In</NavItem> */}</Nav>
         </Top>
         <div className="container">
            <Content>
               {/* <Heading>Come in, FlyFF CMS is free.</Heading> */}
               <ImageFloatingWrapper>
                  <ImgFloating
                     src="https://res.cloudinary.com/rayjenscode/image/upload/v1756721703/jabcabiexzhz8k3ynw8w.png"
                     alt="FlyFF CMS"
                  />
               </ImageFloatingWrapper>
               <LoginBox>
                  <Title>Forgot password?</Title>
                  <Desc>
                     You forgot your password? Here you can easily retrieve a
                     new password.
                  </Desc>

                  <LoginActionContent>
                     <LoginInput
                        title="Email"
                        subtitle=""
                        type="text"
                        hasIcon={true}
                        icon={!values.email ? 'error-warning-fill' : undefined}
                        value={values.email}
                        name="email"
                        onChange={(e) =>
                           setValues({ ...values, email: e.target.value })
                        }
                     />

                     {error && <ErrorMessage>{error}</ErrorMessage>}
                  </LoginActionContent>

                  <div onClick={handleSubmit}>
                     <ButtonSignInSignup
                        title="Send Reset Link"
                        isLoading={isLoading}
                        color={colors.DANGER}
                     />
                  </div>

                  <NewHereWrapper>
                     <NewHereLabel>Remember your password?</NewHereLabel>
                     <NewHereLink onClick={() => handleForm('signin')}>
                        Back to Login
                     </NewHereLink>
                  </NewHereWrapper>

                  <PolicyWrapper>
                     <PolicyDescription>
                        By continuing, you confirm you are 18 or over and agree
                        to our <PolicyLink href="#">Privacy Policy</PolicyLink>{' '}
                        and <PolicyLink href="#">Terms of Use.</PolicyLink>
                     </PolicyDescription>
                  </PolicyWrapper>
               </LoginBox>
            </Content>
         </div>
      </Wrapper>
   );
};

// Styled Components (unchanged except for ErrorMessage)
const Wrapper = styled.div`
   position: relative;
   min-height: 100vh;
   background-image: url('https://res.cloudinary.com/rayjenscode/image/upload/v1756715735/lbbga7tk7uvisyllffzs.jpg');
   background-attachment: fixed;
   background-blend-mode: multiply;
   background-position: 80% 0;
   background-size: cover;

   /* overlay */
   &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5); /* black with 50% opacity */
      z-index: 1;
   }

   /* make sure inner content stays above overlay */
   > * {
      position: relative;
      z-index: 2;
   }

   @media (max-width: 1024px) {
      height: auto;
      background-attachment: scroll;
      background-position: center;
   }
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   /* background: ${colors.GRAY1}; */
   padding: 5px 1rem;
`;

const Logo = styled.h1`
   font-weight: 700;
   color: white;
`;

const LogoIcon = styled.img`
   width: 100px;

   @media (max-width: 480px) {
      min-width: 30px;
   }
`;

const Nav = styled.nav``;

const NavItem = styled.a`
   color: white;
`;
const Content = styled.div`
   padding: 5rem 1rem;
   display: grid;
   place-items: center;
   grid-template-columns: 1fr auto;

   @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 3rem 1rem;
      overflow-y: auto;
   }

   @media (max-width: 768px) {
      padding: 2rem 1rem;
      gap: 1.5rem;
   }

   @media (max-width: 480px) {
      padding: 1.5rem 0.75rem;
      gap: 1rem;
   }
`;

const ImageFloatingWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   /* background-color: rgba(255, 255, 255, 0.1); */
   padding: 1rem;
   border-radius: 10px;
   animation: float 6s ease-in-out infinite;

   @keyframes float {
      0%,
      100% {
         transform: translateY(0);
      }
      50% {
         transform: translateY(-20px);
      }
   }

   @media (max-width: 1024px) {
      order: -1;
   }

   @media (max-width: 480px) {
      padding: 0.5rem;
   }
`;

const ImgFloating = styled.img`
   width: 400px;
   max-width: 100%;

   @media (max-width: 768px) {
      width: 300px;
   }

   @media (max-width: 480px) {
      width: 200px;
   }
`;

const Heading = styled.h1`
   font-size: 40px;
   font-weight: 700;
   color: white;
`;

const LoginBox = styled.div`
   padding: 2rem;
   width: 450px;
   border-radius: 0;
   background-color: rgba(29, 29, 31, 0.8);
   border: 2px solid ${colors.PRIMARY};
   box-shadow: 0 0 25px rgba(55, 96, 249, 0.6);

   @media (max-width: 768px) {
      width: 100%;
      max-width: 450px;
      padding: 1.5rem;
      /* max-height: 80vh;
      overflow-y: auto; */
   }

   @media (max-width: 480px) {
      padding: 1.25rem;
      border-width: 1px;
   }
`;

const Title = styled.h2`
   font-size: 32px;
   font-weight: 700;
   color: ${colors.WHITE};
   text-transform: uppercase;
   letter-spacing: 2px;

   @media (max-width: 768px) {
      font-size: 28px;
   }

   @media (max-width: 480px) {
      font-size: 24px;
   }
`;
const Desc = styled.p`
   margin-top: 12px;
   font-size: 16px;
   color: ${colors.GRAY10};
`;
const CheckList = styled.ul`
   margin-top: 2rem;
`;

const CheckItem = styled.li`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-bottom: 5px;
`;

const CheckLabel = styled.label`
   font-size: 16px;
   color: ${colors.GRAY2};
`;

const BtnActionWrapper = styled.div`
   margin-top: 2rem;
`;

const OrWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr auto 1fr;
   align-items: center;
   gap: 10px;
   margin-top: 2rem;
   margin-bottom: 1rem;
`;

const Or = styled.p`
   text-align: center;
   color: ${colors.GRAY1};
`;

const OrLine = styled.div`
   width: 100%;
   background-color: ${colors.GRAY4};
   height: 1px;
`;

const LoginActionContent = styled.div`
   margin-bottom: 2rem;
`;

const NewHereWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 5px;
   margin-top: 2rem;
`;

const NewHereLabel = styled.p`
   font-size: 16px;
   color: ${colors.GRAY2};
`;

const NewHereLink = styled.p`
   font-size: 16px;
   color: ${colors.PRIMARY};
   font-weight: 700;
   cursor: pointer;
   transition: all 0.3s ease;
   &:hover {
      color: ${colors.PRIMARY70};
      text-decoration: underline;
   }
`;

const PolicyWrapper = styled.div`
   border-top: 1px solid ${colors.GRAY4};
   padding-top: 1.5rem;
   margin-top: 2rem;
`;

const PolicyDescription = styled.p`
   font-size: 14px;
   color: ${colors.GRAY2};
`;

const PolicyLink = styled.a`
   color: ${colors.PRIMARY};
   text-decoration: underline;
`;

const ErrorMessage = styled.p`
   color: red;
   font-size: 14px;
   margin-top: 0.5rem;
   text-align: center;
`;

export default ForgotPassword;
