"use client";
import { useCallback, useState } from "react";
import Input from "../components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("Sign in");
  const [error, setError] = useState(""); // New state for error handling

  const toggleVariant = useCallback(() => {
    setVariant((current) => (current === 'Sign in' ? 'Register' : 'Sign in'));
  }, []);

  const login = useCallback(async () => {
    try {
      const result = await signIn('credentials', {
        email, password,
        redirect: false,
        callbackUrl: '/profiles'
      });
      if (result?.error) {
        setError(result.error);
      }
    }
    catch (e) {
      setError("An unexpected error occurred");
      console.error(e);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {  // Correct path based on your structure
        email,
        name,
        password
      });
      login();
    } catch (e) {
      console.log(e);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50 sm:bg-opacity-40">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'Register' && (
                <Input
                  id="name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                  value={name}
                  label="Name"
                />
              )}
              <Input
                id="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                value={email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                value={password}
                label="Password"
                type="password"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              onClick={variant === "Sign in" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <button
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                aria-label="Sign in with Google"
              >
                <FcGoogle size={30} />
              </button>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "Sign in" ? "First time using Netflix?" : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "Sign in" ? "Create an account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
