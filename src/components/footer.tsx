const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10">
      <aside>
        <p>
          Developed by Kenshin —
          <a
            href="mailto:fernandezlanceivangil@gmail.com"
            className="link link-hover"
          >
            {" "}
            fernandezlanceivangil@gmail.com
          </a>
        </p>
        <p>Copyright © {new Date().getFullYear()} — All rights reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
