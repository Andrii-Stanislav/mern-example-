import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const Accordion = withStyles({
  root: {
    border: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'transparent',
    marginBottom: -1,
    minHeight: 40,
    color: '#717171',
    '&$expanded': {
      minHeight: 40,
    },
    '&:hover': {
      color: '#004AAD',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: '0 0 20px',
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({ title, body }) {
  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {title}
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
    </Accordion>
  );
}
