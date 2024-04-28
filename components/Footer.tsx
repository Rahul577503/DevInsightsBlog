import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DevInsightsBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
