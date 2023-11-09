
const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Inventory Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
