import React from "react";
import { Button } from "../base";

export default function CardHeader({ title, description, buttons }) {
  return (
    <div className="card-header flex-wrap border-0 pt-6 pb-0">
      <div className="card-title">
        <h3 className="card-label">
          {title}
          {description && (
            <span className="text-muted pt-2 font-size-sm d-block">
              {description}
            </span>
          )}
        </h3>
      </div>
      <div className="card-toolbar">{buttons}</div>
    </div>
  );
}
