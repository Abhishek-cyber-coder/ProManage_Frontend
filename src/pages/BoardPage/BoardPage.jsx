import React, { useState } from "react";
import Board from "../../components/Board/Board";
import SideNav from "../../components/SideNav/SideNav";

function BoardPage() {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <Board />
    </div>
  );
}

export default BoardPage;
