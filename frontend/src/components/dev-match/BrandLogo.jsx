import devDnaLogo from "../../assets/devdna-logo.svg";

export default function BrandLogo({ className = "", alt = "DevDNA logo" }) {
  return <img src={devDnaLogo} alt={alt} className={className} />;
}
