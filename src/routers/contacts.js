import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { checkUserId } from '../middlewares/checkUserId.js';

import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../middlewares/validateBody.js';

import { upload } from '../middlewares/multer.js';

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

router.use(authenticate);
router.use('/:contactId', checkUserId);

router.get('/', ctrlWrapper(getContactsController), checkUserId);

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '',
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
