import React, { useState } from "react";
import { useGridCellStyles } from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Checkbox, IconButton } from "@material-ui/core";
import { IDashboardProps } from "./types";
import { Input } from "../input/input";

export const Dashboard: React.FC<IDashboardProps> = props => {
  const DashboardStyles = useGridCellStyles();

  const [isTaskDeleteButton, setTaskDeleteButton] = useState<number | null>(
    null
  );
  const [task, setTask] = useState("");
  const handlerEnterKeyPress = (event: any) => {
    event.key === "Enter" && setTask(event.target.value);
  };
  const handlerTaskDeleteButton = (index: number | null) => () =>
    setTaskDeleteButton(index);

  return (
    <div className={DashboardStyles.cell}>
      <div>
        <div className={DashboardStyles.titleContainer}>
          <Input className={DashboardStyles.title} description={props.title} />
          <IconButton
            classes={{ root: DashboardStyles.taskDeleteIconRoot }}
            aria-label="Delete"
          >
            <DeleteIcon color={"disabled"} />
          </IconButton>
        </div>
        <div>
          {props.tasks.map((item, index) => (
            <div
              onMouseOver={handlerTaskDeleteButton(index)}
              onMouseLeave={handlerTaskDeleteButton(null)}
              key={index}
              className={DashboardStyles.task}
            >
              <Checkbox
                onChange={() => {
                  item.checked = !item.checked;
                }}
                classes={{ root: DashboardStyles.checkBoxRoot }}
                color="default"
                checked={item.checked}
                inputProps={{
                  "aria-label": "checkbox with default color"
                }}
              />
              <Input disabled={item.checked} description={item.description} />

              {isTaskDeleteButton === index && (
                <IconButton
                  classes={{ root: DashboardStyles.taskDeleteIconRoot }}
                  aria-label="Delete"
                >
                  <DeleteIcon color={"disabled"} fontSize={"small"} />
                </IconButton>
              )}
            </div>
          ))}
          {task}
          <Input
            onKeyDown={handlerEnterKeyPress}
            description={task}
            placeholder={"Add to-do"}
          />
        </div>
      </div>
    </div>
  );
};
