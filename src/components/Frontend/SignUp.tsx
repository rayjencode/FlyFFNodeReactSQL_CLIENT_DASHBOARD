import { colors } from '@/constants/colors';
import IconLib from '@/utils/IconsLib';
import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonSignupSocial from './ButtonSignupSocial';
// import ButtonSignup from './ButtonSignup';
import LoginInput from './LoginInput';
import ButtonSignInSignup from './ButtonSignup';
import { signIn, signUp } from '@/api/auth';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';

interface ApiError {
   response?: {
      data?: {
         message?: string;
         errors?: string[];
         err?: string;
      };
   };
}

interface Props {
   handleForm: (form: string) => void;
}

const SignUp = ({ handleForm }: Props) => {
   const navigate = useNavigate();
   const location = useLocation();
   const { setAuth } = useAuthStore();
   const [values, setValues] = useState({
      email:
         import.meta.env.MODE === 'development' ? 'rayjenscode@gmail.com' : '',
      password: import.meta.env.MODE === 'development' ? 'Cy1x1lu4ere$' : '',
      confirmPassword:
         import.meta.env.MODE === 'development' ? 'Cy1x1lu4ere$' : '',
   });
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(e.target.name, e.target.value);
      setValues({ ...values, [e.target.name]: e.target.value });

      console.log(values);
   };

   const { mutate, isPending } = useMutation({
      mutationFn: signUp,
      onSuccess: (response) => {
         if (response.status === 201) {
            // const { token, user } = response.data; // Adjust based on your API response
            // setAuth(token, user || { email: values.email }); // Store token and user
            // const from = location.state?.from || '/admin';
            // navigate(from, { replace: true });

            toast.success('OTP sent to your email');
            handleForm('verify-email');
            const randomString = Array.from(
               window.crypto.getRandomValues(new Uint8Array(24))
            )
               .map((b) => b.toString(16).padStart(2, '0'))
               .join('');
            navigate(
               `/?x-flyffcms=${randomString}&&id=${response.data.user.id}`
            );
         }
      },
      onError: (err: ApiError) => {
         const errorMessage =
            err.response?.data?.errors?.[0] ||
            err.response?.data?.message ||
            'Signup failed. Please try again.';
         setError(errorMessage);
         toast.error(errorMessage);

         // console.log(`error--`, err);
      },
   });

   const handleSubmit = async () => {
      if (isPending) return;

      const { email, password, confirmPassword } = values;

      if (!email || !password || !confirmPassword) {
         setError('Please enter email and password');
         toast.error('Please enter email and password');
         return;
      }

      if (password !== confirmPassword) {
         setError('Passwords do not match');
         toast.error('Passwords do not match');
         return;
      }

      setError('');

      mutate({
         name: '',
         email: values.email,
         password: values.password,
         confirmPassword: values.confirmPassword,
      });

      // setIsLoading(true);
      // try {
      //    const response = await signUp({
      //       name: '',
      //       email: values.email,
      //       password: values.password,
      //       confirmPassword: values.confirmPassword,
      //    });
      //    console.log(response);

      //    if (response.status === 201) {
      //       localStorage.setItem(
      //          'x-user',
      //          JSON.stringify({
      //             ...values,
      //             userId: response.data.user.id,
      //          })
      //       );
      //       toast.success('OTP sent to your email');
      //       handleForm('verify-email');
      //       const randomString = Array.from(
      //          window.crypto.getRandomValues(new Uint8Array(24))
      //       )
      //          .map((b) => b.toString(16).padStart(2, '0'))
      //          .join('');
      //       navigate(
      //          `/?x-smartfi=${randomString}&&id=${response.data.user.id}`
      //       );
      //    }
      // } catch (err: unknown) {
      //    const error = err as ApiError;
      //    console.error('Signup failed:', error);
      //    toast.error(error.response?.data?.errors?.[0] || 'Signup failed');
      //    // Handle error appropriately (e.g., show error message to user)
      // } finally {
      //    setIsLoading(false);
      // }
   };
   //    console.log(values);
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
                  <Title>Create a free account</Title>

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
                  {/* <BtnActionWrapper>
                     <ButtonSignupSocial
                        title="Continue with Google"
                        logo="google"
                     />
                     <ButtonSignupSocial
                        title="Continue with Facebook"
                        logo="facebook"
                     />
                  </BtnActionWrapper>

                  <OrWrapper>
                     <OrLine />
                     <Or>or</Or>
                     <OrLine />
                  </OrWrapper> */}

                  <LoginActionContent>
                     <LoginInput
                        title="Email"
                        subtitle=""
                        type="text"
                        hasIcon={true}
                        icon="error-warning-fill"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                     />
                     <LoginInput
                        title="Password"
                        subtitle=""
                        type="password"
                        hasIcon={false}
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                     />
                     <LoginInput
                        title="Confirm Password"
                        subtitle=""
                        type="password"
                        hasIcon={false}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                     />
                  </LoginActionContent>

                  {error && <ErrorMessage>{error}</ErrorMessage>}

                  <div onClick={handleSubmit}>
                     <ButtonSignInSignup
                        title="Sign Up"
                        color={colors.GREEN}
                        isLoading={isLoading}
                     />
                  </div>

                  <NewHereWrapper>
                     <NewHereLabel>Already have an account?</NewHereLabel>
                     <NewHereLink onClick={() => handleForm('signin')}>
                        Signin
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
   margin-bottom: 1rem;

   @media (max-width: 768px) {
      margin-bottom: 0.75rem;
   }
`;

const NewHereWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 5px;
   margin-top: 1rem;

   @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
   }

   @media (max-width: 480px) {
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
   border-top: 1px solid ${colors.GRAY4};
   padding-top: 1.5rem;
   margin-top: 1rem;

   @media (max-width: 768px) {
      padding-top: 1.25rem;
   }

   @media (max-width: 480px) {
      padding-top: 1rem;
   }
`;

const PolicyDescription = styled.p`
   font-size: 14px;
   color: ${colors.GRAY2};
   /* text-align: center; */

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
   color: ${colors.PRIMARY};
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

export default SignUp;
