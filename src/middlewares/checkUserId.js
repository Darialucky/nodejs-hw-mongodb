import createHttpError from 'http-errors';
import { Contact } from '../db/contacts.js';

export const checkUserId = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await Contact.findOne({ _id: contactId, userId });
  if (contact) {
    next();
    return;
  }
  next(createHttpError(404));
};
