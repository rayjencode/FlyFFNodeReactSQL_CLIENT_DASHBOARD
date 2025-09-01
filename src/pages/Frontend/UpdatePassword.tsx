// src/pages/Login.tsx
import { colors } from '@/constants/colors';
import IconLib from '@/utils/IconsLib';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonSignInSignup from '@/components/Frontend/ButtonSignup';
import LoginInput from '@/components/Frontend/LoginInput';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { updatePassword, verifyResetPasswordToken } from '@/api/auth';

interface Props {
   handleForm: (form: string) => void;
}

interface ApiError {
   response?: {
      data?: {
         message?: string;
         errors?: string[];
         err?: string;
      };
   };
}

const UpdatePassword = ({ handleForm }: Props) => {
   const [searchParams] = useSearchParams();
   const userId = searchParams.get('userId') || '';
   const token = searchParams.get('token') || '';

   // http://localhost:3000/update-password?token=36aa70f683b44cd8d4e3b386163286408e275c76d7a67793841afad85595745a82160d8c&userId=68b437fff70ee2a44193258b
   // console.log(`----->`, token, userId);

   const [values, setValues] = useState({
      newPassword:
         import.meta.env.MODE === 'development' ||
         import.meta.env.MODE === 'development'
            ? 'Ere4u1lx1yc$'
            : '',
      confirmPassword:
         import.meta.env.MODE === 'development' ? 'Ere4u1lx1yc$' : '',
   });
   const [isLoading, setIsLoading] = useState(false);
   // Local UI state
   const [success, setSuccess] = useState(false);
   const navigate = useNavigate();
   // If missing params, bounce home
   useEffect(() => {
      if (!token || !userId) {
         navigate('/', { replace: true });
      }
   }, [token, userId, navigate]);

   // Verify reset password token on mount using react-query
   type VerifyResponse = { status: number; data: { valid: boolean } };

   const verifyQuery = useQuery<VerifyResponse>({
      queryKey: ['verify-pass-reset-token', token, userId],
      queryFn: () => verifyResetPasswordToken({ token, userId }),
      enabled: !!token && !!userId,
      retry: false,
   });

   // Redirect if invalid or request errored
   useEffect(() => {
      // console.log(`---->>>>>>`, verifyQuery);
      if (verifyQuery.isLoading) return;
      const isValid = verifyQuery.data?.data?.valid;
      if (verifyQuery.isError || isValid === false) {
         // console.log(`---valid false or error`);
         navigate('/', { replace: true });
      }
   }, [verifyQuery.isLoading, verifyQuery.isError, verifyQuery.data, navigate]);

   const handleSubmit = async () => {
      if (!values.newPassword || !values.confirmPassword) {
         toast.error('New password and confirm password are required');
         return;
      }

      if (values.newPassword !== values.confirmPassword) {
         toast.error('New password and confirm password do not match');
         return;
      }

      setIsLoading(true);

      const token: string =
         new URLSearchParams(window.location.search).get('token') || '';
      const userId: string =
         new URLSearchParams(window.location.search).get('userId') || '';

      try {
         const { status } = await updatePassword({
            token,
            userId,
            password: values.newPassword,
         });

         console.log(`status`, status);

         if (status === 200) {
            setSuccess(true);
            toast.success('Password updated successfully');
         }
      } catch (err: unknown) {
         const error = err as ApiError;
         const errorMessage =
            error.response?.data?.errors?.[0] ||
            error.response?.data?.message ||
            'Failed to update password';
         toast.error(errorMessage);
         // setError(errorMessage);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <ToastContainer />
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
                  {verifyQuery.isLoading ? (
                     <LoginBox>
                        <Title>Verifying link…</Title>
                        <Desc>
                           Please wait while we verify your reset link.
                        </Desc>
                     </LoginBox>
                  ) : success ? (
                     <LoginBox>
                        <IconWrapper>
                           <IconLib
                              icon="checkbox-circle-fill"
                              size="54px"
                              color={colors.GREEN}
                           />
                        </IconWrapper>
                        <Title $center={success}>
                           Password updated successfully
                        </Title>
                        <Desc $center={success}>
                           You can now login with your new password
                        </Desc>

                        <div onClick={() => navigate('/')}>
                           <ButtonSignInSignup
                              title="Back to Login"
                              isLoading={isLoading}
                              color={colors.GREEN}
                           />
                        </div>
                     </LoginBox>
                  ) : (
                     <LoginBox>
                        <Title>Update password?</Title>
                        <Desc>
                           Enter your new password below to reset your FlyFF CMS
                           account password.
                        </Desc>

                        <LoginActionContent>
                           <LoginInput
                              title="New Password"
                              subtitle=""
                              type="password"
                              hasIcon={true}
                              icon={
                                 !values.newPassword
                                    ? 'error-warning-fill'
                                    : values.newPassword !==
                                      values.confirmPassword
                                    ? 'error-warning-fill'
                                    : undefined
                              }
                              value={values.newPassword}
                              name="newPassword"
                              onChange={(e) =>
                                 setValues({
                                    ...values,
                                    newPassword: e.target.value,
                                 })
                              }
                           />
                           <LoginInput
                              title="Confirm Password"
                              subtitle=""
                              type="password"
                              hasIcon={true}
                              icon={
                                 !values.confirmPassword
                                    ? 'error-warning-fill'
                                    : values.newPassword !==
                                      values.confirmPassword
                                    ? 'error-warning-fill'
                                    : undefined
                              }
                              value={values.confirmPassword}
                              name="confirmPassword"
                              onChange={(e) =>
                                 setValues({
                                    ...values,
                                    confirmPassword: e.target.value,
                                 })
                              }
                           />
                        </LoginActionContent>

                        <div onClick={handleSubmit}>
                           <ButtonSignInSignup
                              title="Update Password"
                              isLoading={isLoading}
                              color={colors.PRIMARY}
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
                              By continuing, you confirm you are 18 or over and
                              agree to our{' '}
                              <PolicyLink href="#">Privacy Policy</PolicyLink>{' '}
                              and{' '}
                              <PolicyLink href="#">Terms of Use.</PolicyLink>
                           </PolicyDescription>
                        </PolicyWrapper>
                     </LoginBox>
                  )}
               </Content>
            </div>
         </Wrapper>
      </>
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

const Title = styled.h2<{ $center?: boolean }>`
   font-size: 32px;
   font-weight: 700;
   text-align: ${({ $center }) => ($center ? 'center' : 'left')};
   color: ${({ $center }) => ($center ? colors.GREEN : colors.WHITE)};
   text-transform: uppercase;
   letter-spacing: 2px;
`;
const Desc = styled.p<{ $center?: boolean }>`
   margin-top: 12px;
   font-size: 16px;
   color: ${colors.GRAY10};
   margin-bottom: 1rem;
   text-align: ${({ $center }) => ($center ? 'center' : 'left')};
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

const IconWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 1rem;
`;

export default UpdatePassword;
