import React from "react";
import Equipment from "./Equipment.json";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const EquipmentAccordion = () => {
  // get all categories
  return Equipment.categories.map((category) => {
    // get all items of related category
    return (
      <Accordion className="equipment-accordion accordion">
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon className="equipment-accordion__expand-icon" />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>{category}</h4>
        </AccordionSummary>
        <AccordionDetails className="equipment-accordion__item-list">
          {Equipment[category].map((item) => {
            return (
              <h5>
                {item.name} <span>({item.quantity} Stück)</span>
              </h5>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  });
};

export default EquipmentAccordion;
