import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import { logout } from "../src/authSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const dropdownItems = [
  {
    href: "/",
    text: "| Select a farm",
    icon: "bx bxs-map-pin bx-xs",
    data: ["Farm 1, Location 1", "Farm 2, Location 2", "Farm 3, Location 3"],
  },
  {
    href: "/",
    text: "| Select a crop",
    icon: "bx bx-leaf",
    data: ["Crop 1", "Crop 2", "Crop 3"],
  },
  {
    href: "/",
    text: "| Select a variety",
    icon: "bx bx-leaf",
    data: ["Variety 1", "Variety 2", "Variety 3"],
  },
];

export default function Header({ collapsed, name }) {
  const router = useRouter();
  const username = useSelector((state) => state.authStore.username);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        className={`${
          collapsed ? styles.navCollapsed : styles.nav
        }  m-0 bg-white`}
      >
        <div className="w-full">
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className={styles.navbarToggle}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={styles.navbarCollapse}
          >
            <Nav>
              {dropdownItems.map(({ href, text, icon, data }) => (
                <NavDropdown
                  key={text}
                  align="end"
                  title={
                    <span className="mr-5">
                      <i className={`${icon} mr-2`}></i>
                      {text}
                    </span>
                  }
                  className={` ${styles.dropdown}`}
                >
                  {data.map((dataitem) => (
                    <NavDropdown.Item
                      key={dataitem}
                      href={href}
                      className={`${styles.dropdownItem}`}
                    >
                      {dataitem}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown
                title={<span>{username}</span>}
                align="end"
                className={`ml-4 ${styles.dropdown}`}
              >
                <NavDropdown.Item href="/" className={styles.profileItem}>
                  <i aria-hidden className="fas fa-user mr-2"></i>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={styles.profileItem}
                  onClick={(e) => {
                    localStorage.removeItem("LimaToken");
                    dispatch(logout());
                    router.push("/login");
                  }}
                >
                  <i aria-hidden className="fas fa-power-off mr-2"></i>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <style jsx>{``}</style>
    </div>
  );
}
