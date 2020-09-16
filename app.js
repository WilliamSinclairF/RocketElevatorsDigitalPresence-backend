const Joi = require('joi');
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
const cors = require('cors');

const calcRes = require('./modules/residential/calc-res');
const calcCom = require('./modules/commercial/calc-com');
const calcCorp = require('./modules/corporate-hybrid/calc-corp');

const app = express();

app.use(express.json());
app.use(cors());

//residential

app.get(
  '/api/quote/residential/:numFloors/:numBasements/:numApartments/:shaftDollarCostToMultiply/:percentValue',
  (req, res) => {
    const { error } = validateResQuote(req.params);

    if (error) return res.status(400).send(error);

    const quoteValues = {
      numFloors: parseInt(req.params.numFloors),
      numBasements: parseInt(req.params.numBasements),
      numApartments: parseInt(req.params.numApartments),
      shaftDollarCostToMultiply: parseInt(req.params.shaftDollarCostToMultiply),
      percentValue: parseInt(req.params.percentValue),
    };

    const result = calcRes(quoteValues);
    const id = uniqid.time('REQ-');

    res.send({ ...result, id });
  }
);

//end residential

//commercial

app.get(
  '/api/quote/com/:numShafts/:shaftDollarCostToMultiply/:percentValue',
  (req, res) => {
    const { error } = validateComQuote(req.params);

    if (error) return res.status(400).send(error);

    const quoteValues = {
      numShafts: parseInt(req.params.numShafts),
      shaftDollarCostToMultiply: parseInt(req.params.shaftDollarCostToMultiply),
      percentValue: parseInt(req.params.percentValue),
    };

    const result = calcCom(quoteValues);
    const id = uniqid.time('REQ-');

    res.send({ ...result, id });
  }
);

//end commercial

//corporate/hybrid

app.get(
  '/api/quote/ch/:numFloors/:maxOccupantsPerFloor/:shaftDollarCostToMultiply/:percentValue',
  (req, res) => {
    const { error } = validateCorpQuote(req.params);

    if (error) return res.status(400).send(error);

    const quoteValues = {
      numFloors: parseInt(req.params.numFloors),
      maxOccupantsPerFloor: parseInt(req.params.maxOccupantsPerFloor),
      shaftDollarCostToMultiply: parseInt(req.params.shaftDollarCostToMultiply),
      percentValue: parseInt(req.params.percentValue),
    };

    const result = calcCorp(quoteValues);
    const id = uniqid.time('REQ-');

    res.send({ ...result, id });
  }
);

//end corporate/hybrid

//INPUT VALIDATION

const validateResQuote = (quote) => {
  const schema = Joi.object({
    numFloors: Joi.number().required(),
    numBasements: Joi.number().required(),
    numApartments: Joi.number().required(),
    percentValue: Joi.number().required(),
    shaftDollarCostToMultiply: Joi.number().required(),
  });
  return schema.validate(quote);
};

const validateComQuote = (quote) => {
  const schema = Joi.object({
    numShafts: Joi.number().required(),
    shaftDollarCostToMultiply: Joi.number().required(),
    percentValue: Joi.number().required(),
  });
  return schema.validate(quote);
};

const validateCorpQuote = (quote) => {
  const schema = Joi.object({
    numFloors: Joi.number().required(),
    maxOccupantsPerFloor: Joi.number().required(),
    shaftDollarCostToMultiply: Joi.number().required(),
    percentValue: Joi.number().required(),
  });
  return schema.validate(quote);
};

// END INPUT VALIDATION

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
