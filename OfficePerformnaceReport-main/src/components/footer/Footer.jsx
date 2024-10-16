
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">Contact us: contact@example.com</p>
        <p className="text-sm mt-2">Follow us on social media:</p>
        <div className="flex justify-center mt-2">
          <a href="#" className="text-white mr-4 hover:text-gray-400">Facebook</a>
          <a href="#" className="text-white mr-4 hover:text-gray-400">Twitter</a>
          <a href="#" className="text-white hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
