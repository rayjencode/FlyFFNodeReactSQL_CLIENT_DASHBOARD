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
            <Logo>FlyFF CMS</Logo>
            <Nav>{/* <NavItem>Sign In</NavItem> */}</Nav>
         </Top>
         <div className="container">
            <Content>
               <Heading>Come in, FlyFF CMS is free.</Heading>
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
                           Zero configuration, just link your IP and go live.
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
   height: 100vh;
   background-image: url('https://assets.elements.envato.com/apps/storefront/background_signup-adf1617844902cb55792.avif');
   background-attachment: fixed;
   background-blend-mode: multiply;
   background-position: 80% 0;
   background-size: cover;

   @media (max-width: 768px) {
      background-attachment: scroll;
      background-position: center;
   }
`;

const Top = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: ${colors.GRAY1};
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

const Heading = styled.h1`
   font-size: 60px;
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
   padding: 1.5rem;
   width: 450px;
   border-radius: 5px;
   background-color: white;

   @media (max-width: 768px) {
      width: 100%;
      max-width: 450px;
      padding: 1.25rem;
   }

   @media (max-width: 480px) {
      padding: 1rem;
      border-radius: 8px;
   }
`;

const Title = styled.h2`
   font-size: 28px;
   font-weight: 700;
   text-align: center;

   @media (max-width: 768px) {
      font-size: 24px;
   }

   @media (max-width: 480px) {
      font-size: 20px;
   }
`;

const CheckList = styled.ul`
   margin-top: 2rem;

   @media (max-width: 768px) {
      margin-top: 1.5rem;
   }

   @media (max-width: 480px) {
      margin-top: 1rem;
   }
`;

const CheckItem = styled.li`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-bottom: 5px;

   @media (max-width: 480px) {
      gap: 6px;
      margin-bottom: 4px;
   }
`;

const CheckLabel = styled.label`
   font-size: 16px;
   color: ${colors.GRAY2};

   @media (max-width: 768px) {
      font-size: 14px;
   }

   @media (max-width: 480px) {
      font-size: 13px;
      line-height: 1.4;
   }
`;

const BtnActionWrapper = styled.div`
   margin-top: 2rem;

   @media (max-width: 768px) {
      margin-top: 1.5rem;
   }
`;

const OrWrapper = styled.div`
   display: grid;
   grid-template-columns: 1fr auto 1fr;
   align-items: center;
   gap: 10px;
   margin-top: 2rem;
   margin-bottom: 1rem;

   @media (max-width: 768px) {
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
   }
`;

const Or = styled.p`
   text-align: center;
   color: ${colors.GRAY1};

   @media (max-width: 480px) {
      font-size: 14px;
   }
`;

const OrLine = styled.div`
   width: 100%;
   background-color: ${colors.GRAY4};
   height: 1px;
`;

const LoginActionContent = styled.div`
   margin-bottom: 2rem;

   @media (max-width: 768px) {
      margin-bottom: 1.5rem;
   }

   @media (max-width: 480px) {
      margin-bottom: 1rem;
   }
`;

const NewHereWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 5px;
   margin-top: 2rem;

   @media (max-width: 768px) {
      margin-top: 1.5rem;
      flex-direction: column;
      gap: 8px;
   }

   @media (max-width: 480px) {
      margin-top: 1rem;
      gap: 6px;
   }
`;

const NewHereLabel = styled.p`
   font-size: 16px;
   color: ${colors.GRAY2};

   @media (max-width: 768px) {
      font-size: 14px;
   }

   @media (max-width: 480px) {
      font-size: 13px;
   }
`;

const NewHereLink = styled.p`
   font-size: 16px;
   color: ${colors.GRAY2};
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
   border-top: 1px solid ${colors.GRAY4};
   padding-top: 1.5rem;
   margin-top: 2rem;

   @media (max-width: 768px) {
      padding-top: 1.25rem;
      margin-top: 1.5rem;
   }

   @media (max-width: 480px) {
      padding-top: 1rem;
      margin-top: 1rem;
   }
`;

const PolicyDescription = styled.p`
   font-size: 14px;
   color: ${colors.GRAY2};
   line-height: 1.5;

   @media (max-width: 768px) {
      font-size: 13px;
      text-align: center;
   }

   @media (max-width: 480px) {
      font-size: 12px;
      line-height: 1.4;
   }
`;

const PolicyLink = styled.a`
   color: ${colors.GRAY2};
   text-decoration: underline;

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
