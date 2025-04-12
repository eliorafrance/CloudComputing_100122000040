function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="app-footer">
        <div className="footer-container">
          <p>&copy; {currentYear} Contact Management App. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;