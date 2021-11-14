import React from "react";
import logo from "assets/images/ec.png";

export default function Hero() {
  return (
    <section id="hero">
      <a
        href={"https://estercare.com/"}
        target="_blank"
        rel="noreferrer"
        download
      >
        <img
          src={logo}
          className="hero-media"
          alt="beehive illustration with a few bees flying around it"
        />
      </a>
      <div className="welcome-wrapper">
        <h1>EsterCloud</h1>
        <p>
          Welcome to our cloud storage service. If you would like to change the
          file's name or author just fill out the form below before uploading.
        </p>
      </div>
    </section>
  );
}
