import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export const Hero = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Draft Clear
            {/* <span className="sm:block"> Increase Conversion. </span> */}
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-black dark:text-white">
            Transform the way you capture, organize, and share ideas with
            unlimited, flexible drawing and note-making capabilities.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
              <RegisterLink>Get Started</RegisterLink>
            </div>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium hover:text-white text-black dark:text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
