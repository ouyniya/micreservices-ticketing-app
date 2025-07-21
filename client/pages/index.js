import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You're sign in</h1> : <h1>You're not sign in</h1>;
};

LandingPage.getInitialProps = async (context) => {
  try {
    const client = buildClient(context);
    const { data } = await client.get("/api/users/currentuser");

    return data; //  return object เช่น { currentUser: ... }
  } catch (err) {
    console.error("Error fetching current user:", err.message);
    return {}; //  return empty object เพื่อไม่ให้ next.js error
  }
};

export default LandingPage;
