export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white border-t-4 border-yellow-500 shadow-lg">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MDRRMO Contact Info */}
        <div className="text-sm">
          <h2 className="text-lg font-semibold mb-4">MDRRMO - Pio Duran</h2>
          <p>
            <i className="fas fa-map-marker-alt mr-2"></i>Municipal Hall, Pio Duran, Albay
          </p>
          <p>
            <i className="fas fa-phone mr-2"></i>Emergency Hotline: 911
          </p>
          <p>
            <i className="fas fa-envelope mr-2"></i>mdrrmo@pioduran.gov.ph
          </p>
          <p className="mt-4 text-gray-400">Committed to safety and resilience in our community.</p>
        </div>

        {/* Quick Links */}
        <div className="text-sm">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-yellow-500 transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/programs" className="hover:text-yellow-500 transition-colors duration-200">
                Programs & Services
              </a>
            </li>
            <li>
              <a href="/emergency-contact" className="hover:text-yellow-500 transition-colors duration-200">
                Emergency Contacts
              </a>
            </li>
            <li>
              <a href="/weather" className="hover:text-yellow-500 transition-colors duration-200">
                Weather Updates
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-yellow-500 transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Emergency Hotline Numbers */}
        <div className="text-sm">
          <h2 className="text-lg font-semibold mb-4">Emergency Hotlines</h2>
          <ul className="space-y-1 text-yellow-500">
            <li>
              <strong>Office of the Mayor:</strong>{" "}
              <a
                href="tel:+63521234567"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                (052) 123-4567
              </a>
            </li>
            <li>
              <strong>MDRRMO:</strong>{" "}
              <a href="tel:911" className="hover:underline transition-colors duration-200">
                911
              </a>{" "}
              /{" "}
              <a
                href="tel:+63522345678"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                (052) 234-5678
              </a>
            </li>
            <li>
              <strong>MSWD:</strong>{" "}
              <a
                href="tel:1343"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                1343
              </a>
            </li>
            <li>
              <strong>Medical/MHO:</strong>{" "}
              <a
                href="tel:+63523456789"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                (052) 345-6789
              </a>
            </li>
            <li>
              <strong>PNP:</strong>{" "}
              <a
                href="tel:117"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                117
              </a>{" "}
              /{" "}
              <a
                href="tel:+63524567890"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                (052) 456-7890
              </a>
            </li>
            <li>
              <strong>BFP:</strong>{" "}
              <a
                href="tel:+63525678901"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                (052) 567-8901
              </a>
            </li>
            <li>
              <strong>PCG:</strong>{" "}
              <a
                href="tel:+63526789012"
                className="text-white hover:text-yellow-500 hover:underline transition-colors duration-200"
              >
                (052) 678-9012
              </a>
            </li>
          </ul>
        </div>

        {/* Google Map Embed */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0440762880165!2d123.455991!3d13.044111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a01dcb8f5dc12d%3A0xf32c415c60d3f10f!2sMunicipal%20Hall%20of%20Pio%20Duran%2C%20Albay!5e0!3m2!1sen!2sph!4v1718610900000"
            width="300"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 text-center text-sm py-4">
        &copy; 2025 MDRRMO Pio Duran, Albay. | All rights reserved.
      </div>
    </footer>
  )
}
