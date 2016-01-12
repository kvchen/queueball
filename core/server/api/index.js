import { Router } from 'express';

const router = new Router();


function initializePayload(req, res, next) {
  req.payload = {};
  next();
};


function formatResponse(req, res, next) {
  next();
};
