import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} DevInsightsBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
