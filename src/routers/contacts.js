import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { validateBody } from '../validation/contacts.js';

const router = Router();

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

export default router;
