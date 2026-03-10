import React from "react";
import "./landingPage.scss";

// components
import ContactTable from "../../components/tables/ContactTable";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <main className="container">
        <ContactTable />
      </main>
    </div>
  );
};

export default LandingPage;
