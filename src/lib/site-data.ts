import birthday from "@/assets/temp-birthday.jpg";
import corporate from "@/assets/temp-corporate.jpg";
import team from "@/assets/temp-team.jpg";
import traditional from "@/assets/temp-traditional.jpg";
import wedding from "@/assets/temp-wedding.jpg";

export const services = [
  { number: "01", title: "Themed Birthdays", slug: "themed-birthdays", summary: "From charming intimate setups to immersive birthday experiences, created around every personality and age.", image: birthday, types: ["Intimate setups", "Milestone birthdays", "Immersive themes"] },
  { number: "02", title: "Traditional Events", slug: "traditional-events", summary: "Thoughtful celebrations that honour culture, tradition and togetherness with a distinctive Dream Corner touch.", image: traditional, types: ["Ceremonial styling", "Family celebrations", "Traditional décor"] },
  { number: "03", title: "Wedding Events", slug: "wedding-events", summary: "From intimate ceremonies to grand celebrations, with beautiful décor, seamless planning and unforgettable details.", image: wedding, types: ["Ceremonies", "Receptions", "Wedding styling"] },
  { number: "04", title: "Corporate Events", slug: "corporate-events", summary: "Professional, engaging experiences for businesses, teams, brands and corporate occasions.", image: corporate, types: ["Launches", "Team occasions", "Brand experiences"] },
  { number: "05", title: "Add-ons", slug: "add-ons", summary: "Carefully selected finishing touches, entertainment, décor enhancements, styling and event essentials.", image: birthday, types: ["Décor enhancements", "Styling details", "Event essentials"] },
] as const;

export const gallery = [
  { src: wedding, category: "Weddings", alt: "Temporary preview of an ivory floral wedding reception with plum and gold styling", width: 1024, height: 1280 },
  { src: traditional, category: "Traditional Events", alt: "Temporary preview of a traditional celebration with floral ceremonial décor", width: 1280, height: 960 },
  { src: birthday, category: "Themed Birthdays", alt: "Temporary preview of an elegant themed celebration tablescape", width: 1024, height: 1280 },
  { src: corporate, category: "Corporate Events", alt: "Temporary preview of a refined corporate event venue", width: 1280, height: 853 },
  { src: team, category: "Behind the scenes", alt: "Temporary preview of a women-led team arranging event details", width: 1280, height: 960 },
] as const;

export { birthday, corporate, team, traditional, wedding };