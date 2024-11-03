import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import React, { useState } from "react";

function AuthScreen() {
  const { signIn } = useAuthActions();
  const auth = useConvexAuth();
  const [pending, setPending] = useState(false);
  const handleProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };
  console.log(auth);

  return (
    <div>
      <div>Login screen</div>
      <div>
        {" "}
        <button
          className="w-full relative"
          disabled={pending}
          onClick={() => {
            handleProviderSignIn("google");
          }}
        >
          {/* <FcGoogle className="size-5 absolute left-2.5" /> */}
          Continue with Google
        </button>
        <button
          className="w-full relative"
          disabled={pending}
          onClick={() => {
            handleProviderSignIn("github");
          }}
        >
          {/* <FaGithub className="size-5 absolute left-2.5" /> */}
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default AuthScreen;
