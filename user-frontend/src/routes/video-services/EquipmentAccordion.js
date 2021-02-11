import React from "react";
import Equipment from "./Equipment.json";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * An Equipment Accordion component to show equipment from a json in an list of accordions for each given category.
 * The local JSON can be replaced by any json coming from any external API if it fits the correct format.
 *
 *  {
 *    "categories" : ["category1", "category2", "categoryN"],
 *    "category1" : [
 *      {
 *        "name": "productname",
 *        "quantity": 1
 *       }
 *    ],
 *    "category2" : [
 *      {
 *        "name": "productname",
 *        "quantity": 0
 *       }
 *    ],
 *    "categoryN" : [
 *      {
 *        "name": "productname",
 *        "quantity": 99
 *       }
 *    ],
 *  }
 *
 * In order to render the accordion in the correct way the json has to match the following format:
 * categories: each category will be rendered as a seperate accordion.
 * --> all following categories-objects must be named exactly as in this array
 *
 * Example:
 * <EquipmentAccordion />
 */

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
