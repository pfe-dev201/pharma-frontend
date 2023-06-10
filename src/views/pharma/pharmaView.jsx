import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./pharmaStyle.css";

function PharmaView () {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (openDrawer) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(openDrawer);
  };
  return (
    <div className="pharmaView">
      <div className="sidebarsup700">
        <SideBar setOpenDrawer={() => {}} />
      </div>
      <div className="menu">
        <React.Fragment key="top">
          <Button onClick={toggleDrawer(true)}>
            <MenuOutlinedIcon fontSize="large" sx={{ color: "white" }} />
          </Button>
          <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
          >
            <div className="sidebarinf700">
              <SideBar setOpenDrawer={setOpen} />
            </div>
          </Drawer>
        </React.Fragment>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default PharmaView;
