// import { useEffect } from "react";
// // import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 Error: User attempted to access non-existent route:",
//       location.pathname
//     );
//   }, [location.pathname]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="mb-4 text-4xl font-bold">404</h1>
//         <p className="mb-4 text-xl text-gray-600">{("notFound.title")}</p>
//         <a href="/" className="text-blue-500 underline hover:text-blue-700">
//           {("notFound.actions.backHome")}
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-6 bg-[#2b0000] px-6 text-center">
      <h1 className="mc-font text-3xl md:text-5xl text-[#ff5555]">
        You Died!
      </h1>
      <p className="mc-font text-[10px] md:text-xs text-white/70 leading-relaxed">
        Page not found: {location.pathname}
      </p>
      <a href="/" className="btn-primary mc-font text-xs">
        Respawn
      </a>
    </div>
  );
};

export default NotFound;