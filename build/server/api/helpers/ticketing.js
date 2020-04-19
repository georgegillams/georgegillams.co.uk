"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.beautifyTicketType = exports.validateType = exports.getPriceForTicketType = exports.calculateOutstandingBalance = exports.ticketCanBeReserved = exports.ticketReservationIsValid = exports.reserveTicket = void 0;

var _constants = require("./constants");

var ticketCostMapping = {
  EB_ONE_DAY: _constants.TICKET_COST_EB_ONE_DAY,
  EB_TWO_DAY: _constants.TICKET_COST_EB_TWO_DAY,
  R_ONE_DAY: _constants.TICKET_COST_R_ONE_DAY,
  R_TWO_DAY: _constants.TICKET_COST_R_TWO_DAY
};
var ticketNamesMapping = {
  EB_ONE_DAY: 'Saturday only early bird ticket',
  EB_TWO_DAY: 'Full weekend early bird ticket',
  R_ONE_DAY: 'Saturday only ticket',
  R_TWO_DAY: 'Full weekend ticket'
};

var getPriceForTicketType = function getPriceForTicketType(ticketType) {
  return ticketCostMapping[ticketType] || 0;
};

exports.getPriceForTicketType = getPriceForTicketType;

var ticketCanBeReserved = function ticketCanBeReserved(t) {
  return !t.reservedUntil || new Date(t.reservedUntil).getTime() < new Date().getTime();
};

exports.ticketCanBeReserved = ticketCanBeReserved;

var ticketReservationIsValid = function ticketReservationIsValid(t) {
  return !!t && !ticketCanBeReserved(t);
};

exports.ticketReservationIsValid = ticketReservationIsValid;

var reserveTicket = function reserveTicket(ticket, user, priorReservation) {
  var ticketClone = JSON.parse(JSON.stringify(ticket));
  ticketClone.reservedTo = user.id;
  ticketClone.reservedUntil = new Date().getTime() + 1000 * 60 * 60 * _constants.TICKET_RESERVATION_LENGTH; // If the current ticket is reserved for longer (eg if we've applied an extension) then the new ticket should have at least the same time remaining:

  if (priorReservation && priorReservation.reservedUntil) {
    ticketClone.reservedUntil = Math.max(priorReservation.reservedUntil, ticketClone.reservedUntil);
  }

  return ticketClone;
};

exports.reserveTicket = reserveTicket;

var calculateOutstandingBalance = function calculateOutstandingBalance(reservedTicket, payments) {
  if (!reservedTicket) {
    return 0;
  }

  var ticketCost = getPriceForTicketType(reservedTicket.ticketType);

  if (!payments) {
    return ticketCost;
  }

  var remainingBalance = ticketCost;

  for (var i = 0; i < payments.length; i += 1) {
    remainingBalance -= payments[i].amount;
  }

  remainingBalance = Math.max(0, remainingBalance);
  return remainingBalance;
};

exports.calculateOutstandingBalance = calculateOutstandingBalance;

var validateType = function validateType(ticketType) {
  return !!ticketCostMapping[ticketType];
};

exports.validateType = validateType;

var beautifyTicketType = function beautifyTicketType(ticketType) {
  return ticketNamesMapping[ticketType] || ticketType;
};

exports.beautifyTicketType = beautifyTicketType;
var _default = {
  reserveTicket: reserveTicket,
  ticketReservationIsValid: ticketReservationIsValid,
  ticketCanBeReserved: ticketCanBeReserved,
  calculateOutstandingBalance: calculateOutstandingBalance,
  getPriceForTicketType: getPriceForTicketType,
  validateType: validateType,
  beautifyTicketType: beautifyTicketType
};
exports["default"] = _default;
//# sourceMappingURL=ticketing.js.map