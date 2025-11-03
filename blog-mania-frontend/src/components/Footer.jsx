import React from "react";

/**
 * Renders the Footer component for the application.
 * Parameters: None.
 * The function displays a simple, centered copyright notice with basic responsive padding and styling.
 */
const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg-px-24 xl-px-32 bg-secondary/3">
      <p className="py-4 text-center text-sm md:text-base text-text/50">
        Copyright 2025 Blog Mania./ All right Reserver.
      </p>
    </div>
  );
};

export default Footer;
