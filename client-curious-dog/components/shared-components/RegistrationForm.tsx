import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { registerUser } from '../../lib/api/user.api';
import { userAtom } from '../../lib/atoms/user.atom';
import { emailValidationObj, passwordValidationObj, userNameValidationObj } from '../../lib/validation/shared-validation';
import { setAuthToken } from '../../util/token-storage';
import ValidationError from './ValidationError';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import BadgeChecker from './BadgeChecker';

interface Props {
  openLoginForm: () => void;
}

const LoginForm = ({ openLoginForm }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const schema = yup.object().shape({
    username: userNameValidationObj,
    email: emailValidationObj,
    password: passwordValidationObj,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    shouldFocusError: false,
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const typedPasssword = watch('password');
  const registerHandler = async (formData: { email: string; password: string; username: string }): Promise<void> => {
    setLoading(true);
    try {
      const resData = await registerUser(formData.email, formData.password, formData.username);
      setAuthToken(resData.token);
      setUser(resData);
    } catch (e) {
      toast('Registeration failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/feed');
    }
  }, [router, user]);

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-l from-zinc-300 to-zinc-600 shadow-lg transform skew-y-6 sm:skew-y-0 sm:rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w mx-auto">
          <div>
            <h1 className="text-2xl font-semibold text-center">Welcom Aboard</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <form className="py-8 text-sm  w-full space-y-6 text-gray-700 sm:text-lg sm:leading-10 " onSubmit={handleSubmit(registerHandler)}>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  className="peer text-sm bg-slate-50 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="User Name"
                  {...register('username')}
                  disabled={loading}
                />
                <label
                  htmlFor="username"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  User Name
                </label>
              </div>
              {errors.username ? <ValidationError msg={errors.username.message} /> : null}

              <div className="relative">
                <input
                  id="email"
                  type="text"
                  className="peer text-sm bg-slate-50 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Email address"
                  {...register('email')}
                  disabled={loading}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
              {errors.email ? <ValidationError msg={errors.email.message} /> : null}

              <div className="relative">
                <input
                  id="password"
                  {...register('password')}
                  type="password"
                  className="peer bg-slate-50 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                  disabled={loading}
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="relative flex flex-wrap">
                <BadgeChecker text="8 character min" condition={typedPasssword.length > 7} />
                <BadgeChecker text="A capital letter" condition={/[A-Z]/.test(typedPasssword)} />
                <BadgeChecker text="A small letter" condition={/[a-z]/.test(typedPasssword)} />
                <BadgeChecker text="A special character" condition={/[\-_\=.#^()+`~'",<.>/[\]{};:|\\@$!%*?&]/.test(typedPasssword)} />
              </div>
              {errors.password ? <ValidationError msg={errors.password.message} /> : null}
              <div className="relative">
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 bg-purple-100 text-black font-medium text-xs leading-tight rounded shadow-md hover:bg-purple-300 hover:shadow-lg focus:bg-purple-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-400 active:shadow-lg transition duration-150 ease-in-out"
                >
                  {loading ? <LoadingSpinner /> : 'Register'}
                </button>
              </div>
              <p className="text-center text-sm">
                Already a member
                <span className="underline hover:text-purple-700 hover:shadow-lg hover:cursor-pointer ml-1" onClick={openLoginForm}>
                  log in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
