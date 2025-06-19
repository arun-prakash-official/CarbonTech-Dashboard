import { Leaf } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: ["Dashboard", "Analytics", "Reporting", "Integrations"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Contact"],
    },
    {
      title: "Support",
      links: ["Help Center", "Documentation", "API Reference", "Status"],
    },
  ];

  return (
    <footer className="py-12 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">CarbonTech</span>
            </div>
            <p className="text-muted-foreground">
              Transforming sustainability through intelligent carbon tracking and portfolio management.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            © 2024 CarbonTech. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaTwitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
