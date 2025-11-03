import { NavLink } from "react-router-dom";
import {
  CopyPlus,
  FilePlus,
  List,
  Boxes,
} from "lucide-react";

/**
 * Defines the navigation structure for the admin sidebar.
 * Each object specifies the destination path ('to'), the Lucide icon component ('icon'), and the display label ('label').
 */
const menuItems = [
  { to: "/admin", icon: List, label: "All New Blogs" },
  { to: "/admin/addBlog", icon: FilePlus, label: "Add New Blog" },
  { to: "/admin/allCategory", icon: Boxes, label: "All Category" },
  { to: "/admin/addCatergory", icon: CopyPlus, label: "Add New Category" },
];

/**
 * Renders the primary sidebar navigation component for the admin dashboard.
 * Parameters: None.
 * The component maps over the 'menuItems' array to generate navigation links using React Router's NavLink.
 */
const SideBar = () => {
  return (
    <div className="flex flex-col border-r border-gray-700 min-h-full pt-6 text-text">
      {menuItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/admin"}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors duration-200 
            ${
              isActive
                ? "bg-secondary/20 border-r-4 border-secondary text-text"
                : "hover:bg-white/5 text-text"
            }`
          }
        >
          <Icon size={20} strokeWidth={1.6} />
          <p className="hidden md:inline-block font-medium">{label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
