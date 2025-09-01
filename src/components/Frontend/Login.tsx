// src/pages/Login.tsx
import { colors } from '@/constants/colors';
import IconLib from '@/utils/IconsLib';

import styled from 'styled-components';
// import ButtonSignupSocial from './ButtonSignupSocial';
// import ButtonSignInSignup from './ButtonSignup';
// import LoginInput from './LoginInput';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';
import { signIn } from '@/api/auth';
import LoginInput from '@/components/Frontend/LoginInput';
import ButtonSignInSignup from '@/components/Frontend/ButtonSignup';
import { useState } from 'react';

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

const Login = ({ handleForm }: Props) => {
   const navigate = useNavigate();
   const location = useLocation();
   const { setAuth } = useAuthStore();
   const [values, setValues] = useState({
      email:
         import.meta.env.MODE === 'development' ? 'rayjenscode@gmail.com' : '',
      password: import.meta.env.MODE === 'development' ? 'Cy1x1lu4ere$' : '',
   });
   const [error, setError] = useState('');

   const { mutate, isPending } = useMutation({
      mutationFn: signIn,
      onSuccess: (response) => {
         const { token, user } = response.data;

         // console.log(`----> response`, response);

         // console.log(`---> user`, typeof profile);
         // console.log(`---> name`, typeof profile.name);
         // console.log(`---> email`, typeof profile.email);

         if (
            user &&
            typeof user === 'object' &&
            typeof user.name === 'string' &&
            typeof user.email === 'string'
         ) {
            setAuth(token, user); // ✅ Safe

            const from = location.state?.from || '/admin';
            navigate(from, { replace: true });
            // console.log(`------>`, `Good to go!`);
         } else {
            console.error('Invalid user format:', user);
            toast.error('Login failed: invalid user data');
            return;
         }

         // setAuth(token, user); // ✅ Safe
      },

      onError: (err: ApiError) => {
         const errorMessage =
            err.response?.data?.err ||
            err.response?.data?.message ||
            'Login failed. Please try again.';
         setError(errorMessage);
         toast.error(errorMessage);
      },
   });

   const handleSubmit = () => {
      if (isPending) return;

      const { email, password } = values;
      if (!email || !password) {
         setError('Please enter email and password');
         toast.error('Please enter email and password');
         return;
      }

      setError('');
      mutate({ email, password });
   };

   const handleRedirect = (path: string) => {
      // navigate(path);
      handleForm(path);
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
                  <Title>Hi! Welcome back.</Title>

                  <CheckList>
                     <CheckItem>
                        <IconLib
                           icon="check-circle-line"
                           size="24px"
                           color={colors.GRAY1}
                        />
                        <CheckLabel>
                           Create your FlyFF Website in seconds!
                        </CheckLabel>
                     </CheckItem>
                     <CheckItem>
                        <IconLib
                           icon="check-circle-line"
                           size="24px"
                           color={colors.GRAY1}
                        />
                        <CheckLabel>
                           Zero installation, just link your IP and go live.
                        </CheckLabel>
                     </CheckItem>
                  </CheckList>
                  {/* Uncomment if you want to enable social login buttons */}
                  {/* <BtnActionWrapper>
              <ButtonSignupSocial title="Continue with Google" logo="google" />
              <ButtonSignupSocial title="Continue with Facebook" logo="facebook" />
            </BtnActionWrapper>
            <OrWrapper>
              <OrLine />
              <Or>or</Or>
              <OrLine />
            </OrWrapper> */}

                  <LoginActionContent>
                     <LoginInput
                        title="Email"
                        subtitle="Remind me"
                        type="text"
                        hasIcon={true}
                        icon={!values.email ? 'error-warning-fill' : undefined}
                        value={values.email}
                        name="email"
                        onChange={(e) =>
                           setValues({ ...values, email: e.target.value })
                        }
                     />
                     <LoginInput
                        title="Password"
                        subtitle="Forgot"
                        onSubtitleClick={() =>
                           handleRedirect('forgot-password')
                        }
                        type="password"
                        hasIcon={false}
                        value={values.password}
                        name="password"
                        onChange={(e) =>
                           setValues({ ...values, password: e.target.value })
                        }
                     />
                     {error && <ErrorMessage>{error}</ErrorMessage>}
                  </LoginActionContent>

                  <div onClick={handleSubmit}>
                     <ButtonSignInSignup
                        title="Sign In"
                        isLoading={isPending}
                        color={colors.GREEN}
                     />
                  </div>

                  <NewHereWrapper>
                     <NewHereLabel>New here?</NewHereLabel>
                     <NewHereLink onClick={() => handleForm('signup')}>
                        Create an account
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

const Overlay = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 1;
   /* pointer-events: none; */
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   /* background: ${colors.GRAY1}; */
   padding: 5px 1rem;

   @media (max-width: 480px) {
      padding: 5px 0.75rem;
   }
`;

const Logo = styled.h1`
   font-weight: 700;
   color: white;

   @media (max-width: 480px) {
      font-size: 1.5rem;
   }
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

   @media (max-width: 480px) {
      font-size: 0.9rem;
   }
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

   @media (max-width: 1024px) {
      font-size: 48px;
      text-align: center;
   }

   @media (max-width: 768px) {
      font-size: 36px;
   }

   @media (max-width: 480px) {
      font-size: 28px;
      line-height: 1.2;
   }
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
      /* max-height: 80vh; */
      /* overflow-y: auto; */
   }

   @media (max-width: 480px) {
      padding: 1.25rem;
      border-width: 1px;
   }
`;

const Title = styled.h2`
   font-size: 32px;
   font-weight: 700;
   text-align: center;
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

const CheckList = styled.ul`
   margin-top: 2.5rem;

   @media (max-width: 768px) {
      margin-top: 2rem;
   }

   @media (max-width: 480px) {
      margin-top: 1.5rem;
   }
`;

const CheckItem = styled.li`
   display: flex;
   align-items: center;
   gap: 10px;
   margin-bottom: 8px;

   @media (max-width: 480px) {
      gap: 8px;
      margin-bottom: 6px;
   }
`;

const CheckLabel = styled.label`
   font-size: 16px;
   color: ${colors.GRAY10};

   @media (max-width: 768px) {
      font-size: 14px;
   }

   @media (max-width: 480px) {
      font-size: 13px;
      line-height: 1.4;
   }
`;

const BtnActionWrapper = styled.div`
   margin-top: 2.5rem;

   @media (max-width: 768px) {
      margin-top: 2rem;
   }
`;

const OrWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr auto 1fr;
   align-items: center;
   gap: 12px;
   margin-top: 2.5rem;
   margin-bottom: 1.5rem;

   @media (max-width: 768px) {
      margin-top: 2rem;
      margin-bottom: 1rem;
   }
`;

const Or = styled.p`
   text-align: center;
   color: ${colors.GRAY5};
   font-weight: 600;

   @media (max-width: 480px) {
      font-size: 14px;
   }
`;

const OrLine = styled.div`
   width: 100%;
   background-color: ${colors.GRAY_DARK};
   height: 2px;
`;

const LoginActionContent = styled.div`
   margin-bottom: 2.5rem;

   @media (max-width: 768px) {
      margin-bottom: 2rem;
   }

   @media (max-width: 480px) {
      margin-bottom: 1.5rem;
   }
`;

const NewHereWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 6px;
   margin-top: 2.5rem;

   @media (max-width: 768px) {
      margin-top: 2rem;
      flex-direction: column;
      gap: 10px;
   }

   @media (max-width: 480px) {
      margin-top: 1.5rem;
      gap: 8px;
   }
`;

const NewHereLabel = styled.p`
   font-size: 16px;
   color: ${colors.GRAY5};

   @media (max-width: 768px) {
      font-size: 14px;
   }

   @media (max-width: 480px) {
      font-size: 13px;
   }
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

   @media (max-width: 768px) {
      font-size: 14px;
   }

   @media (max-width: 480px) {
      font-size: 13px;
   }
`;

const PolicyWrapper = styled.div`
   border-top: 2px solid ${colors.GRAY_DARK};
   padding-top: 1.5rem;
   margin-top: 2.5rem;

   @media (max-width: 768px) {
      padding-top: 1.25rem;
      margin-top: 2rem;
   }

   @media (max-width: 480px) {
      padding-top: 1rem;
      margin-top: 1.5rem;
   }
`;

const PolicyDescription = styled.p`
   font-size: 14px;
   color: ${colors.GRAY5};
   line-height: 1.6;

   @media (max-width: 768px) {
      font-size: 13px;
      text-align: center;
   }

   @media (max-width: 480px) {
      font-size: 12px;
      line-height: 1.5;
   }
`;

const PolicyLink = styled.a`
   color: ${colors.PRIMARY};
   text-decoration: underline;
   font-weight: 600;

   @media (max-width: 480px) {
      font-size: 12px;
   }
`;

const ErrorMessage = styled.p`
   color: red;
   font-size: 14px;
   margin-top: 0.5rem;
   text-align: center;

   @media (max-width: 768px) {
      font-size: 13px;
   }

   @media (max-width: 480px) {
      font-size: 12px;
      margin-top: 0.25rem;
   }
`;

export default Login;
