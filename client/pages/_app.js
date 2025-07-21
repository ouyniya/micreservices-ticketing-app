import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  // สร้าง axios client ให้เหมาะกับฝั่ง server หรือ client
  const client = buildClient(appContext.ctx);

  let currentUserData = {};
  try {
    const { data } = await client.get("/api/users/currentuser");
    currentUserData = data;
  } catch (err) {
    console.error("Error fetching current user:", err.message);
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...currentUserData,
  };
};

export default AppComponent;
