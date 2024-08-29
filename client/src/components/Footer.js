import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        <strong>
          &copy; {new Date().getFullYear()} The New York Times App.
        </strong>
      </p>
      <br />
      <p className="footer-text">
        This is a practice project using the New York Times API.
        <br />
        Developed by TomasDevs.
      </p>
    </footer>
  );
};

export default Footer;
